import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResidentProfileService from "../api/ResidentProfileService";
import { login } from "./auth";

const initialState = {
  isLoading: false,
  error: undefined,
  activeProfile: undefined,
  profiles: [],
  residentProfiles: [],
};

export const getResidentProfiles = createAsyncThunk(
  "getProfiles",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ResidentProfileService.getMyProfiles();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const edit = createAsyncThunk(
  "editProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ResidentProfileService.edit(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const switchProfile = createAsyncThunk(
  "switchProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ResidentProfileService.switchProfile(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeProfileStatus = createAsyncThunk(
  "changeProfileStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ResidentProfileService.changeProfileStatus(
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getActiveProfile = createAsyncThunk(
  "getActiveProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ResidentProfileService.getActiveProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProfilesByStatus = createAsyncThunk(
  "getProfilesByStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ResidentProfileService.getProfilesByStatus(
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setActiveProfile: (state, action) => {
      state.activeProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResidentProfiles.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getResidentProfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.profiles = action.payload;
      })
      .addCase(getResidentProfiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(edit.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.activeProfile = action.payload;
      })
      .addCase(edit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(switchProfile.fulfilled, (state, action) => {
        state.activeProfile = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.activeProfile = action.payload.activeProfile;
      })
      .addCase(getActiveProfile.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getActiveProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.activeProfile = action.payload;
      })
      .addCase(getActiveProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // .addCase(getProfilesByStatus.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = undefined;
    // })
    // .addCase(getProfilesByStatus.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.error = undefined;
    //   state.residentProfiles = action.payload;
    // })
    // .addCase(getProfilesByStatus.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});

export const useResidentProfiles = () => {
  const dispatch = useDispatch();
  const residentProfilesState = useSelector((state) => state.residentProfiles);
  const actions = useMemo(
    () => ({
      getResidentProfiles: (payload) => dispatch(getResidentProfiles()),
      getActiveProfile: () => dispatch(getActiveProfile()),
      edit: (payload) => dispatch(edit(payload)),
      switchProfile: (payload) => dispatch(switchProfile(payload)),
      getProfilesByStatus: (payload) => dispatch(getProfilesByStatus(payload)),
    }),
    [dispatch]
  );

  return [residentProfilesState, actions];
};

export const { setActiveProfile } = profilesSlice.actions;

export const residentProfilesSelector = (state) => {
  return state.residentProfiles;
};

export default profilesSlice.reducer;
