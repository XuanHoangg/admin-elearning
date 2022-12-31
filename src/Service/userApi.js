import fetcher from "./fetcher";

const userApi = {
    getUser: async (value) => {
        return await fetcher.get("QuanLyNguoiDung/LayDanhSachNguoiDung", {
            params: {
                tuKhoa: value,
            },
        });
    },
    findUser: async (value) => {
        return await fetcher.get("QuanLyNguoiDung/TimKiemNguoiDung", {
            params: {
                tuKhoa: value,
            },
        });
    },
    addUser: async (values) => {
        return await fetcher.post("QuanLyNguoiDung/ThemNguoiDung", values

        );
    },
    updateUser: async (values) => {
        return await fetcher.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", values

        );
    },
    deleteUser: async (value) => {
        return await fetcher.delete("QuanLyNguoiDung/XoaNguoiDung", {
            params: {
                TaiKhoan: value,
            },
        });
    },
};

export default userApi;