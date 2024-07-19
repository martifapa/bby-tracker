import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDLE } from '../../common/constants';
import { QuickActionRequest, QuickActionState, QuickAction } from '../../common/types';
import quickActionsService from '../../services/quickActions';
import { RootState } from '../../store';


export const initializeQuickActions = createAsyncThunk<
  QuickAction[],
  void,
  { state: RootState }
>(
  'quickActions/initializeQuickActions',
  async () => {
    return await quickActionsService.getActions();
  }
);

export const createQuickAction = createAsyncThunk<
  QuickAction,
  QuickActionRequest,
  { state: RootState }
>(
  'quickActions/createQuickAction',
  async (quickAction: QuickActionRequest) => {
    return await quickActionsService.createQuickAction(quickAction);
  }
);

export const deleteQuickAction = createAsyncThunk<
  number,
  number,
  { state: RootState }
>(
  'quickActions/deleteQuickAction',
  async (id: number) => {
    return await quickActionsService.deleteQuickAction(id);
  }
);


const initialState: QuickActionState = {
  status: IDLE,
  pinned: []
};


const quickActionsSlice = createSlice({
  name: 'quickActions',
  initialState,
  reducers: {
    pinQuickAction(state, action: PayloadAction<QuickActionRequest>) {
      const id = Math.max(...state.pinned.map((qa) => qa.id)) + 1;
      state.pinned = [...state.pinned, { ...action.payload, id }];
    },
    unpinQuickAction(state, action: PayloadAction<number>) {
      state.pinned = state.pinned.filter((quickAction) => quickAction.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // INITIALIZE QUICK ACTIONS
      .addCase(initializeQuickActions.fulfilled, (state, action: PayloadAction<QuickAction[]>) => {
        state.status = IDLE;
        state.pinned = action.payload;
      })
      // CREATE QUICK ACTION
      .addCase(createQuickAction.fulfilled, (state, action: PayloadAction<QuickAction>) => {
        state.status = IDLE;
        state.pinned = [...state.pinned, action.payload];
      })
      // DELETE QUICK ACTION
      .addCase(deleteQuickAction.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = IDLE;
        state.pinned = state.pinned.filter(quickAction => quickAction.id !== action.payload);
      })
  }
});


export const {
  pinQuickAction,
  unpinQuickAction } = quickActionsSlice.actions;

export default quickActionsSlice.reducer;