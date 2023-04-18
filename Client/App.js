import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MainScreen from "./screens/MainScreen";
import TotalSum from "./screens/TotalSum";
import HistoryScreen from "./screens/HistoryScreen";

const Tab = createMaterialTopTabNavigator();

const colors = ["#7149C6", "#FC2947", "#FE6244", "#FFDEB9"];

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 15,
              color: "#ffdeb9",
              fontWeight: "bold",
              textTransform: "capitalize",
            },
            tabBarStyle: {
              backgroundColor: "#5319CF",
              paddingTop: 15,
            },
          }}
        >
          <Tab.Screen
            name="MAIN"
            component={MainScreen}
            options={{ title: "Main" }}
          />
          <Tab.Screen
            name="Total Sum"
            component={TotalSum}
            options={{ title: "Total Sum" }}
          />
          <Tab.Screen
            name="Graph History"
            component={HistoryScreen}
            options={{ title: "Graph History" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
