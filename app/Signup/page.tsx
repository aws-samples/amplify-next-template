"use client";
import React, { useState } from 'react';
import './sign.css'; // Import the CSS file

const Signup: React.FC = () => {
    return (
        <div className='container'>
            <div className="left">
                <div className='header'>
                    <div className='text'>Brewery</div>
                </div>
                <div className="input-box">
                    <input type="text" required />
                    <label htmlFor="">Email*</label>
                </div>
                <div className="input-box">
                    <input type="text" required />
                    <label htmlFor="">Password*</label>
                </div>
                <div className="input-box">
                    <input type="text" required />
                    <label htmlFor="">Brewery Name*</label>
                </div>
                <div className="input-box">
                    <input type="text" required />
                    <label htmlFor="">Brewery Description*</label>
                </div>
                <div className="input-box">
                    <input type="text" required />
                    <label htmlFor="">Hours of Operation*</label>
                </div>
                <div className="input-box">
                    <input type="text" />
                    <label htmlFor="">Social Media URL</label>
                </div>
                <div className="input-box">
                    <input type="text" />
                    <label htmlFor="">Website URL</label>
                </div>
                <div className='input-box'>
                    <input type="file"/>
                    <label htmlFor="">Logo Image</label>
                 </div>
            </div>
            <div className="right">
                <div className='header'>
                    <div className='text'>Primary Contact</div>
                </div>
                <div className="input-box">
                    <input type="text" required />
                    <label htmlFor="">Name</label>
                </div>
                <div className="input-box">
                    <input type="text" required />
                    <label htmlFor="">Email</label>
                </div>
                <div className="input-box">
                    <input type="text" required />
                    <label htmlFor="">Phone Number</label>
                </div>
                <div className="input-box">
                    <button> Sign up</button>
                </div>
            </div>
        </div>
    );
}

export default Signup;