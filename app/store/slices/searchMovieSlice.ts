import { IMovie, IMoviesState } from "@/app/models/data/moviesState";
import { getRequest } from "@/app/services/verbs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: IMoviesState = {
  isLoading: false,
  error: null,
  movies: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
};

export const getSearchMovies = createAsyncThunk<
  {
    page: number | null;
    results: IMovie[];
    total_pages: number | null;
    total_results: number | null;
  },
  string,
  { rejectValue: string }
>("searchMovies", async (search, { rejectWithValue }) => {
  try {
    const data = await getRequest(`search/movie`, {
      query: search,
      page: "1",
    });

    return data;
  } catch (err) {
    const error = err as AxiosError;

    return rejectWithValue(error.response?.data as string);
  }
});

const searchMoviesSlice = createSlice({
  name: "searchMoviesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearchMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSearchMovies.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });
    builder.addCase(getSearchMovies.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.movies = payload;
    });
  },
});

export default searchMoviesSlice.reducer;
