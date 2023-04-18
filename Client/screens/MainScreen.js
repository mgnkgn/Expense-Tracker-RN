import { Text, View, TextInput, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useStore } from "../store/zustand/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import CustomBtn from "../components/ui/CustomBtn";
import CustomInput from "../components/ui/CustomInput";
import TransactionItem from "../components/ui/Transactions/TransactionItem";
import { getRandomColor } from "../components/ui/colors";

function MainScreen() {
  const [income, setIncome] = useState("");
  const [incomeName, setIncomeName] = useState("");
  const [expense, setExpense] = useState("");
  const [expenseName, setExpenseName] = useState("");

  const addTransaction = useStore((state) => state.addTransaction);
  const storeTransactions = useStore((state) => state.transactions);
  const setInitialState = useStore((store) => store.setInitialState);
  const deleteTransaction = useStore((state) => state.deleteTransaction);

  console.log(uuid.v4());
  function transactionRenderer(dataItem) {
    return (
      <TransactionItem
        dataItem={dataItem}
        id={dataItem.item.id}
        onDelete={deleteHandler}
      />
    );
  }
  function deleteHandler(id) {
    console.log(id);
    const newList = storeTransactions.filter((el) => el.id !== id);
    setInitialState(newList);
  }
  // Save transaction data to local storage
  const saveTransactions = async (transactions) => {
    try {
      await AsyncStorage.setItem("transactions", JSON.stringify(transactions));
      console.log("Transactions saved to local storage.");
    } catch (error) {
      console.error("Error saving transactions to local storage:", error);
    }
  };

  // Load transaction data from local storage
  const loadTransactions = async () => {
    try {
      const value = await AsyncStorage.getItem("transactions");
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.error("Error loading transactions from local storage:", error);
    }
  };

  useEffect(() => {
    const loadAndAddTransactions = async () => {
      const loadedTransactions = await loadTransactions();
      console.log("loadedTransactions:::XX", loadedTransactions);
      if (loadedTransactions && loadedTransactions.length > 0) {
        setInitialState(loadedTransactions);
      }
    };
    loadAndAddTransactions();
  }, []);
  const handleSubmit = () => {
    let myObj = {
      amount: null,
      type: null,
      date: null,
      color: null,
      name: null,
      legendFontColor: null,
      legendFontSize: null,
      id: null,
    };

    const formattedDate = `${new Date()
      .getDate()
      .toString()
      .padStart(2, "0")}/${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${new Date().getFullYear()}`;

    if (income && income.length > 0 && incomeName && income.length > 0) {
      myObj.type = "income";
      myObj.amount = +income;
      myObj.name = incomeName;
      setIncome("");
      setIncomeName("");
    } else if (
      expense &&
      expense.length > 0 &&
      expenseName &&
      expenseName.length > 0
    ) {
      myObj.type = "expense";
      myObj.amount = +expense;
      myObj.name = expenseName;
      setExpense("");
      setExpenseName("");
    }
    myObj.id = uuid.v4();
    myObj.date = formattedDate;
    myObj.color = `${getRandomColor()}`;
    myObj.legendFontColor = "#FE6244";
    myObj.legendFontSize = 15;
    console.log(myObj);
    addTransaction(myObj);
    saveTransactions(storeTransactions);
  };
  return (
    <View style={styles.rootCt}>
      <View style={styles.inputs}>
        <View style={styles.innerInputs}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
            }}
          >
            <CustomInput
              placeholder={"Income"}
              style={styles.colorIncome}
              type="Income"
              onChangeText={(val) => {
                setIncomeName(val);
              }}
              value={incomeName}
            />
            <CustomInput
              placeholder={"Expense"}
              style={styles.colorExpense}
              type="Expense"
              onChangeText={(val) => {
                setExpenseName(val);
              }}
              value={expenseName}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
            }}
          >
            <CustomInput
              placeholder={"Amount"}
              style={styles.colorIncome}
              type="Income"
              onChangeText={(val) => {
                setIncome(val);
              }}
              value={income}
              keyboardType="numeric"
            />
            <CustomInput
              placeholder={"Amount"}
              style={styles.colorExpense}
              type="Expense"
              onChangeText={(val) => {
                setExpense(val);
              }}
              value={expense}
              keyboardType="numeric"
            />
          </View>
          <CustomBtn
            title="Add Transaction"
            style={styles.btn}
            onPress={handleSubmit}
          />
        </View>
      </View>
      <View style={styles.mainSc}>
        <View style={styles.h1ct}>
          <Text style={styles.h1}>Transaction History</Text>
        </View>
        <FlatList
          data={storeTransactions}
          renderItem={(dataItem) => transactionRenderer(dataItem)}
        />
      </View>
    </View>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  rootCt: {
    flex: 1,
    padding: 20,
    backgroundColor: "#3A105E",
  },
  inputs: {
    flexDirection: "row",
    elevation: 4,
    borderColor: "#5319CF",
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "#5319CF",
    overflow: "hidden",
    backgroundColor: "#131312FC",
    height: 175,
  },
  innerInputs: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "#5319CF",
    borderRadius: 5,
    borderWidth: 2,
    width: "100%",
    height: 40,
    textAlign: "center",
    marginHorizontal: 14,
    color: "red",
    fontWeight: "bold",
  },
  btn: {
    marginTop: 20,
  },
  colorIncome: {
    color: "#5319CF",
    borderBottomColor: "#5319CF",
  },
  colorExpense: {
    color: "#E61741",
  },
  mainSc: {
    flex: 1,
  },
  h1ct: {
    width: "100%",
    backgroundColor: "#131312FC",
    flexDirection: "row",
    elevation: 4,
    borderColor: "#5319CF",
    paddingVertical: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: "##FE6244",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    color: "#E98B78",
    fontWeight: "bold",
    fontSize: 20,
  },
});
