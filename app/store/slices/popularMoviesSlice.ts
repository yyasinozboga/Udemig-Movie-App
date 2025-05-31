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

export const getPopularMovies = createAsyncThunk("popularMovies", async () => {
  try {
    const data = await getRequest(Endpoints.POPULAR_MOVIES_URL, { page: "1" });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
});

const popularMoviesSlice = createSlice({
  name: "ratedMoviesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPopularMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPopularMovies.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });
    builder.addCase(getPopularMovies.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.movies = payload;
    });
  },
});

export default popularMoviesSlice.reducer;
