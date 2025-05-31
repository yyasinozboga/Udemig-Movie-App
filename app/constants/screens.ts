export const screens = {
  Home: "HomeScreen",
  Search: "SearchScreen",
  Movie: "MovieDetailScreen",
  Cast: "CastDetailScreen",
} as const;

export type RootNativeStackParamList = {
  [screens.Home]: undefined;
  [screens.Search]: undefined;
  [screens.Movie]: { movieId: string };
  [screens.Cast]: { castId: string };
};
