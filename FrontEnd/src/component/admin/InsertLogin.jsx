import React, { useState } from 'react';
import axios from 'axios';
import "./InsertLaptops.css"

const InsertLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [email,setEmail]=useState('')
    const [number,setNumber]=useState('')
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form inputs
        const validationErrors = {};
        if (!username) validationErrors.username = 'Username is required';
        if (!password || password.length <= 0) validationErrors.password = 'Valid password is required';
        if (!role) validationErrors.role = 'Role is required';
        if (!email) validationErrors.email='email is required';
        if (!number) validationErrors.number='number is requored'

        setErrors(validationErrors);

        // Stop if there are validation errors
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const loginData = {
            username,
            password,
            role,
            email,
            number
        };

        try {
            const response = await axios.post('http://localhost:9090/admin/upload/register', loginData, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log(response);
            alert('Login uploaded successfully!');
        } catch (error) {
            console.error(error);
            alert('Error uploading login.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="upload_main">
                <h4>Login FORM</h4>
                <div className='upload_box'>
                    <label>Login username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>
                <div className='update_box'>
                    <label>Login password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <div className='update_box'>
                    <label>Login Role:</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    {errors.role && <span className="error">{errors.role}</span>}
                </div>

                <div className='update_box'>
                    <label>Login Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className='update_box'>
                    <label>Login Number:</label>
                    <input
                        type="tel"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    {errors.number && <span className="error">{errors.number}</span>}
                </div>


                <button type="submit" className='upload_but'>UPLOAD</button>
            </div>
        </form>
    );
}

export default InsertLogin;
