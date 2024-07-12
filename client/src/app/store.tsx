import { configureStore } from "@reduxjs/toolkit";
import quickActionsSlice from "../features/quickActions/quickActionsSlice";
import logsSlice from "../features/logs/logsSlice";
import summaryStatsSlice from "../features/summaryStats/summaryStatsSlice";


const store = configureStore({
    reducer: {
        quickActions: quickActionsSlice,
        logs: logsSlice,
        summaryStats: summaryStatsSlice
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;