import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useStore } from "../store/zustand/store";
import { LineChart } from "react-native-chart-kit";

function HistoryScreen() {
  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const storeTransactions = useStore((state) => state.transactions);

  useEffect(() => {
    for (let i = 0; i < storeTransactions.length; i++) {
      const transaction = storeTransactions[i];
      if (transaction.type === "income") {
        setIncomes((prev) => prev + parseInt(transaction.amount));
      } else {
        setExpenses((prev) => prev + parseInt(transaction.amount));
      }
    }
  }, [storeTransactions]);

  const incomeArr = storeTransactions.filter((el) => el.type === "income");
  const expenseArr = storeTransactions.filter((el) => el.type !== "income");
  console.log(":::", incomeArr);

  const xValuesIncome = incomeArr.map((item) => item.date);
  const yValuesIncome = incomeArr.map((item) => parseInt(item.amount));
  const xValuesExpense = expenseArr.map((item) => item.date);
  const yValuesExpense = expenseArr.map((item) => parseInt(item.amount));

  const chartConfigIncome = {
    backgroundGradientFrom: "#7416C6",
    backgroundGradientTo: "#0E0831",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  const chartConfigExpense = {
    backgroundGradientFrom: "#FE6244",
    backgroundGradientTo: "#844205",
    color: (opacity = 1) => `rgba(76, 10, 255, ${opacity})`,
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <View style={styles.rootCt}>
      <View>
        <View style={styles.headerCt}>
          <Text style={styles.header}>Incomes</Text>
        </View>
        <View style={styles.graphCt}>
          <LineChart
            data={{
              labels: xValuesIncome,
              datasets: [
                {
                  data: yValuesIncome,
                },
              ],
            }}
            width={300}
            height={220}
            chartConfig={chartConfigIncome}
            backgroundColor="transparent"
            paddingLeft={15}
          />
        </View>
      </View>
      <View>
        <View style={styles.headerCt}>
          <Text style={styles.header}>Expenses</Text>
        </View>
        <View style={styles.graphCt}>
          <LineChart
            data={{
              labels: xValuesExpense,
              datasets: [
                {
                  data: yValuesExpense,
                },
              ],
            }}
            width={300}
            height={220}
            chartConfig={chartConfigExpense}
            backgroundColor="transparent"
            paddingLeft={15}
          />
        </View>
      </View>
    </View>
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({
  rootCt: {
    flex: 1,
    padding: 10,
    backgroundColor: "#250442",
  },
  header: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
  headerCt: {
    paddingVertical: 10,
    borderColor: "#ffffff",
    borderWidth: 1,
    marginHorizontal: 23,
    borderRadius: 10,
    marginVertical: 8,
  },
  graphCt: {
    justifyContent: "center",
    alignItems: "center",
  },
});
