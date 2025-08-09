import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";
import breadcrumbReducer from "./slices/breadcrumbSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        breadcrumb: breadcrumbReducer,
    },
});
