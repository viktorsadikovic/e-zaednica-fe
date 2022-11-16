import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationService from "../api/NotificationService";

const initialState = {
  chatNotifications: 0,
  announcementNotifications: 0,
  amenityNotifications: 0,
  amenityItemNotifications: 0,
  profileNotifications: 0,
  isLoading: false,
  error: undefined,
};

export const getChatNotifications = createAsyncThunk(
  "getChatNotification",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await NotificationService.getNotifications({
        type: "CHAT",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAmenityNotifications = createAsyncThunk(
  "getAmenityNotifications",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await NotificationService.getNotifications({
        type: "AMENITY",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAmenityItemNotifications = createAsyncThunk(
  "getAmenityItemNotifications",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await NotificationService.getNotifications({
        type: "AMENITY ITEM",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAnnouncementNotifications = createAsyncThunk(
  "getAnnouncementNotifications",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await NotificationService.getNotifications({
        type: "ANNOUNCEMENT",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProfileNotifications = createAsyncThunk(
  "getProfileNotifications",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await NotificationService.getNotifications({
        type: "PROFILE",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const markNotificationsAsRead = createAsyncThunk(
  "markNotificationsAsRead",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await NotificationService.markNotificationsAsRead(
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getChatNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getChatNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.chatNotifications = action.payload[0]
          ? action.payload[0].notifications
          : 0;
      })
      .addCase(getChatNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAmenityNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getAmenityNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.amenityNotifications = action.payload[0]
          ? action.payload[0].notifications
          : 0;
      })
      .addCase(getAmenityNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAmenityItemNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getAmenityItemNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.amenityItemNotifications = action.payload[0]
          ? action.payload[0].notifications
          : 0;
      })
      .addCase(getAmenityItemNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAnnouncementNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getAnnouncementNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.announcementNotifications = action.payload[0]
          ? action.payload[0].notifications
          : 0;
      })
      .addCase(getAnnouncementNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getProfileNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getProfileNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.profileNotifications = action.payload[0]
          ? action.payload[0].notifications
          : 0;
      })
      .addCase(getProfileNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const useNotifications = () => {
  const dispatch = useDispatch();
  const notificationState = useSelector((state) => state.notification);
  const actions = useMemo(
    () => ({
      getChatNotifications: () => dispatch(getChatNotifications()),
      getAmenityNotifications: () => dispatch(getAmenityNotifications()),
      getAmenityItemNotifications: () =>
        dispatch(getAmenityItemNotifications()),
      getAnnouncementNotifications: () =>
        dispatch(getAnnouncementNotifications()),
      getProfileNotifications: () => dispatch(getProfileNotifications()),
      markNotificationsAsRead: (payload) =>
        dispatch(markNotificationsAsRead(payload)),
    }),
    [dispatch]
  );

  return [notificationState, actions];
};

export default notificationSlice.reducer;
