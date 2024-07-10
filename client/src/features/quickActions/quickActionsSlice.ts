import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDLE } from "../../common/constants";
import { NewQuickActionForm, QuickActionState } from "../../common/types";


const initialState: QuickActionState = {
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
        pinQuickAction(state, action: PayloadAction<NewQuickActionForm>) {
            const id = Math.max(...state.pinned.map(qa => qa.id)) + 1;
            state.pinned = [...state.pinned, {...action.payload, id}];
        },
        unpinQuickAction(state, action: PayloadAction<number>) {
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