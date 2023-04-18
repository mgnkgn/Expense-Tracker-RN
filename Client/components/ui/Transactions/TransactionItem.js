import { StyleSheet, Text, View } from "react-native";

function TransactionItem({ dataItem }) {
  const { type, amount, date, name } = dataItem.item;
  console.log(dataItem.item);
  if (type === "income") {
    return (
      <View style={styles.incomeCt}>
        <Text style={styles.incomeInfo}>
          {name}: +{amount}$
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    );
  } else if (type === "expense") {
    return (
      <View style={styles.expenseCt}>
        <Text style={styles.expenseInfo}>
          {name}: -{amount}$
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    );
  }
  return null; // Render nothing if the type is not recognized
}

export default TransactionItem;

const styles = StyleSheet.create({
  incomeCt: {
    backgroundColor: "#5319CF",
    borderRadius: 8,
    elevation: 5,
    shadowRadius: 8,
    shadowColor: "#5319CF",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 5,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expenseCt: {
    backgroundColor: "#FC2947",
    borderRadius: 8,
    elevation: 3,
    shadowRadius: 8,
    shadowColor: "#FC2947",
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 2 },
    marginVertical: 5,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    color: "#F3E4D2",
    fontWeight: "700",
  },
  incomeInfo: {
    color: "#F3E4D2",
    fontWeight: "700",
  },
  expenseInfo: {
    color: "#F3E4D2",
    fontWeight: "700",
  },
});
