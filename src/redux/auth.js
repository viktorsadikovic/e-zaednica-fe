import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../api/AuthService";
import UserService from "../api/UserService";
import {
  clearAuthStorage,
  getLocalUser,
  getSessionToken,
  setLocalUser,
  setSessionToken,
} from "../utils/auth";
import { switchProfile } from "./profiles";

const initialState = {
  user: getLocalUser(),
  isAuthenticated: Boolean(getSessionToken()),
  isLoading: false,
  error: undefined,
  resetPassword: { isLoading: false, error: undefined },
};

export const login = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthService.signin(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signUp = createAsyncThunk(
  "signUp",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthService.signUp(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthService.forgotPassword(payload);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const submitVerificationCode = createAsyncThunk(
  "verificationCode",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AuthService.submitVerificationCode(payload);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      return undefined;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UserService.updateUser(payload);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UserService.changePassword(payload);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPassword.isLoading = true;
        state.resetPassword.error = undefined;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPassword.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPassword.isLoading = false;
        state.resetPassword.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = undefined;
      })
      .addCase(submitVerificationCode.rejected, (state, action) => {
        state.resetPassword.isLoading = false;
        state.resetPassword.error = action.payload;
      })
      .addCase(submitVerificationCode.pending, (state) => {
        state.resetPassword.isLoading = true;
        state.resetPassword.error = undefined;
      })
      .addCase(submitVerificationCode.fulfilled, (state) => {
        state.resetPassword.isLoading = false;
      })
      .addCase(switchProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const authSliceActions = authSlice.actions;

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const actions = useMemo(
    () => ({
      signUp: (payload) => dispatch(signUp(payload)),
      login: (payload) => dispatch(login(payload)),
      resetPassword: (payload) => dispatch(resetPassword(payload)),
      logout: () => dispatch(logout()),
      resetError: () => dispatch(authSliceActions.resetError()),
      submitVerificationCode: (payload) =>
        dispatch(submitVerificationCode(payload)),
      updateUser: (payload) => dispatch(updateUser(payload)),
      changePassword: (payload) => dispatch(changePassword(payload)),
    }),
    [dispatch]
  );

  return [authState, actions];
};

export const authMiddleware = () => (next) => (action) => {
  if (login.fulfilled.match(action) || signUp.fulfilled.match(action)) {
    setSessionToken(action.payload.accessToken);
    setLocalUser(action.payload.user);
  }

  if (updateUser.fulfilled.match(action)) {
    setLocalUser(action.payload);
  }

  //   if (signUp.fulfilled.match(action)) {
  //     setActivateAccountBanner();
  //   }

  if (logout.fulfilled.match(action)) {
    clearAuthStorage();
  }

  return next(action);
};

export const { setUser } = authSlice.actions;

export const userSelector = (state) => {
  return state.auth;
};

export default authSlice.reducer;
