import { IMovie, IMoviesState } from "@/app/models/data/moviesState";
import { Endpoints } from "@/app/services/urls";
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

interface IApiError {
  message: string;
  status?: number;
  url?: string;
}

export const getTopRatedMovies = createAsyncThunk<
  {
    page: null;
    results: IMovie[];
    total_pages: null;
    total_results: null;
  },
  void,
  { rejectValue: IApiError }
>("topRatedMovies", async (_, { rejectWithValue }) => {
  try {
    const data = await getRequest(Endpoints.TOP_RATED_MOVIE_URL, { page: "1" });
    return data;
  } catch (err) {
    const error = err as AxiosError;

    const fullUrl = error.config?.baseURL
      ? error.config.baseURL + error.config.url
      : error.config?.url;

    const customError: IApiError = {
      message: error.message,
      status: error.response?.status,
      url: fullUrl,
    };

    console.log(customError);

    return rejectWithValue(customError);
  }
});

const ratedMoviesSlice = createSlice({
  name: "ratedMoviesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopRatedMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTopRatedMovies.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });
    builder.addCase(getTopRatedMovies.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.movies = payload;
    });
  },
});

export default ratedMoviesSlice.reducer;
