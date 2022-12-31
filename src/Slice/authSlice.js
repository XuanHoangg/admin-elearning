import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../Service/authAPI";

const initialState = {
    user: JSON.parse(localStorage.getItem("user") || null),
    loading: false,
    error: null,
};

export const signin = createAsyncThunk("auth/signin", async (values) => {
    try {
        const data = await authAPI.signin(values);
        localStorage.setItem("user", JSON.stringify(data));
        return data;
    } catch (error) {
        throw error;
    }
});

export const signupAction = createAsyncThunk("auth/signup", async (values) => {
    try {
        const data = await authAPI.signup(values);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem("user");
            return { ...state, user: null };
        },
        clearError: (state, action) => {
            return { ...state, error: null };
        },
    },
    extraReducers: (buider) => {
        buider.addCase(signin.pending, (state, action) => {
            return { ...state, loading: true };
        });
        buider.addCase(signin.fulfilled, (state, action) => {
            return { ...state, loading: false, user: action.payload };
        });
        buider.addCase(signin.rejected, (state, action) => {
            return { ...state, loading: false, error: action.error.message };
        });
    },
});

// xong export o day
export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
