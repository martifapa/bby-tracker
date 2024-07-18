import { createSlice } from "@reduxjs/toolkit";
import { IDLE } from "../../common/constants";

const initialState = {
    status: IDLE,
    stats: [
        {show: true, emoji: '🍽️', title: 'eat', times: 3, cadence: "2h 13'", total: ""},
        {show: true, emoji: '🍼', title: 'milk', times: 3, cadence: "2h 13'", total: ""},
        {show: true, emoji: '😴', title: 'sleep', times: 3, cadence: "2h 3'", total: "12h 54'"},
        {show: true, emoji: '💩', title: 'poop', times: 1, cadence: "0h 37'", total: ""},
        {show: true, emoji: '💦', title: 'piss', times: 2, cadence: "5h 11'", total: ""},
    ]
};


const slice = createSlice({
    name: 'summaryStats',
    initialState,
    reducers: {
        updateStat(state, action) {
            state.stats = [...state.stats.map(stat =>
                stat.title === action.payload.title
                    ? action.payload
                    : stat
            )];
        }
    }
});


export const { updateStat } = slice.actions;

export default slice.reducer;