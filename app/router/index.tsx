import { View, Text } from "react-native";
import React from "react";
import { RootNativeStackParamList, screens } from "../constants/screens";
import Home from "../screens/home";
import Search from "../screens/search";
import Movie from "../screens/movie";
import Cast from "../screens/cast";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootNativeStackParamList>();

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.Home} component={Home} />
      <Stack.Screen name={screens.Search} component={Search} />
      <Stack.Screen name={screens.Movie} component={Movie} />
      <Stack.Screen name={screens.Cast} component={Cast} />
    </Stack.Navigator>
  );
};

export default Router;
