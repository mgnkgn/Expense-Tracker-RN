package main

import (
	"log"
	"os"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// db connection
func connect() *pg.DB {
	opts := &pg.Options{
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASS"),
		Addr:     os.Getenv("DB_ADDRESS"),
		Database: os.Getenv("DB_DATABASE"),
	}

	var db *pg.DB = pg.Connect(opts)
	if db == nil {
		log.Printf("DB connection failed.")
		os.Exit(100)
	}

	log.Printf("Connection made successfully.")

	err := createSchema(db)
	if err != nil {
		log.Fatal(err)
	}
	return db
}

func createSchema(db *pg.DB) error {
	models := []interface{}{
		(*Transaction)(nil),
		(*User)(nil),
	}

	for _, model := range models {
		err := db.Model(model).CreateTable(&orm.CreateTableOptions{
			Temp:        false,
			IfNotExists: true,
		})
		if err != nil {
			return err
		}
	}
	return nil
}
