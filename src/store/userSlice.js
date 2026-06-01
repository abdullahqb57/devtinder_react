import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetails: {},
        userConnections: [],
    },
    reducers: {
        addUser: (state, action) => {
            state.userDetails = action.payload;
        },
        removeUser: (state, action) => {
            state.userDetails = null;
        },
        setUserConnections: (state, action) => {
            state.userConnections = action.payload;
        }
    }
});

export const { addUser, removeUser, setUserConnections } = userSlice.actions;
export default userSlice.reducer;