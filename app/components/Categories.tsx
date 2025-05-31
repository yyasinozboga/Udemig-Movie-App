import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getTopRatedMovies } from "../store/slices/topRatedMoviesSlice";
import { getUpcomingMovies } from "../store/slices/upcomingMoviesSlice";
import Carousel from "react-native-reanimated-carousel";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNativeStackParamList, screens } from "../constants/screens";
import { IMovie } from "../models/data/moviesState";
import { getSimilarMovies } from "../store/slices/similarMoviesSlice";
import { getMovieCredits } from "../store/slices/movieCreditsSlice";

const { width, height } = Dimensions.get("window");

type Props = {
  title: string;
  movieId?: string;
  castId?: string;
};

const Categories: React.FC<Props> = ({ title, movieId, castId }) => {
  const { isLoading, error, movies } = useSelector((state: RootState) => {
    if (title === "Upcoming") {
      return state.upcomingMoviesReducer;
    } else if (title === "Top Rated") {
      return state.topRatedMoviesReducer;
    } else {
      return state.similarMoviesReducer;
    }
  });

  const movieCreditsReducer = useSelector(
    (state: RootState) => state.movieCreditsReducer
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (title === "Upcoming") {
      dispatch(getUpcomingMovies());
    } else if (title === "Top Rated") {
      dispatch(getTopRatedMovies());
    } else if (title === "Similar Movies") {
      dispatch(getSimilarMovies(movieId as string));
    } else {
      dispatch(getMovieCredits(castId as string));
    }
  }, []);

  const pl = title.includes("Movies") ? "pl-0" : "pl-4";

  return (
    <View className="pl-4">
      <View className="flex-row justify-between items-center mb-5 mt-7">
        <Text className="text-white text-xl">{title}</Text>
        {!title.includes("Movies") && (
          <Text style={{ color: colors.YELLOW }} className="pr-4">
            See All
          </Text>
        )}
      </View>

      <View className="justify-center items-center">
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error!</Text>
        ) : (
          movies && (
            <View className={pl}>
              <Carousel
                data={movies.results || movieCreditsReducer.movies}
                renderItem={({ item }) => <MovieCard item={item} />}
                width={width * 0.28}
                style={{ width, height: height * 0.22 }}
                pagingEnabled
                loop
                snapEnabled
              />
            </View>
          )
        )}
      </View>
    </View>
  );
};

export default Categories;

const MovieCard = ({ item }: { item: IMovie }) => {
  type MovieScreenNavigationProp = NativeStackNavigationProp<
    RootNativeStackParamList,
    "MovieDetailScreen"
  >;

  const navigation = useNavigation<MovieScreenNavigationProp>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(screens.Movie, { movieId: item.id.toString() })
      }
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original/${item.backdrop_path}`,
        }}
        style={styles.image}
      />

      <Text numberOfLines={1} className="text-white text-lg">
        {item.title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height * 0.18,
    width: width * 0.25,
    borderRadius: 20,
  },
});
