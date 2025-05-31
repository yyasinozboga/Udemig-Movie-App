import { ICastDetail, ICastDetailState } from "@/app/models/data/moviesState";
import { getRequest } from "@/app/services/verbs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: ICastDetailState = {
  isLoading: false,
  error: null,
  cast: null,
};

export const getCastDetail = createAsyncThunk<
  ICastDetail,
  string,
  { rejectValue: string }
>("castDetail", async (castId, { rejectWithValue }) => {
  try {
    const data = await getRequest(`person/${castId}`);

    return data;
  } catch (err) {
    const error = err as AxiosError;

    return rejectWithValue(error.response?.data as string);
  }
});

const castDetailSlice = createSlice({
  name: "castDetailSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCastDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCastDetail.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });
    builder.addCase(getCastDetail.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.cast = payload;
    });
  },
});

export default castDetailSlice.reducer;
