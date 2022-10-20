import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AmenityService from "../api/AmenityService";

const initialState = {
  isLoading: false,
  error: undefined,
  amenities: [],
  pendingAmenities: [],
};

export const find = createAsyncThunk(
  "find",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AmenityService.find(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const findAllFromCurrentHouseCouncil = createAsyncThunk(
  "findAllFromCurrentHouseCouncil",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AmenityService.findAllFromCurrentHouseCouncil();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const findPendingAmenities = createAsyncThunk(
  "findPendingAmenities",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AmenityService.findPendingAmenities();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const findAmenityById = createAsyncThunk(
  "findAmenityById",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AmenityService.findAmenityById(payload.id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const findAmenitiesByResident = createAsyncThunk(
  "findAmenitiesByResident",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AmenityService.findAmenitiesByResident(payload.id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createAmenity = createAsyncThunk(
  "createAmenity",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AmenityService.create(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editAmenity = createAsyncThunk(
  "editAmenity",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AmenityService.edit(payload.data, payload.id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAmenity = createAsyncThunk(
  "deleteAmenity",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AmenityService.delete(payload);
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
      const response = await AmenityService.vote(payload.id, payload.params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const amenitiesSlice = createSlice({
  name: "amenities",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(find.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(find.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(find.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.amenities = action.payload;
      })
      .addCase(findAllFromCurrentHouseCouncil.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(findAllFromCurrentHouseCouncil.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(findAllFromCurrentHouseCouncil.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.amenities = action.payload;
      })
      .addCase(findPendingAmenities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(findPendingAmenities.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(findPendingAmenities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.pendingAmenities = action.payload;
      })
      .addCase(findAmenitiesByResident.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(findAmenitiesByResident.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(findAmenitiesByResident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.amenities = action.payload;
      })
      .addCase(editAmenity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editAmenity.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(editAmenity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
      });
  },
});

export const useAmenities = () => {
  const dispatch = useDispatch();
  const amenitiesState = useSelector((state) => state.amenities);
  const actions = useMemo(
    () => ({
      find: (payload) => dispatch(find(payload)),
      findAllFromCurrentHouseCouncil: () =>
        dispatch(findAllFromCurrentHouseCouncil()),
      findPendingAmenities: () => dispatch(findPendingAmenities()),
      findAmenityById: (payload) => dispatch(findAmenityById(payload)),
      findAmenitiesByResident: (payload) =>
        dispatch(findAmenitiesByResident(payload)),
      createAmenity: (payload) => dispatch(createAmenity(payload)),
      editAmenity: (payload) => dispatch(editAmenity(payload)),
      deleteAmenity: (payload) => dispatch(deleteAmenity(payload)),
      vote: (payload) => dispatch(vote(payload)),
    }),
    [dispatch]
  );

  return [amenitiesState, actions];
};

export const amenitiesSelector = (state) => {
  return state.amenities;
};

export default amenitiesSlice.reducer;
