import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 absolute px-4 flex-row justify-between items-center w-full">
      <Pressable
        onPress={() => navigation.goBack()}
        className="bg-yellow-500 rounded-xl p-1"
      >
        <ChevronLeftIcon color="white" size={25} />
      </Pressable>

      <Pressable>
        <HeartIcon color="white" size={25} />
      </Pressable>
    </SafeAreaView>
  );
};

export default Header;
