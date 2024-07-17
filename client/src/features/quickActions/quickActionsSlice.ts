// src/features/quickActions/quickActionsSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDLE } from '../../common/constants';
import { QuickActionRequest, QuickActionState, QuickAction } from '../../common/types';
import quickActionsService from '../../services/quickActions';


export const createQuickAction = createAsyncThunk<
  QuickAction,
  QuickActionRequest,
  {
    state: { quickActions: { status: string, pinned: QuickAction[] }}
  }
>(
  'quickActions/createQuickAction',
  async (quickAction: QuickActionRequest) => {
    return await quickActionsService.createQuickAction(quickAction);
  }
);


const initialState: QuickActionState = {
  status: IDLE,
  pinned: [
    { id: 1, emoji: '😴', label: 'Sleep' },
    { id: 2, emoji: '🌅', label: 'Wake up' }
  ]
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
    builder.addCase(createQuickAction.fulfilled, (state, action: PayloadAction<QuickAction>) => {
      state.status = IDLE;
      state.pinned = [...state.pinned, action.payload];
    });
  }
});


export const {
  pinQuickAction,
  unpinQuickAction } = quickActionsSlice.actions;

export default quickActionsSlice.reducer;