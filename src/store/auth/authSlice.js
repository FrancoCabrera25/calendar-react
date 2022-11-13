import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'authenticatd, 'not-authenticated'
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticatd';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onAuthError: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        onLogout: (state) => {
            state.status = 'not-authenticated';
            state.user = {};
        }
        
    },
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onAuthError, onLogout  } = authSlice.actions;
