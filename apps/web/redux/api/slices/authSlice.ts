import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser } from '@erp/shared-types';

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ user: AuthUser; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isLoading = false;
            try {
                localStorage.setItem('auth', JSON.stringify({ user: state.user, token: state.token }));
            } catch {
                console.error('Error saving auth data to localStorage');
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            try {
                localStorage.removeItem('auth');
            } catch {
                console.error('Error removing auth data from localStorage');
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setAuth, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;