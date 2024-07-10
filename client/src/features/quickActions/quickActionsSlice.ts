import { createSlice } from "@reduxjs/toolkit";
import { IDLE } from "../../common/constants";


const initialState = {
    status: IDLE,
    pinned: [
        {id: 1, emoji: '😴', label: 'Sleep'},
        {id: 2, emoji: '🌅', label: 'Wake up'}
    ]
}

const slice = createSlice({
    name: 'quickActions',
    initialState,
    reducers: {
        pinQuickAction(state, action) {
            state.pinned = [...state.pinned, action.payload];
        },
        unpinQuickAction(state, action) {
            state.pinned = state.pinned.filter(quickAction =>
                quickAction.id !== action.payload
            )
        }
    }
});


export const {
    pinQuickAction,
    unpinQuickAction
 } = slice.actions;

export default slice.reducer;