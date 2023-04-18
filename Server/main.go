package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal(err)
	}
	db := connect()
	defer db.Close()

	router := mux.NewRouter()
	// login => id will send from client => to here
	router.HandleFunc("/get-transactions/{id}", getTransactions).Methods("GET")
	router.HandleFunc("/create-transactions/{id}", createTransactions).Methods("POST")
	router.HandleFunc("/delete-transactions/{id}", deleteTransaction).Methods("DELETE")

	// Starting Server
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "DELETE", "PATCH"}),
		handlers.AllowedOrigins([]string{"*"}),
	)(router)))
}

func register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	// connection
	db := connect()
	defer db.Close()

	var user User
	_ = json.NewDecoder(r.Body).Decode(&user)

	// hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Pass), bcrypt.DefaultCost)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	user.Pass = string(hashedPassword)

	// insert the user into the database
	user.ID = uuid.New()
	_, err = db.Model(&user).Insert()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(user)
}

func login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	// connection
	db := connect()
	defer db.Close()

	var user User
	_ = json.NewDecoder(r.Body).Decode(&user)

	// retrieve the user from the database
	err := db.Model(&user).Where("email = ?", user.Name).Select()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// check if the password is correct
	err = bcrypt.CompareHashAndPassword([]byte(user.Pass), []byte(user.Pass))
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// create a JWT token
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &jwt.StandardClaims{
		ExpiresAt: expirationTime.Unix(),
		Issuer:    "your-website.com",
		Id:        user.ID.String(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte("your-secret-key"))
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// return the token to the client
	response := map[string]string{"token": tokenString}
	json.NewEncoder(w).Encode(response)
}

func getTransactions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	// connection
	db := connect()
	defer db.Close()

	// creating transactions slice
	var transactions []Transaction
	if err := db.Model(&transactions).Select(); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(transactions)

}

func createTransactions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	// connection
	db := connect()
	defer db.Close()

	// creating instance of transaction
	transaction := Transaction{
		ID: uuid.New().String(),
	}

	// decoding req
	_ = json.NewDecoder(r.Body).Decode(&transaction)

	// inserting into db
	_, err := db.Model(transaction).Insert()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(transaction)

}

func deleteTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	// connection
	db := connect()
	defer db.Close()

	// get id of transaction
	params := mux.Vars(r)
	transactionId := params["id"]

	transaction := &Transaction{}
	result, err := db.Model(transaction).Where("id = ?", transactionId).Delete()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// returning res
	json.NewEncoder(w).Encode(result)
}
