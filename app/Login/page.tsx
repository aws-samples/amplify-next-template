"use client";
import React, { useState } from 'react';
import './login.css'; // Import the CSS file
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {

    return (
        <div className="container">
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <input type="email" placeholder='Email' required/>
                <MdEmail className='icon' />
            </div>
            <div className="inputs">
                <input type="password" placeholder='Password' required/>

                <FaLock className='icon'/>
            </div>
            {/*<div className="forgot-password">Forgot Password? <span>Click Here!</span></div>*/}
            <div className="submit-container">
                <button className="button" type="button">Login</button>
                <button className="button" type="button">Sign Up</button>
                {/*<button onClick={() => navigate("/Signup")}>Sign Up</button>
                <div className={action=="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
                <div className={action=="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>*/}
            </div>
        </div>
    );
}

export default Login;