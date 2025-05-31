import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Header from "@/app/components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNativeStackParamList } from "@/app/constants/screens";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getCastDetail } from "@/app/store/slices/castDetailSlice";
import Categories from "@/app/components/Categories";

const { width, height } = Dimensions.get("window");

type Props = NativeStackScreenProps<
  RootNativeStackParamList,
  "CastDetailScreen"
>;

const Cast: React.FC<Props> = ({ route }) => {
  const castId = route.params.castId;
  const { isLoading, error, cast } = useSelector(
    (state: RootState) => state.castDetailReducer
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCastDetail(castId));
  }, [castId]);

  return (
    <View className="flex-1 bg-neutral-800 pb-10">
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error!</Text>
      ) : (
        cast && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Header />

            <View className="items-center mt-32 gap-5 pl-4">
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w780/${cast?.profile_path}`,
                }}
                className="rounded-full"
                style={{ height: width * 0.7, width: width * 0.7 }}
              />

              <View className="items-center">
                <Text className="font-bold text-3xl text-white">
                  {cast.name}
                </Text>
                <Text className="text-gray-500 font-medium">
                  {cast.place_of_birth}
                </Text>
              </View>

              <View className="flex-row bg-neutral-700 p-6 rounded-full items-center justify-between w-[95%]">
                <View className="items-center gap-1">
                  <Text className="text-white font-medium">Gender</Text>
                  <Text className="text-gray-400">{cast.gender}</Text>
                </View>

                <View className="items-center gap-1">
                  <Text className="text-white font-medium">Birthday</Text>
                  <Text className="text-gray-400">{cast.birthday}</Text>
                </View>

                <View className="items-center gap-1">
                  <Text className="text-white font-medium">Known for</Text>
                  <Text className="text-gray-400">
                    {cast.known_for_department}
                  </Text>
                </View>

                <View className="items-center gap-1">
                  <Text className="text-white font-medium">Popularity</Text>
                  <Text className="text-gray-400">{cast.popularity}</Text>
                </View>
              </View>

              <View className="gap-3">
                <Text className="text-white">Biography</Text>
                <Text className="text-neutral-500 pr-2">{cast.biography}</Text>
              </View>

              <Categories title="Movies" castId={castId} />
            </View>
          </ScrollView>
        )
      )}
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({});
