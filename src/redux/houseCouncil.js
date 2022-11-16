import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import HouseCouncilService from "../api/HouseCouncilService";

const initialState = {
  isLoading: false,
  error: undefined,
  houseCouncil: undefined,
  residents: [],
  adminChangeRequests: [],
};

export const getHouseCouncil = createAsyncThunk(
  "getHouseCouncil",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await HouseCouncilService.getHouseCouncil(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createHouseCouncil = createAsyncThunk(
  "createHouseCouncil",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await HouseCouncilService.create(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editHouseCouncil = createAsyncThunk(
  "editHouseCouncil",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await HouseCouncilService.edit(payload.id, payload.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const joinHouseCouncil = createAsyncThunk(
  "joinHouseCouncil",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await HouseCouncilService.join(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteHouseCouncil = createAsyncThunk(
  "deleteHouseCouncil",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await HouseCouncilService.delete(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAdminChangeRequests = createAsyncThunk(
  "getAdminChangeRequests",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await HouseCouncilService.getAdminChangeRequests();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const requestAdminChange = createAsyncThunk(
  "requestAdminChange",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await HouseCouncilService.requestAdminChange(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const submitAdminChangeVote = createAsyncThunk(
  "submitAdminChangeVote",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await HouseCouncilService.submitAdminChangeVote(
        payload.id,
        payload.data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const houseCouncilSlice = createSlice({
  name: "houseCouncil",
  initialState,
  reducers: {
    setHouseCouncil: (state, action) => {
      state.houseCouncil = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHouseCouncil.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getHouseCouncil.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getHouseCouncil.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.houseCouncil = action.payload;
      })
      .addCase(createHouseCouncil.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createHouseCouncil.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(createHouseCouncil.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.houseCouncil = action.payload;
      })
      .addCase(joinHouseCouncil.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(joinHouseCouncil.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(joinHouseCouncil.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        // state.houseCouncil = action.payload;
      })
      .addCase(editHouseCouncil.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editHouseCouncil.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(editHouseCouncil.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.houseCouncil = action.payload;
      })
      .addCase(deleteHouseCouncil.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteHouseCouncil.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(deleteHouseCouncil.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.houseCouncil = undefined;
        state.residents = undefined;
      })
      .addCase(getAdminChangeRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAdminChangeRequests.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getAdminChangeRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.adminChangeRequests = action.payload;
      });
  },
});

const houseCouncilSliceActions = houseCouncilSlice.actions;

export const useHouseCouncil = () => {
  const dispatch = useDispatch();
  const houseCouncilState = useSelector((state) => state.houseCouncil);
  const actions = useMemo(
    () => ({
      getHouseCouncil: (payload) => dispatch(getHouseCouncil(payload)),
      createHouseCouncil: (payload) => dispatch(createHouseCouncil(payload)),
      joinHouseCouncil: (payload) => dispatch(joinHouseCouncil(payload)),
      editHouseCouncil: (payload) => dispatch(editHouseCouncil(payload)),
      deleteHouseCouncil: (payload) => dispatch(deleteHouseCouncil(payload)),
      getAdminChangeRequests: () => dispatch(getAdminChangeRequests()),
      requestAdminChange: (payload) => dispatch(requestAdminChange(payload)),
      submitAdminChangeVote: (payload) =>
        dispatch(submitAdminChangeVote(payload)),
    }),
    [dispatch]
  );

  return [houseCouncilState, actions];
};

export const { setHouseCouncil } = houseCouncilSlice.actions;

export const houseCouncilSelector = (state) => {
  return state.residentProfiles;
};

export default houseCouncilSlice.reducer;
