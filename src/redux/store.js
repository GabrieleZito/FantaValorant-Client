import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";
import breadcrumbReducer from "./slices/breadcrumbSlice";
import authReducer from "./slices/authSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        breadcrumb: breadcrumbReducer,
        auth: authReducer,
    },
});
