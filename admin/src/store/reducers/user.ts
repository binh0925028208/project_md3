import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../services/user.service";

export const handleLogin = createAsyncThunk(
  "login",
  async (formRequest: any) => {
    try {
      const userService: UserService = new UserService();
      const response = await userService.login(formRequest);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("idUser", response.data.user.id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const userSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: false,
    data: undefined,
  },
  reducers: {
    logout: (state) => {
      state.data = undefined;
      localStorage.removeItem("token");
      localStorage.removeItem("idUser");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
  },
});
export const { logout } = userSlice.actions;
