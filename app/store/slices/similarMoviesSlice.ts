import { IMovie, IMoviesState } from "@/app/models/data/moviesState";
import { getRequest } from "@/app/services/verbs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

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

export const getSimilarMovies = createAsyncThunk<
  {
    page: null;
    results: IMovie[];
    total_pages: null;
    total_results: null;
  },
  string,
  { rejectValue: string }
>("similarMovies", async (movieId, { rejectWithValue }) => {
  try {
    const data = await getRequest(`movie/${movieId}/similar`, { page: "1" });

    return data;
  } catch (err) {
    const error = err as AxiosError;

    return rejectWithValue(error.response?.data as string);
  }
});

const similarMovies = createSlice({
  name: "similarMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSimilarMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSimilarMovies.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });
    builder.addCase(getSimilarMovies.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.movies = payload;
    });
  },
});

export default similarMovies.reducer;
