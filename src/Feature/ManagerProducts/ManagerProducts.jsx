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
        setTitleForm("Th??m kh??a h???c")
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
        mode: "onTouched", // ??i???u ki???n k??ch ho???t validation, m???c ?????nh onSubmit
    });
    const { errors } = formState;
    const handleChangeImage = (evt) => {
        // n???u input l?? file ????? l???y th??ng tin  file ta d??ng :evt.target.file
        const file = evt.target.files[0];
        if (!file) {
            return
        }
        //setvalue cho file h??nh ???nh c???a react hook form
        setValue("hinhAnh", file)
        setHinhAnh(file)
        // x??? l?? hi???n th??? h??nh ???nh preview ra cho user th???y
        const fileReader = new FileReader();
        //????y l?? k?? thu???t b???t ?????ng b???
        // chuy???n file ???nh nh??? ph??n th??nh file base 64
        fileReader.readAsDataURL(file)
        fileReader.onload = (evt) => {
            //evt.target.result l?? k???t qu??? c???a t???m ???nh chuy???n t??? nh??? ph??n sang base 64
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

            // Khi d??? li???u c?? ?????nh d???ng ?????c bi???t nh?? File,...
            // Ta c???n chuy???n v??? ?????nh d???ng multipart/form-data b???ng c??ch t???o 1 instance t??? class FormData v??? th??m d??? li???u v??o b???ng h??m append
            const formData = new FormData();
            for (let key in payload) {
                formData.append(key, payload[key]);
            }
            setValueOfForm(payload);
            await dispatch(addCourse(formData))
            alert("Th??m kh??a h???c th??nh c??ng")
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
    //x??a
    const handleDeleteCourse = async (value) => {
        await dispatch(deleteCourse(value));
        alert("N???u x??a kh??ng =>Kh??a h???c ???? ghi danh h???c vi??n kh??ng th??? x??a!")
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
        setTitleForm("C???p nh???t kh??a h???c")
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

            // Khi d??? li???u c?? ?????nh d???ng ?????c bi???t nh?? File,...
            // Ta c???n chuy???n v??? ?????nh d???ng multipart/form-data b???ng c??ch t???o 1 instance t??? class FormData v??? th??m d??? li???u v??o b???ng h??m append
            const formData = new FormData();
            for (let key in payload) {
                formData.append(key, payload[key]);
            }

            await dispatch(updateCourse(formData))
            alert("C???p nh???t kh??a h???c th??nh c??ng")
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
            <h1 className='text-center'>Qu???n l?? kh??a h???c</h1>
            <div className='d-flex search my-5'>
                <input type="text" className='form-control w-25 mx-2' placeholder='Nh???p t??n kh??a h???c' onChange={evt => handleSearch(evt)} />

            </div>
            <h1 className='text-center text-danger'>Kh??ng c?? kh??a h???c n??o</h1>
        </div>
    }
    return (
        <div >
            <h1 className='text-center'>Qu???n l?? kh??a h???c</h1>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titleForm}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="">
                            <label htmlFor="">M?? kh??a h???c</label>
                            <input
                                {...register("maKhoaHoc", {
                                    required: { value: true, message: "M?? kh??a h???c kh??ng ????? tr???ng" },

                                })}
                                className="form-control input"
                                placeholder="M?? kh??a h???c"
                                type="text"
                                onChange={evt => handleMKH(evt)}
                            />
                            <div className="w-100 text-danger">
                                {errors.maKhoaHoc && <span>{errors.maKhoaHoc.message}</span>}
                            </div>
                        </div>

                        <div className=" my-2 ">
                            <label htmlFor="">B?? danh</label>
                            <input
                                {...register("biDanh", {
                                    required: { value: true, message: "B?? danh kh??ng ????? tr???ng" },

                                })}
                                className="form-control input"
                                placeholder="Nh???p b?? danh"
                                type="text"
                                onChange={evt => handleBD(evt)}
                            />
                            <div className="w-100 text-danger">
                                {errors.biDanh && <span>{errors.biDanh.message}</span>}
                            </div>
                        </div>
                        <div className=" my-2 ">
                            <label htmlFor="">T??n kh??a h???c</label>
                            <input
                                {...register("tenKhoaHoc", {
                                    required: { value: true, message: "T??n kh??a h???c kh??ng ????? tr???ng" },

                                })}
                                className="form-control input"
                                placeholder="T??n kh??a h???c"
                                type="text"
                                onChange={evt => handleNAME(evt)}
                            />
                            <div className="w-100 text-danger">
                                {errors.tenKhoaHoc && <span>{errors.tenKhoaHoc.message}</span>}
                            </div>
                        </div>
                        <div className=" my-2 ">
                            <label htmlFor="">M?? t???</label>
                            <input
                                {...register("moTa", {
                                    required: { value: true, message: "M?? t??? kh??ng ????? tr???ng" },

                                })}
                                className="form-control input"
                                placeholder="Nh???p m?? t???"
                                type="text"
                                onChange={evt => handleMOTA(evt)}
                            />
                            <div className="w-100 text-danger">
                                {errors.moTa && <span>{errors.moTa.message}</span>}
                            </div>
                        </div>
                        <div>
                            <label>H??nh ???nh</label>
                            {/* <input type="file" {...register("hinhAnh")} /> */}
                            <input type="file" onChange={handleChangeImage} />
                            {imgPreview && <img src={imgPreview} alt="Preview" width="300px" height="300px"></img>}
                        </div>

                        <div>
                            <label htmlFor="">Ch???n m?? danh m???c kh??a h???c</label>
                            <select className='form-control' onChange={evt => handleMADMKH(evt)} {...register("maDanhMucKhoaHoc", {
                                required: { value: true, message: "Vui l??ng ch???n m?? danh m???c" },

                            })}>
                                <option value="">Ch???n m?? danh m???c</option>
                                <option value="BackEnd">L???p tr??nh Backend</option>
                                <option value="Design">Thi???t k??? Web</option>
                                <option value="DiDong">L???p tr??nh di ?????ng</option>
                                <option value="FrontEnd">L???p tr??nh Front end</option>
                                <option value="FullStack">L???p tr??nh Full Stack</option>
                                <option value="TuDuy">T?? duy l???p tr??nh</option>
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
                        C???p nh???t
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <button className='btn btn-primary' onClick={() => addCourses()}>Th??m kh??a h???c</button>
            </div>
            <div className='d-flex search my-5'>
                <input type="text" className='form-control w-25 mx-2' placeholder='Nh???p t??n kh??a h???c' onChange={evt => handleSearch(evt)} />
            </div>
            <div className='table-responsive-sm  table-responsive-md table-responsive-lg table-responsive-xl'>
                <table className='table table-dark'>
                    <thead>
                        <tr className='text-danger'>
                            <th>STT</th>
                            <th>M?? kh??a h???c</th>
                            <th>T??n kh??a h???c</th>
                            <th>H??nh ???nh</th>
                            <th>M?? t???</th>
                            <th>Kh??a h???c</th>
                            <th>Ng?????i t???o</th>
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
        </div>
    )
}

export default ManagerProducts