import {
  IMovieCredits,
  IMovieCreditsState,
} from "@/app/models/data/moviesState";
import { getRequest } from "@/app/services/verbs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: IMovieCreditsState = {
  isLoading: false,
  error: null,
  cast: {
    id: 0,
    cast: [],
  },
};

export const getCredits = createAsyncThunk<
  IMovieCredits,
  string,
  { rejectValue: string }
>("credits", async (movieId, { rejectWithValue }) => {
  try {
    const data = await getRequest(`movie/${movieId}/credits`);

    return data;
  } catch (err) {
    const error = err as AxiosError;

    return rejectWithValue(error.response?.data as string);
  }
});

const creditsSlice = createSlice({
  name: "creditsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCredits.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCredits.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });
    builder.addCase(getCredits.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.cast = payload;
    });
  },
});

export default creditsSlice.reducer;
