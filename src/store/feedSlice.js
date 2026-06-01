import {createSlice} from '@reduxjs/toolkit';
import { fetchFeeds } from '../api/api';
const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        feeds: [],
        loading: false,
    },
    reducers: {
        setFeeds: (state, action) => {
            state.feeds = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
       
    }
});
export const { setFeeds, setLoading, setError } = feedSlice.actions;

export default feedSlice.reducer;