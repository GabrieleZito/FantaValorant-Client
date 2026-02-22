import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import breadcrumbReducer from "./slices/breadcrumbSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        breadcrumb: breadcrumbReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
