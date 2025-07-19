import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: "",
        bio: "",
        birthDay: "",
        propic: "",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
    },
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.bio = action.payload.bio;
            state.birthDay = action.payload.birthDay;
            state.propic = action.payload.propic;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
