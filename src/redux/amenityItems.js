import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AmenityItemService from "../api/AmenityItemService";

const initialState = {
  isLoading: false,
  error: undefined,
  amenityItems: [],
};

export const findAmenityItems = createAsyncThunk(
  "findAmenityItems",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AmenityItemService.find(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAmenityItemsByHouseCouncil = createAsyncThunk(
  "getAmenityItemsByHouseCouncil",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AmenityItemService.getAmenityItemsByHouseCouncil(
        payload.id
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAmenityItemsByResident = createAsyncThunk(
  "getAmenityItemsByResident",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AmenityItemService.getAmenityItemsByResident(
        payload.id
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const submitAmenityItem = createAsyncThunk(
  "submitAmenityItem",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AmenityItemService.submitAmenityItem(
        payload.id,
        payload.data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeAmenityItemStatus = createAsyncThunk(
  "changeAmenityItemStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AmenityItemService.changeAmenityItemStatus(
        payload.id,
        payload.status
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const exportAmenityItems = createAsyncThunk(
  "exportAmenityItems",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AmenityItemService.exportAmenityItems(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const amenityItemsSlice = createSlice({
  name: "amenityItems",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAmenityItemsByHouseCouncil.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAmenityItemsByHouseCouncil.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getAmenityItemsByHouseCouncil.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.amenityItems = action.payload;
      })
      .addCase(findAmenityItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(findAmenityItems.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(findAmenityItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.amenityItems = action.payload;
      })
      .addCase(getAmenityItemsByResident.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAmenityItemsByResident.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getAmenityItemsByResident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.amenityItems = action.payload;
      });
  },
});

export const useAmenityItems = () => {
  const dispatch = useDispatch();
  const amenityItemsState = useSelector((state) => state.amenityItems);
  const actions = useMemo(
    () => ({
      findAmenityItems: (payload) => dispatch(findAmenityItems(payload)),
      getAmenityItemsByHouseCouncil: (payload) =>
        dispatch(getAmenityItemsByHouseCouncil(payload)),
      getAmenityItemsByResident: (payload) =>
        dispatch(getAmenityItemsByResident(payload)),
      submitAmenityItem: (payload) => dispatch(submitAmenityItem(payload)),
      changeAmenityItemStatus: (payload) =>
        dispatch(changeAmenityItemStatus(payload)),
      exportAmenityItems: (payload) => dispatch(exportAmenityItems(payload)),
    }),
    [dispatch]
  );

  return [amenityItemsState, actions];
};

export const amenityItemsSelector = (state) => {
  return state.amenityItems;
};

export default amenityItemsSlice.reducer;
