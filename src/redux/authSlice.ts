import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type AuthState = {
  isAuthenticated: boolean;
  userInfo: string | null;
  loading: boolean;
  error: null | string;
};

type UserCredentials = {
  email: string;
  password: string;
};

type FormMode = "login" | "register";

const initialState: AuthState = {
  isAuthenticated: false,
  userInfo: null,
  loading: false,
  error: null,
};

// to handle register|login
export const authUser = createAsyncThunk(
  "auth/authUser",
  async (
    { user, formMode }: { user: UserCredentials; formMode: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:3002/${formMode}`,
        user
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userInfo = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred.";
      });
  },
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;
