import { configureStore } from "@reduxjs/toolkit";
import quickActionsSlice from "../features/quickActions/quickActionsSlice";


const store = configureStore({
    reducer: {
        quickActions: quickActionsSlice
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;