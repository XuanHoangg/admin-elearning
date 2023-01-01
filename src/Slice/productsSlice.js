import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsApi from "../Service/productsAPI";

const initialState = {
    products: [],
    isloading: false,
    error: null,
};

export const getCourse = createAsyncThunk(
    "course/getCourse",
    async (tuKhoa) => {
        try {
            const data = await productsApi.getCourse(tuKhoa);
            // console.log(data);
            return data;
        } catch (error) {
            throw (error);
        }
    }
);

export const addCourse = createAsyncThunk(
    "course/addCourse",
    async (values) => {
        try {
            return await productsApi.addCourse(values);
        } catch (error) {
            throw (error);
        }
    }
);
export const updateCourse = createAsyncThunk(
    "course/updateCourse",
    async (values) => {
        try {
            return await productsApi.updateCourse(values);
        } catch (error) {
            throw (error);
        }
    }
);
export const deleteCourse = createAsyncThunk(
    "course/deleteCourse",
    async (value) => {
        try {
            return await productsApi.deleteCourse(value);

        } catch (error) {
            throw (error);
        }
    }
);
export const getDetailCourse = createAsyncThunk(
    "course/getDetailCourse",
    async (value) => {
        try {
            return await productsApi.getDetailCourse(value);

        } catch (error) {
            throw (error);
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourse.pending, (state, action) => {
            return { ...state, isloading: true };
        });
        builder.addCase(getCourse.fulfilled, (state, action) => {
            return { ...state, isloading: false, users: action.payload };
        });
        builder.addCase(getCourse.rejected, (state, action) => {
            return { ...state, isloading: false, error: action.payload };
        });
    },
});

export default productSlice.reducer;



