import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as AiIcons from "react-icons/ai";
import { getUser, findUser, deleteUser, updateUser } from '../../Slice/userSlice'
import { useDispatch } from "react-redux";
import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import './styles.css'

const ManagerUser = () => {
    const [data, setData] = useState([]); // ds user
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const [updateAccount, setUpdateAccount] = useState("");
    const [updatePass, setUpdatePass] = useState("");
    const [updateName, setUpdateName] = useState("");
    const [updateNumberPhone, setUpdateNumberPhone] = useState("");
    const [updateTypeOfUserCode, setUpdateTypeOfUserCode] = useState("");
    const [updateEmail, setUpdateEmail] = useState("");


    const [userForUpdate, setUserForUpdate] = useState("");
    const handleClose = () => {
        setShow(false)
    }
    const handleCloseUpdate = () => {
        setShowUpdate(false)
    }
    const dispatch = useDispatch()
    //show ds user
    useEffect(() => {
        (async () => {
            try {
                const data = await dispatch(getUser());
                setData(data.payload)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [userForUpdate]);// mượn update user để render lại giao diện

    //tìm kiếm
    const { register, handleSubmit, formState } = useForm({
        defaultValues: { tuKhoa: "" },
        mode: "onTouched", // điều kiện kích hoạt validation, mặc định onSubmit
    });

    const onSubmit = async (values) => {
        try {
            const x = await dispatch(findUser(values.tuKhoa));
            if (values.tuKhoa === "") {
                try {
                    const data = await dispatch(getUser());
                    setData(data.payload)
                    return
                } catch (error) {
                    console.log(error);
                }
            }
            setData(x.payload)
        } catch (error) {
            console.log(error);
        }
    };

    //xóa
    const removeUser = async (value) => {
        setShow(true)
        await dispatch(deleteUser(value));
        const data = await dispatch(getUser());
        setData(data.payload)
    }
    const edit = async (value) => {
        try {
            const x = await dispatch(findUser(value.soDt));
            const getUserForUpdate = x.payload.find((item) => item.taiKhoan === value.taiKhoan)
            setUpdateAccount(getUserForUpdate.taiKhoan)
            setUpdatePass(getUserForUpdate.matKhau)
            setUpdateName(getUserForUpdate.hoTen)
            setUpdateNumberPhone(getUserForUpdate.soDt)
            setUpdateTypeOfUserCode(getUserForUpdate.maLoaiNguoiDung)
            setUpdateEmail(getUserForUpdate.email)
        } catch (error) {
            console.log(error);
        }
        setShowUpdate(true)
    }
    const handleUpdate = async () => {
        const user = {
            taiKhoan: updateAccount,
            matKhau: updatePass,
            hoTen: updateName,
            soDT: updateNumberPhone,
            maLoaiNguoiDung: updateTypeOfUserCode,
            maNhom: "GP01",
            email: updateEmail,
        }
        try {
            await dispatch(updateUser(user))
            setUserForUpdate(user)
            return handleCloseUpdate()
        } catch (error) {
            console.log(error);
        }
    }
    const pass = (e) => {
        const x = e.target.value;
        setUpdatePass(x)
    }
    const name = (e) => {
        const x = e.target.value;
        setUpdateName(x)
    }
    const sdt = (e) => {
        const x = e.target.value;
        setUpdateNumberPhone(x)
    }
    const typeOfUser = (e) => {
        const x = e.target.value;
        setUpdateTypeOfUserCode(x)
    }
    const email = (e) => {
        const x = e.target.value;
        setUpdateEmail(x)
    }
    return (
        <div className='user'>
            <h1 className='text-center'>Quản lý user</h1>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Nếu xóa không thành công thì đó là tải khoản của <br />
                        <b>(1) Người dùng này đã tạo khóa học không thể xóa!</b> <br />
                        <b>(2) Người dùng đã được ghi danh không thể xóa!</b></p> <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label htmlFor="">Tài khoản</label>
                        <input type="text" className='form-control my-1' placeholder='Nhập tài khoản' defaultValue={updateAccount} value={updateAccount} />
                    </div>
                    <div>
                        <label htmlFor="">Mật khẩu</label>
                        <input type="text" className='form-control my-1' placeholder='Nhập mật khẩu' defaultValue={updatePass} onChange={evt => pass(evt)} />
                    </div>
                    <div>
                        <label htmlFor="">Họ tên</label>
                        <input type="text" className='form-control my-1' placeholder="Nhập họ tên" defaultValue={updateName} onChange={evt => name(evt)} />
                    </div>
                    <div>
                        <label htmlFor="">Số điện thoại</label>
                        <input type="text" className='form-control my-1' placeholder="Nhập số điện thoại" defaultValue={updateNumberPhone} onChange={evt => sdt(evt)} />
                    </div>
                    <div>
                        <label htmlFor="">Loại người dùng</label>
                        <select className='form-control my-1' defaultValue={updateTypeOfUserCode} onChange={evt => typeOfUser(evt)}>
                            <option value="">Chọn loại người dùng</option>
                            <option value="HV">Học viên</option>
                            <option value="GV">Giáo viên</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Mã nhóm</label>
                        <select name="" id="" className='form-control my-1' defaultValue="GP01">

                            <option value="GP01">GP01</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Email</label>
                        <input type="text" className='form-control my-1' placeholder="Nhập email" defaultValue={updateEmail} onChange={evt => email(evt)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => handleUpdate()}>
                        Cập nhật
                    </Button>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='addUser my-3'>
                <Link to="/addUser" style={{ color: "white", textDecoration: "none" }}>Thêm người dùng</Link>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className='d-flex my-5 search'>
                    <input type="text" className='form-control w-25 mx-2' placeholder='Nhập từ khóa (tài khoản,số điện thoại)'
                        {...register("tuKhoa")}
                    />
                    <button className='btn btn-secondary'><AiIcons.AiOutlineSearch /></button>
                </form>
            </div>
            <div className='table-responsive-sm  table-responsive-md table-responsive-lg table-responsive-xl'>
                <table className='table table-dark '>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tài khoản</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Mã loại người dùng</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.taiKhoan}</td>
                                    <td>{item.hoTen}</td>
                                    <td>{item.email}</td>
                                    <td>{item.soDt}</td>
                                    <td>{item.maLoaiNguoiDung}</td>
                                    <td>
                                        <button className='btn btn-success mx-2' onClick={() => edit(item)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => removeUser(item.taiKhoan)}>Del</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManagerUser