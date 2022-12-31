import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../Service/userApi";

const initialState = {
    user: [],
    isloading: false,
    error: null,
};

export const getUser = createAsyncThunk(
    "user/getUser",
    async (tuKhoa) => {
        try {
            const data = await userApi.getUser(tuKhoa);
            // console.log(data);
            return data;
        } catch (error) {
            throw (error);
        }
    }
);
export const findUser = createAsyncThunk(
    "user/findUser",
    async (tuKhoa) => {
        try {
            const data = await userApi.findUser(tuKhoa);
            return data;
        } catch (error) {
            throw (error);
        }
    }
);
export const addUser = createAsyncThunk(
    "user/addUser",
    async (values) => {
        try {
            return await userApi.addUser(values);
        } catch (error) {
            throw (error);
        }
    }
);
export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (values) => {
        try {
            return await userApi.updateUser(values);
        } catch (error) {
            throw (error);
        }
    }
);
export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (TaiKhoan) => {
        try {
            return await userApi.deleteUser(TaiKhoan);

        } catch (error) {
            throw (error);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state, action) => {
            return { ...state, isloading: true };
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            return { ...state, isloading: false, users: action.payload };
        });
        builder.addCase(getUser.rejected, (state, action) => {
            return { ...state, isloading: false, error: action.payload };
        });
    },
});

export default userSlice.reducer;



