import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getSearchMovies } from "@/app/store/slices/searchMovieSlice";
import { IMovie } from "@/app/models/data/moviesState";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootNativeStackParamList, screens } from "@/app/constants/screens";
import { useNavigation } from "@react-navigation/native";
import Loader from "@/app/components/Loader";

const { width, height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootNativeStackParamList, "SearchScreen">;

const Search: React.FC<Props> = ({ navigation }) => {
  const [value, setValue] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const { isLoading, error, movies } = useSelector(
    (state: RootState) => state.searchMoviesReducer
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (value !== "") {
      const startTime = Date.now();

      const timer = setTimeout(() => {
        dispatch(getSearchMovies(value)).then(() => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          setDuration(duration);
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [value, dispatch]);

  const handleClear = () => {
    if (value === "") {
      navigation.goBack();
    } else {
      setValue("");
      dispatch(getSearchMovies(""));
    }
  };

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="mx-6">
        <View className="border flex-row border-gray-500 rounded-full justify-between items-center h-16 pl-5 pr-1">
          <TextInput
            placeholder="Search Movie"
            className="placeholder:text-gray-400 font-bold w-[85%] h-full"
            onChangeText={(e) => setValue(e)}
            style={{ color: "white" }}
            value={value}
          />
          <Pressable
            onPress={handleClear}
            className="bg-neutral-500 rounded-full size-[45] items-center justify-center "
          >
            <XMarkIcon size={25} color="white" />
          </Pressable>
        </View>

        <View className="mt-5 h-full">
          {isLoading ? (
            <Loader duration={duration} />
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            movies && (
              <FlatList
                data={movies.results}
                renderItem={({ item }) => <MovieCard item={item} />}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  width: "100%",
                }}
                contentContainerStyle={{ gap: 30, paddingBottom: 120 }}
              />
            )
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Search;

const MovieCard = ({ item }: { item: IMovie }) => {
  type MovieScreenNavigationProp = NativeStackNavigationProp<
    RootNativeStackParamList,
    "SearchScreen"
  >;

  const navigation = useNavigation<MovieScreenNavigationProp>();

  return (
    <Pressable
      className="gap-2"
      style={{ width: width * 0.4 }}
      onPress={() =>
        navigation.navigate(screens.Movie, { movieId: item.id.toString() })
      }
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w780/${item?.backdrop_path}`,
        }}
        className="rounded-3xl"
        style={{ height: height * 0.3, width: "100%" }}
      />

      <Text numberOfLines={1} className="text-white">
        {item.title}
      </Text>
    </Pressable>
  );
};
