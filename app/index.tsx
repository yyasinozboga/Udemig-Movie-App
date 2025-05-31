import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import "@/global.css";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./router";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
