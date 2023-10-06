import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    triptypes: []
};

// Create a slice
const triptypesSlice = createSlice({
    name: 'triptypes',
    initialState,
    reducers: {
        addTriptype: (state, action) => {
            state.triptypes.push(action.payload);
        }
        // Add other reducers as needed
    }
});

// Export the action creators
export const { addTriptype } = triptypesSlice.actions;

// Export the reducer
export default triptypesSlice.reducer;
