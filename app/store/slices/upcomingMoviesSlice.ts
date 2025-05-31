import { IMoviesState } from "@/app/models/data/moviesState";
import { Endpoints } from "@/app/services/urls";
import { getRequest } from "@/app/services/verbs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IMoviesState = {
  isLoading: false,
  error: null,
  movies: {
    page: null,
    results: [],
    total_pages: null,
    total_results: null,
  },
};

export const getUpcomingMovies = createAsyncThunk(
  "upcomingMovies",
  async () => {
    try {
      const data = await getRequest(Endpoints.UPCOMING_MOVIES_URL, {
        page: "1",
      });

      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

const ratedMoviesSlice = createSlice({
  name: "ratedMoviesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUpcomingMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUpcomingMovies.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });
    builder.addCase(getUpcomingMovies.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.movies = payload;
    });
  },
});

export default ratedMoviesSlice.reducer;
