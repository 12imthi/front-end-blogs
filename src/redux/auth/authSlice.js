import { createSlice } from "@reduxjs/toolkit";

// Function to load user data from localStorage
const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('user');
        if (serializedState === null) {
            return { user: null, token: null }; // No user found in localStorage
        }
        const user = JSON.parse(serializedState);
        return { user, token: user.token || null }; // Assuming user object might have a token
    } catch (error) {
        console.error("Failed to load user from localStorage", error);
        return { user: null, token: null }; // Return nulls on error
    }
};

// Initial state setup
const initialState = loadUserFromLocalStorage();

// Creating the authSlice with createSlice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { user, token } = action.payload; // Expecting payload to have user and token
            state.user = user; // Store user in state
            state.token = token; // Store token in state
            try {
                localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
            } catch (error) {
                console.error("Failed to save user to localStorage", error);
            }
        },
        setUser: (state, action) => {
            state.user = action.payload;
            try {
                localStorage.setItem('user', JSON.stringify(state.user)); // Save user to localStorage
            } catch (error) {
                console.error("Failed to save user to localStorage", error);
            }
        },
        logout: (state) => {
            state.user = null; // Clear the user state on logout
            state.token = null; // Clear the token on logout
            try {
                localStorage.removeItem('user'); // Remove user from localStorage
            } catch (error) {
                console.error("Failed to remove user from localStorage", error);
            }
        }
    }
});

// Export actions and reducer
export const { loginSuccess, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
