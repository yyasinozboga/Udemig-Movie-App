import { IMovieDetail, IMovieDetailState } from "@/app/models/data/moviesState";
import { getRequest } from "@/app/services/verbs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: IMovieDetailState = {
  isLoading: false,
  error: null,
  movie: null,
};

export const getMovieDetail = createAsyncThunk<
  IMovieDetail,
  string,
  { rejectValue: string }
>("getMovieDetail", async (movieId, { rejectWithValue }) => {
  try {
    const data = await getRequest(`movie/${movieId}`);

    return data;
  } catch (err) {
    const error = err as AxiosError;

    console.log(error.response?.data);

    return rejectWithValue(error.response?.data as string);
  }
});

const movieDetailSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovieDetail.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });
    builder.addCase(getMovieDetail.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.movie = payload;
    });
  },
});

export default movieDetailSlice.reducer;
