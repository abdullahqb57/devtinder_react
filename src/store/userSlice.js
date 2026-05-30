import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetails: {}
    },
    reducers: {
        addUser: (state, action) => {
            console.log('Adding user to state:', action.payload);
            state.userDetails = action.payload;
        },
        removeUser: (state, action) => {
            state.userDetails = null;
        },
        }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;