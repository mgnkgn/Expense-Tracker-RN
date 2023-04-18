import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import { useStore } from "../store/zustand/store";

function TotalSum() {
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

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  return (
    <View style={{ backgroundColor: "#F77503", flex: 1 }}>
      <View style={styles.rootCt}>
        <View style={styles.rowCt}>
          <Text style={styles.incomeText}>Income Total: {incomes}$</Text>
        </View>
        <View style={styles.rowCt}>
          <Text style={styles.expenseText}>Expense Total: {expenses}$</Text>
        </View>
        <View style={styles.rowCt}>
          <Text style={styles.totalText}>Total Sum: {incomes - expenses}$</Text>
        </View>
      </View>
      <View style={styles.graphCt}>
        <Text style={styles.headerGraph}>Total Summary</Text>
        <PieChart
          data={storeTransactions}
          width={350}
          height={220}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
    </View>
  );
}

export default TotalSum;

const styles = StyleSheet.create({
  mainCt: {
    backgroundColor: "#250442",
    flex: 1,
    backgroundColor: "red",
    padding: 8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#5319CF",
    backgroundColor: "#5319CF",
    elevation: 8,
    margin: 15,
    justifyContent: "space-around",
  },
  rootCt: {
    backgroundColor: "#250442",
    padding: 8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#5319CF",
    backgroundColor: "#5319CF",
    elevation: 8,
    margin: 15,
    justifyContent: "space-around",
    height: "33%",
  },
  rowCt: {
    backgroundColor: "#FFDEB9",
    padding: 7,
    borderRadius: 8,
  },
  incomeText: {
    color: "#0A872B",
    fontWeight: "bold",
  },
  expenseText: {
    color: "#FC2947",
    fontWeight: "bold",
  },
  totalText: {
    color: "#5319CF",
    fontWeight: "bold",
  },
  graphCt: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5319CF",
    borderRadius: 8,
    elevation: 3,
    padding: 8,
  },
  headerGraph: {
    color: "#FC2947",
    fontWeight: "bold",
    fontSize: 17,
  },
});
