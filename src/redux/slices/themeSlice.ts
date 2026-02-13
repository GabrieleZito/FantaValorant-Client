import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const themeSlice = createSlice({
    name: "theme",
    initialState: { value: false },
    reducers: {
        switchTheme: (state) => {
            state.value = !state.value;
        },
    },
});
export const selectTheme = (state: RootState) => state.theme.value;
export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;
