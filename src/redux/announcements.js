import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnnouncementService from "../api/AnnouncementService";

const initialState = {
  isLoading: false,
  error: undefined,
  announcements: [],
  topAnnouncements: [],
};

export const getAnnouncementsByHouseCouncil = createAsyncThunk(
  "getAnnouncementsByHouseCouncil",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AnnouncementService.getAnnouncementsByHouseCouncil(
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTopAnnouncements = createAsyncThunk(
  "getTopAnnouncements",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AnnouncementService.getTopAnnouncements();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAnnouncement = createAsyncThunk(
  "getAnnouncement",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AnnouncementService.getAnnouncement(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createAnnouncement = createAsyncThunk(
  "createAnnouncement",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AnnouncementService.createAnnouncement(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editAnnouncement = createAsyncThunk(
  "editAnnouncement",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AnnouncementService.editAnnouncement(
        payload.data,
        payload.id
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAnnouncement = createAsyncThunk(
  "deleteAnnouncement",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AnnouncementService.deleteAnnouncement(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const vote = createAsyncThunk(
  "vote",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AnnouncementService.vote(
        payload.id,
        payload.voteType
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const announcementsSlice = createSlice({
  name: "announcements",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAnnouncementsByHouseCouncil.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAnnouncementsByHouseCouncil.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getAnnouncementsByHouseCouncil.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.announcements = action.payload;
      })
      .addCase(getTopAnnouncements.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getTopAnnouncements.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getTopAnnouncements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.topAnnouncements = action.payload;
      });
  },
});

export const useAnnouncements = () => {
  const dispatch = useDispatch();
  const announcementsState = useSelector((state) => state.announcements);
  const actions = useMemo(
    () => ({
      getAnnouncementsByHouseCouncil: (payload) =>
        dispatch(getAnnouncementsByHouseCouncil(payload)),
      getTopAnnouncements: (payload) => dispatch(getTopAnnouncements(payload)),
      getAnnouncement: (payload) => dispatch(getAnnouncement(payload)),
      createAnnouncement: (payload) => dispatch(createAnnouncement(payload)),
      editAnnouncement: (payload) => dispatch(editAnnouncement(payload)),
      deleteAnnouncement: (payload) => dispatch(deleteAnnouncement(payload)),
      vote: (payload) => dispatch(vote(payload)),
    }),
    [dispatch]
  );

  return [announcementsState, actions];
};

export const announcementsSelector = (state) => {
  return state.announcements;
};

export default announcementsSlice.reducer;
