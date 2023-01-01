import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData/SidebarData'
import { useSelector, useDispatch } from "react-redux";
import { FaUserEdit, FaUserLock, FaUserPlus } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { logout } from '../Slice/authSlice';
import { Container, Navbar, Nav } from "react-bootstrap";
import './styles.css'
const Sidebar = () => {
    const [sidebar, setSibar] = useState(false)
    const showSidebar = () => setSibar(!sidebar);
    const { user } = useSelector((state) => state.auth);
    //sidebar true => nav hiện 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogOut = () => {
        dispatch(logout());
        navigate("/signin");
    };
    return (
        <>
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
                <div className='sign'>
                    {user ? (
                        <Nav className="signedin">
                            <div className="user text-info pt-2">
                                <FaUserEdit />
                                <Link to="/updateAccount" className="mx-2 ">{user.hoTen}</Link>
                                <div
                                    onClick={onLogOut}
                                    className="btn  btn-info fs-6 btn-logout"
                                >
                                    Đăng xuất
                                </div>
                            </div>

                            <Dropdown>

                                <Dropdown.Menu>
                                    <div onClick={onLogOut} className="btn  btn-info fs-6">
                                        Đăng xuất
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    ) : (
                        <Nav className="auth">
                            <div className="signin me-3">
                                <Link to="/signin">
                                    <FaUserLock className="logo_sign" />
                                    Đăng nhập
                                </Link>

                            </div>
                            {/* <div className="signup"></div> */}
                        </Nav>
                    )}
                </div>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='nav-toggle'>
                        <Link to="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span className='title'>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Sidebar