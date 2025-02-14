import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./UpdateLaptops.css";

const UpdateLogin = () => {
    const { pid, pusername, ppassword, prole, pemail, pnumber } = useParams();

    const [id, setId] = useState(parseInt(pid) || 0);
    const [username, setUsername] = useState(pusername || '');
    const [password, setPassword] = useState(ppassword || '');
    const [role, setRole] = useState(prole || '');
    const [email, setEmail] = useState(pemail || '');
    const [number, setNumber] = useState(pnumber || '');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form inputs
        const validationErrors = {};
        if (!id) validationErrors.id = 'Login ID is required';
        if (number && !/^\d{10}$/.test(number)) {
            validationErrors.number = 'Phone number must be 10 digits long';
        }

        setErrors(validationErrors);

        // Stop if there are validation errors
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        // Prepare the payload
        const loginData = {
            id:id || undefined,
            username: username || undefined,
            password: password || undefined,
            role: role || undefined,
            email: email || undefined,
            number: number || undefined,
        };

        try {
            const response = await axios.put('http://localhost:9090/admin/update/login', loginData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response);
            alert('Login updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Error updating login.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="update_main">
                <h4>Update Login Form</h4>

                <div className="update_box">
                    <label>Login ID:</label>
                    <input
                        type="number"
                        value={id}
                        readOnly
                    />
                    {errors.id && <span className="error">{errors.id}</span>}
                </div>

                <div className="update_box">
                    <label>Login Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="update_box">
                    <label>Login Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="update_box">
                    <label>Login Role:</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>

                <div className="update_box">
                    <label>Login Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="update_box">
                    <label>Login Number:</label>
                    <input
                        type="tel"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    {errors.number && <span className="error">{errors.number}</span>}
                </div>

                <button type="submit" className="update_but">Update Login</button>
            </div>
        </form>
    );
};

export default UpdateLogin;
