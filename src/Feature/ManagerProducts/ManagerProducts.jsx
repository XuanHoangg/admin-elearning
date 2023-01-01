import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as AiIcons from "react-icons/ai";
import { getCourse, addCourse, updateCourse, deleteCourse, getDetailCourse } from '../../Slice/productsSlice'
import { useDispatch } from "react-redux";
import { Modal, Button } from 'react-bootstrap'
//import { Link } from 'react-router-dom';



import './styles.css'

const ManagerProducts = () => {
    // defaultValues: { maKhoaHoc: "", biDanh: "", tenKhoaHoc: "", moTa: "", luotXem: 0, danhGia: 0, hinhAnh: "", maNhom: "", ngayTao: "", maDanhMucKhoaHoc: "", taiKhoanNguoiTao: "" },
    const [course, setCourse] = useState([]);
    const [show, setShow] = useState(false);
    const [imgPreview, setImgPreview] = useState(null)
    const [disableBtnAdd, setDisableBtnAdd] = useState(false)
    const [disableBtnUpdate, setDisableBtnUpdate] = useState(false)
    const [titleForm, setTitleForm] = useState("");
    // const [getmaKhoaHoc, setGetMakhoaHoc] = useState("");
    // fill info course on input
    const [maKhoaHocs, setMaKhocHoc] = useState("");
    const [biDanh, setBiDanh] = useState("");
    const [tenKhoaHoc, setTenKhoaHoc] = useState("");
    const [moTa, setMoTa] = useState("");
    const [hinhAnh, setHinhAnh] = useState("");
    const [maDanhMucKhoaHoc, setMaDanhMuc] = useState("");
    const [valueOfForm, setValueOfForm] = useState("");


    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            try {
                const data = await dispatch(getCourse());
                return setCourse(data.payload)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [show]);

    const handleSearch = async (e) => {
        const tuKhoa = e.target.value;
        try {
            const course = await dispatch(getCourse(tuKhoa));
            if (tuKhoa === "") {
                try {
                    const allCourse = await dispatch(getCourse());
                    setCourse(allCourse.payload)
                    return
                } catch (error) {
                    console.log(error);
                }
            }
            setCourse(course.payload)
        } catch (error) {
            console.log(error);
        }
    }
    const handleClose = () => {
        setShow(false)
    }
    const addCourses = () => {
        setDisableBtnAdd(false);
        setDisableBtnUpdate(true);
        setTitleForm("Thêm khóa học")
        setValue("maKhoaHoc", "")
        setValue("biDanh", "")
        setValue("tenKhoaHoc", "")
        setValue("moTa", "")
        setValue("maDanhMucKhoaHoc", "")
        setShow(true)
    }
    const { taiKhoan } = JSON.parse(localStorage.getItem("user"))
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    // document.write(today);
    const { register, handleSubmit, formState, setValue } = useForm({
        defaultValues: { maKhoaHoc: "", biDanh: "", tenKhoaHoc: "", moTa: "", luotXem: 0, danhGia: 0, hinhAnh: "", maNhom: "", ngayTao: "", maDanhMucKhoaHoc: "", taiKhoanNguoiTao: "" },
        mode: "onTouched", // điều kiện kích hoạt validation, mặc định onSubmit
    });
    const { errors } = formState;
    const handleChangeImage = (evt) => {
        // nếu input là file để lấy thông tin  file ta dùng :evt.target.file
        const file = evt.target.files[0];
        if (!file) {
            return
        }
        //setvalue cho file hình ảnh của react hook form
        setValue("hinhAnh", file)
        setHinhAnh(file)
        // xử lý hiển thị hình ảnh preview ra cho user thấy
        const fileReader = new FileReader();
        //đây là kĩ thuật bất đồng bộ
        // chuyển file ảnh nhị phân thành file base 64
        fileReader.readAsDataURL(file)
        fileReader.onload = (evt) => {
            //evt.target.result là kết quả của tấm ảnh chuyển từ nhị phân sang base 64
            setImgPreview(evt.target.result)
            // console.log(evt.target.result);
        }
    }
    const handleMKH = (e) => {
        const x = e.target.value;
        setMaKhocHoc(x)
    }
    const handleBD = (e) => {
        const x = e.target.value;
        setBiDanh(x)
    }
    const handleNAME = (e) => {
        const x = e.target.value;
        setTenKhoaHoc(x)
    }
    const handleMOTA = (e) => {
        const x = e.target.value;
        setMoTa(x)
    }
    const handleMADMKH = (e) => {
        const x = e.target.value;
        setMaDanhMuc(x)
    }
    const onSubmit = async (values) => {

        try {
            const payload = {
                ...values,
                hinhAnh: values.hinhAnh,
                maNhom: "GP01",
                ngayTao: today,
                taiKhoanNguoiTao: taiKhoan,
            };

            // Khi dữ liệu có định dạng đặc biệt như File,...
            // Ta cần chuyển về định dạng multipart/form-data bằng cách tạo 1 instance từ class FormData về thêm dữ liệu vào bằng hàm append
            const formData = new FormData();
            for (let key in payload) {
                formData.append(key, payload[key]);
            }
            setValueOfForm(payload);
            await dispatch(addCourse(formData))
            alert("Thêm khóa học thành công")
            try {
                const data = await dispatch(getCourse());
                handleClose()
                return setCourse(data.payload)
            } catch (error) {
                console.log(error);
            }

        } catch (error) {
            console.log(error);
        }
    };
    //xóa
    const handleDeleteCourse = async (value) => {
        await dispatch(deleteCourse(value));
        alert("Nếu xóa không =>Khóa học đã ghi danh học viên không thể xóa!")
        try {
            const data = await dispatch(getCourse());

            return setCourse(data.payload)
        } catch (error) {
            console.log(error);
        }
    }
    const edit = async (value) => {
        setShow(true)
        setDisableBtnAdd(true);
        setDisableBtnUpdate(false);
        setTitleForm("Cập nhật khóa học")
        const data = await dispatch(getDetailCourse(value));
        setValue("maKhoaHoc", data.payload.maKhoaHoc)
        setValue("biDanh", data.payload.biDanh)
        setValue("tenKhoaHoc", data.payload.tenKhoaHoc)
        setValue("moTa", data.payload.moTa)
        setValue("maDanhMucKhoaHoc", data.payload.danhMucKhoaHoc.maDanhMucKhoahoc)
        setMaKhocHoc(data.payload.maKhoaHoc)
        setBiDanh(data.payload.biDanh)
        setTenKhoaHoc(data.payload.tenKhoaHoc)
        setMoTa(data.payload.moTa)
        setMaDanhMuc(data.payload.danhMucKhoaHoc.maDanhMucKhoahoc)

    }
    const handleUpdateCourse = async () => {
        try {
            const payload = {
                maKhoaHoc: maKhoaHocs,
                biDanh: biDanh,
                tenKhoaHoc: tenKhoaHoc,
                moTa: moTa,
                luotXem: 0,
                danhGia: 0,
                hinhAnh: hinhAnh,
                maNhom: "GP01",
                ngayTao: today,
                maDanhMucKhoaHoc: maDanhMucKhoaHoc,
                taiKhoanNguoiTao: taiKhoan,
            };

            // Khi dữ liệu có định dạng đặc biệt như File,...
            // Ta cần chuyển về định dạng multipart/form-data bằng cách tạo 1 instance từ class FormData về thêm dữ liệu vào bằng hàm append
            const formData = new FormData();
            for (let key in payload) {
                formData.append(key, payload[key]);
            }

            await dispatch(updateCourse(formData))
            alert("Cập nhật khóa học thành công")
            try {
                const data = await dispatch(getCourse());
                handleClose()
                return setCourse(data.payload)
            } catch (error) {
                console.log(error);
            }

        } catch (error) {
            console.log(error);
        }
    }
    if (!course) {
        return <div>
            <h1 className='text-center'>Quản lý khóa học</h1>
            <div className='d-flex search my-5'>
                <input type="text" className='form-control w-25 mx-2' placeholder='Nhập tên khóa học' onChange={evt => handleSearch(evt)} />

            </div>
            <h1 className='text-center text-danger'>Không có khóa học nào</h1>
        </div>
    }
    return (
        <div >
            <h1 className='text-center'>Quản lý khóa học</h1>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titleForm}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="">
                            <label htmlFor="">Mã khóa học</label>
                            <input
                                {...register("maKhoaHoc", {
                                    required: { value: true, message: "Mã khóa học không để trống" },

                                })}
                                className="form-control input"
                                placeholder="Mã khóa học"
                                type="text"
                                onChange={evt => handleMKH(evt)}
                            />
                            <div className="w-100 text-danger">
                                {errors.maKhoaHoc && <span>{errors.maKhoaHoc.message}</span>}
                            </div>
                        </div>

                        <div className=" my-2 ">
                            <label htmlFor="">Bí danh</label>
                            <input
                                {...register("biDanh", {
                                    required: { value: true, message: "Bí danh không để trống" },

                                })}
                                className="form-control input"
                                placeholder="Nhập bí danh"
                                type="text"
                                onChange={evt => handleBD(evt)}
                            />
                            <div className="w-100 text-danger">
                                {errors.biDanh && <span>{errors.biDanh.message}</span>}
                            </div>
                        </div>
                        <div className=" my-2 ">
                            <label htmlFor="">Tên khóa học</label>
                            <input
                                {...register("tenKhoaHoc", {
                                    required: { value: true, message: "Tên khóa học không để trống" },

                                })}
                                className="form-control input"
                                placeholder="Tên khóa học"
                                type="text"
                                onChange={evt => handleNAME(evt)}
                            />
                            <div className="w-100 text-danger">
                                {errors.tenKhoaHoc && <span>{errors.tenKhoaHoc.message}</span>}
                            </div>
                        </div>
                        <div className=" my-2 ">
                            <label htmlFor="">Mô tả</label>
                            <input
                                {...register("moTa", {
                                    required: { value: true, message: "Mô tả không để trống" },

                                })}
                                className="form-control input"
                                placeholder="Nhập mô tả"
                                type="text"
                                onChange={evt => handleMOTA(evt)}
                            />
                            <div className="w-100 text-danger">
                                {errors.moTa && <span>{errors.moTa.message}</span>}
                            </div>
                        </div>
                        <div>
                            <label>Hình ảnh</label>
                            {/* <input type="file" {...register("hinhAnh")} /> */}
                            <input type="file" onChange={handleChangeImage} />
                            {imgPreview && <img src={imgPreview} alt="Preview" width="300px" height="300px"></img>}
                        </div>

                        <div>
                            <label htmlFor="">Chọn mã danh mục khóa học</label>
                            <select className='form-control' onChange={evt => handleMADMKH(evt)} {...register("maDanhMucKhoaHoc", {
                                required: { value: true, message: "Vui lòng chọn mã danh mục" },

                            })}>
                                <option value="">Chọn mã danh mục</option>
                                <option value="BackEnd">Lập trình Backend</option>
                                <option value="Design">Thiết kế Web</option>
                                <option value="DiDong">Lập trình di động</option>
                                <option value="FrontEnd">Lập trình Front end</option>
                                <option value="FullStack">Lập trình Full Stack</option>
                                <option value="TuDuy">Tư duy lập trình</option>
                            </select>
                            <div className="w-100 text-danger">
                                {errors.maDanhMucKhoaHoc && <span>{errors.maDanhMucKhoaHoc.message}</span>}
                            </div>
                        </div>
                        <div className="text-center footer_form">
                            <button className="btn btn-warning my-1" disabled={disableBtnAdd}>
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleUpdateCourse()} disabled={disableBtnUpdate}>
                        Cập nhật
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <button className='btn btn-primary' onClick={() => addCourses()}>Thêm khóa học</button>
            </div>
            <div className='d-flex search my-5'>
                <input type="text" className='form-control w-25 mx-2' placeholder='Nhập tên khóa học' onChange={evt => handleSearch(evt)} />
            </div>
            <table className='table table-dark'>
                <thead>
                    <tr className='text-danger'>
                        <th>STT</th>
                        <th>Mã khóa học</th>
                        <th>Tên khóa học</th>
                        <th>Hình ảnh</th>
                        <th>Mô tả</th>
                        <th>Khóa học</th>
                        <th>Người tạo</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        course.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.maKhoaHoc}</td>
                                <td>{item.tenKhoaHoc}</td>
                                <td >
                                    <img src={item.hinhAnh} alt={item.tenKhoaHoc} style={{ width: "50px", height: "50px" }} />
                                </td>
                                <td style={{ width: "100px" }}>
                                    {item.moTa}
                                </td>
                                <td>{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</td>
                                <td>{item.nguoiTao.taiKhoan}</td>
                                <td>
                                    <button className='btn btn-success mx-2' onClick={() => edit(item.maKhoaHoc)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => handleDeleteCourse(item.maKhoaHoc)}>Del</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default ManagerProducts