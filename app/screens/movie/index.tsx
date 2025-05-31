import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootNativeStackParamList, screens } from "@/app/constants/screens";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getMovieDetail } from "@/app/store/slices/movieDetailSlice";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-reanimated-carousel";
import { getCredits } from "@/app/store/slices/creditsSlice";
import { ICast } from "@/app/models/data/moviesState";
import Categories from "@/app/components/Categories";
import { useNavigation } from "@react-navigation/native";
import Header from "@/app/components/Header";

const { width, height } = Dimensions.get("window");

type Props = NativeStackScreenProps<
  RootNativeStackParamList,
  "MovieDetailScreen"
>;

const Movie: React.FC<Props> = ({ route }) => {
  const { isLoading, error, movie } = useSelector(
    (state: RootState) => state.movieDetailReducer
  );
  const creditsReducer = useSelector(
    (state: RootState) => state.creditsReducer
  );

  const dispatch = useDispatch<AppDispatch>();
  const movieId = route.params.movieId;

  useEffect(() => {
    dispatch(getMovieDetail(movieId));
    dispatch(getCredits(movieId));
  }, [movieId]);

  const genres = movie?.genres.map(({ id, name }) => name).join(" - ");

  return (
    <View className="flex-1 bg-neutral-900 pb-10">
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error!</Text>
      ) : (
        movie && (
          <View className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
              <ImageBackground
                source={{
                  uri: `https://image.tmdb.org/t/p/w780/${movie?.backdrop_path}`,
                }}
                style={{ height: height * 0.5, width }}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
                  style={{ height: height * 0.5, width }}
                />
              </ImageBackground>

              <Header />

              <View className="items-center gap-4 -mt-5">
                <Text className="text-white font-bold text-3xl">
                  {movie.original_title}
                </Text>

                <Text className="text-gray-400 font-bold">
                  Post Production - {new Date(movie.release_date).getFullYear()}{" "}
                  - {movie.runtime} min
                </Text>

                <Text className="text-gray-400 font-bold">{genres}</Text>

                <View className="self-start">
                  <View className="gap-4 pl-4">
                    <Text className="text-gray-400 font-medium pr-11">
                      {movie.overview}
                    </Text>

                    <Text className="text-white">Top Cast</Text>
                    {creditsReducer.isLoading ? (
                      <Text>Loading...</Text>
                    ) : creditsReducer.error ? (
                      <Text>Error!</Text>
                    ) : (
                      <Carousel
                        data={creditsReducer.cast.cast}
                        width={width * 0.2}
                        height={height * 0.115}
                        style={{ width }}
                        renderItem={({ item }) => <CastItem item={item} />}
                      />
                    )}
                  </View>

                  <Categories title="Similar Movies" movieId={movieId} />
                </View>
              </View>
            </ScrollView>
          </View>
        )
      )}
    </View>
  );
};

export default Movie;

const CastItem = ({ item }: { item: ICast }) => {
  type MovieScreenNavigationProp = NativeStackNavigationProp<
    RootNativeStackParamList,
    "MovieDetailScreen"
  >;

  const navigation = useNavigation<MovieScreenNavigationProp>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(screens.Cast, { castId: item.id.toString() })
      }
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w780/${item?.profile_path}`,
        }}
        className="rounded-full border border-gray-500"
        style={{ height: 70, width: 70 }}
      />

      <Text numberOfLines={1} className="text-white">
        {item.character}
      </Text>
      <Text numberOfLines={1} className="text-gray-500">
        {item.original_name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: height * 0.5,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
});
