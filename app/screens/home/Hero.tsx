import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-native-reanimated-carousel";
import { AppDispatch, RootState } from "@/app/store";
import { getPopularMovies } from "@/app/store/slices/popularMoviesSlice";
import { IMovie } from "@/app/models/data/moviesState";
import { useNavigation } from "@react-navigation/native";
import { RootNativeStackParamList, screens } from "@/app/constants/screens";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width, height } = Dimensions.get("window");

type Props = {
  title: string;
};

const Hero: React.FC<Props> = ({ title }) => {
  const { isLoading, error, movies } = useSelector(
    (state: RootState) => state.popularMoviesReducer
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPopularMovies());
  }, []);

  return (
    <View>
      <Text className="text-white text-xl ml-4 mt-7">{title}</Text>

      <View className="justify-center items-center">
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error!</Text>
        ) : (
          movies.results && (
            <Carousel
              data={movies.results}
              renderItem={({ item }) => <MovieCard item={item} />}
              width={width * 0.62}
              style={{
                width,
                display: "flex",
                justifyContent: "center",
                height: height * 0.4,
              }}
              pagingEnabled
              loop
              snapEnabled
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 20,
              }}
            />
          )
        )}
      </View>
    </View>
  );
};

export default Hero;

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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height * 0.4,
    width: width * 0.6,
    borderRadius: 20,
  },
});
