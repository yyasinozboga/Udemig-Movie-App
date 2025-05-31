import { Pressable, ScrollView, Text, View } from "react-native";
import React from "react";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/app/theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "@/app/components/Categories";
import Hero from "./Hero";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNativeStackParamList, screens } from "@/app/constants/screens";

type Props = NativeStackScreenProps<RootNativeStackParamList, "HomeScreen">;

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="flex-1">
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Pressable>
            <Bars3CenterLeftIcon color="white" />
          </Pressable>

          <Text className="text-white font-bold text-3xl">
            <Text style={{ color: colors.YELLOW }}>M</Text>ovie
          </Text>

          <Pressable onPress={() => navigation.navigate(screens.Search)}>
            <MagnifyingGlassIcon color="white" />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View>
            <Hero title="Trending" />
            <Categories title="Upcoming" />
            <Categories title="Top Rated" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
