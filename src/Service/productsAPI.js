import fetcher from "./fetcher";

const productsApi = {
    getCourse: async (value) => {
        return await fetcher.get("QuanLyKhoaHoc/LayDanhSachKhoaHoc", {
            params: {
                tenKhoaHoc: value,
                MaNhom: "GP01"
            },
        });
    },

    addCourse: async (values) => {
        return await fetcher.post("QuanLyKhoaHoc/ThemKhoaHocUploadHinh", values
        );
    },
    updateCourse: async (values) => {
        return await fetcher.post("QuanLyKhoaHoc/CapNhatKhoaHocUpload", values

        );
    },
    deleteCourse: async (value) => {
        return await fetcher.delete("QuanLyKhoaHoc/XoaKhoaHoc", {
            params: {
                MaKhoaHoc: value,
            },
        });
    },
    getDetailCourse: async (value) => {
        return await fetcher.get("QuanLyKhoaHoc/LayThongTinKhoaHoc", {
            params: {
                MaKhoaHoc: value,
            },
        });
    },
};

export default productsApi;