import { configureStore } from "@reduxjs/toolkit";
import quickActionsSlice from "../features/quickActions/quickActionsSlice";
import logsSlice from "../features/logs/logsSlice";


const store = configureStore({
    reducer: {
        quickActions: quickActionsSlice,
        logs: logsSlice
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;