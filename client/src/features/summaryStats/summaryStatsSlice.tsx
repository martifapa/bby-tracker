import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDLE } from "../../common/constants";
import { SummaryStatState, SummaryStatType } from "../../common/types";
import { RootState } from "../../store";
import summaryStatsService from "../../services/summaryStats";


export const initializeSummaryStats = createAsyncThunk<
    SummaryStatType[],
    void,
    { state: RootState }
>(
    'summaryStats/initializeSummaryStats',
    async () => {
        return await summaryStatsService.getSummaryStats();
    }
);

export const toggleSummaryStat = createAsyncThunk<
    SummaryStatType | null,
    number,
    { state: RootState }
>(
    'summaryStats/toggleSummaryStat',
    async (id: number) => {
        return await summaryStatsService.toggleSummaryStat(id);
    }
)


const initialState: SummaryStatState = {
    status: IDLE,
    stats: []
};


const slice = createSlice({
    name: 'summaryStats',
    initialState,
    reducers: {
        updateStat(state, action) {
            state.stats = [...state.stats.map(stat =>
                stat.label === action.payload.label
                    ? action.payload
                    : stat
            )];
        }
    },
    extraReducers(builder) {
        builder
            // INITIALIZE SUMMARY STATS
            .addCase(initializeSummaryStats.fulfilled, (state, action) => {
                state.status = IDLE;
                state.stats = action.payload;
            })
            // TOGGLE SUMMARY STAT
            .addCase(toggleSummaryStat.fulfilled, (state, action) => {
                if (!action.payload) return
                state.stats = [...state.stats.map(stat =>
                    stat.label === action.payload?.label
                        ? action.payload
                        : stat
                )]
            })
    },
});


export const { updateStat } = slice.actions;

export default slice.reducer;