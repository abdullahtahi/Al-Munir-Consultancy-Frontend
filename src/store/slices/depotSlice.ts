// @store/slices/depotSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Depot {
  id: string;
  name: string;
}

interface DepotState {
  selectedDepot: Depot | null;
}

const initialState: DepotState = {
  selectedDepot: null,
};

const depotSlice = createSlice({
  name: 'depot',
  initialState,
  reducers: {
    setSelectedDepot(state, action: PayloadAction<Depot>) {
      state.selectedDepot = action.payload;
    },
    resetDepot(state) {
      state.selectedDepot = null;
    },
  },
});

export const { setSelectedDepot, resetDepot } = depotSlice.actions;

export default depotSlice.reducer;
