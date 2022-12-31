import React from 'react'
import { useForm } from "react-hook-form";
import { addUser } from '../../../Slice/userSlice'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
const AddUser = () => {
    const dispatch = useDispatch()

    const { register, handleSubmit, formState } = useForm({
        defaultValues: { taiKhoan: "", matKhau: "", hoTen: "", soDT: "", maLoaiNguoiDung: "", maNhom: "", email: "" },
        mode: "onTouched", // điều kiện kích hoạt validation, mặc định onSubmit
    });
    const { errors } = formState;
    const onSubmit = async (values) => {
        alert("Thêm người dùng thành công")
        return await dispatch(addUser(values))
    }
    return (
        <div>
            <form className='mt-5' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="text" className='form-control w-100 mt-2' placeholder='Nhập tài khoản'
                        {...register("taiKhoan", {
                            required: { value: true, message: "Tài khoản không để trống" },

                        })}
                    />
                    <div className="w-100 text-danger">
                        {errors.taiKhoan && <span>{errors.taiKhoan.message}</span>}
                    </div>
                </div>
                <div>
                    <input type="text" className='form-control w-100 mt-2' placeholder='Nhập mật khẩu'
                        {...register("matKhau", {
                            required: { value: true, message: "Mật khẩu không để trống" },

                        })}
                    />
                    <div className="w-100 text-danger">
                        {errors.matKhau && <span>{errors.matKhau.message}</span>}
                    </div>
                </div>
                <div>
                    <input type="text" className='form-control w-100 mt-2' placeholder='Nhập họ tên'
                        {...register("hoTen", {
                            required: { value: true, message: "Họ tên không để trống" },

                        })}
                    />
                    <div className="w-100 text-danger">
                        {errors.hoTen && <span>{errors.hoTen.message}</span>}
                    </div>
                </div>
                <div>
                    <input type="text" className='form-control w-100 mt-2' placeholder='Nhập số điện thoại'
                        {...register("soDT", {
                            required: { value: true, message: "Số điện thoại không để trống" },

                        })}
                    />
                    <div className="w-100 text-danger">
                        {errors.soDT && <span>{errors.soDT.message}</span>}
                    </div>
                </div>
                <div>
                    <select className='form-control w-100 mt-2'  {...register("maLoaiNguoiDung", {
                        required: { value: true, message: "VUi lòng chọn mã loại người dùng" },

                    })}>
                        <option value="">Chọn mã loại người dùng</option>
                        <option value="HV">HV</option>
                        <option value="GV">GV</option>
                    </select>
                    <div className="w-100 text-danger">
                        {errors.maLoaiNguoiDung && <span>{errors.maLoaiNguoiDung.message}</span>}
                    </div>
                </div>

                <div>
                    <select className='form-control w-100 mt-2'  {...register("maNhom", {
                        required: { value: true, message: "Vui lòng chọn mã nhóm" },

                    })}>
                        <option value="">Chọn mã nhóm</option>
                        <option value="GP01">GP01</option>
                        <option value="GP02">GP02</option>
                        <option value="GP03">GP03</option>
                        <option value="GP04">GP04</option>
                        <option value="GP05">GP05</option>
                        <option value="GP06">GP06</option>
                        <option value="GP07">GP07</option>
                        <option value="GP08">GP08</option>
                        <option value="GP09">GP09</option>
                        <option value="GP10">GP10</option>
                    </select>
                    <div className="w-100 text-danger">
                        {errors.maNhom && <span>{errors.maNhom.message}</span>}
                    </div>
                </div>

                <div>
                    <input type="text" className='form-control w-100 my-2' placeholder='Nhập email'
                        {...register("email", {
                            required: { value: true, message: "Email không để trống" },

                        })}
                    />
                    <div className="w-100 text-danger">
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                </div>
                <button className='btn btn-success'>
                    Thêm người dùng
                </button>
            </form>
            <button className='btn btn-danger my-3 '>
                <Link to="/managerUsers">Quay về ManagerUsers</Link>
            </button>
        </div>
    )
}

export default AddUser