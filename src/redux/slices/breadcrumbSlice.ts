import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Breadcrumb {
    value: string;
}

const initialState: Breadcrumb = {
    value: "",
};

const breadcrumbSlice = createSlice({
    name: "breadcrumb",
    initialState: initialState,
    reducers: {
        setBreadcrumb: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const selectBreadcrumb = (state: RootState) => state.breadcrumb.value;
export const { setBreadcrumb } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
