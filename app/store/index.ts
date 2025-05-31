import { configureStore } from "@reduxjs/toolkit";
import popularMoviesSlice from "./slices/popularMoviesSlice";
import topRatedMoviesSlice from "./slices/topRatedMoviesSlice";
import upcomingMoviesSlice from "./slices/upcomingMoviesSlice";
import movieDetailSlice from "./slices/movieDetailSlice";
import creditsSlice from "./slices/creditsSlice";
import similarMoviesSlice from "./slices/similarMoviesSlice";
import castDetailSlice from "./slices/castDetailSlice";
import movieCreditsSlice from "./slices/movieCreditsSlice";
import searchMoviesSlice from "./slices/searchMovieSlice";

const store = configureStore({
  reducer: {
    popularMoviesReducer: popularMoviesSlice,
    topRatedMoviesReducer: topRatedMoviesSlice,
    upcomingMoviesReducer: upcomingMoviesSlice,
    movieDetailReducer: movieDetailSlice,
    creditsReducer: creditsSlice,
    similarMoviesReducer: similarMoviesSlice,
    castDetailReducer: castDetailSlice,
    movieCreditsReducer: movieCreditsSlice,
    searchMoviesReducer: searchMoviesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
