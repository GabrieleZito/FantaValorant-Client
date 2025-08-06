import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        value: false,
    },
    reducers: {
        switchTheme: (state) => {
            state.value = !state.value;
        },
    },
});

export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;
