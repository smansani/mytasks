import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import alertcontext from './alertcontext';
import taskcontext from './taskcontext';
import './style/navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token'); 
    const { showalert } = useContext(alertcontext);
    const{user}=useContext(taskcontext);
    console.log({user})

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        showalert("Logged out successfully");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand mx-3" to="/">MY TASKS</Link>
            <div className="d-flex justify-content-between w-100">
                <Link className="nav-link my-2 text-light" aria-current="page" to="/">Home</Link>
                <div className='d-flex mx-2'>
                    {!isLoggedIn ? (
                        <Link className="btn btn-primary" to="/login">Login</Link>
                    ) : (
                        <>
                            <span className="navbar-text mx-2">Hello,{user}</span>
                            <button className="btn btn-primary"onClick={handleLogout} >Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
