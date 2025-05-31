import {
  IPersonMovieCredits,
  IPersonMovieCreditsState,
} from "@/app/models/data/moviesState";
import { getRequest } from "@/app/services/verbs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: IPersonMovieCreditsState = {
  isLoading: false,
  error: null,
  movies: {
    cast: [],
    crew: [],
    id: 0,
  },
};

export const getMovieCredits = createAsyncThunk<
  IPersonMovieCredits,
  string,
  { rejectValue: string }
>("movieCredits", async (castId, { rejectWithValue }) => {
  try {
    const data = await getRequest(`person/${castId}/movie_credits`);

    return data;
  } catch (err) {
    const error = err as AxiosError;

    return rejectWithValue(error.response?.data as string);
  }
});

const movieCreditsSlice = createSlice({
  name: "movieCredits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieCredits.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovieCredits.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });
    builder.addCase(getMovieCredits.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.movies = payload;
    });
  },
});

export default movieCreditsSlice.reducer;
