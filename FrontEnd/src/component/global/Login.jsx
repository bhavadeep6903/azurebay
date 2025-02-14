import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import axios from "axios";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const [error, setError] = useState(null);

    const validateForm = () => {
        const username = ref1.current.value;
        const password = ref2.current.value;
        if (!username || !password) {
            setError("Username and password are required");
            return false;
        }
        setError(null);
        return true;
    };

    const login = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            const res = await axios.post("http://localhost:9090/login", {"username": ref1.current.value, "password": ref2.current.value});
            const { data } = res;
            const { login } = data;

            console.log("Response data:", data);

            if (login === "success") {
                const { role, token, username } = data;
                window.localStorage.setItem("token", token);

                if (username) {
                    role === "ROLE_USER" ? navigate(`/userdashboard/${username}`) : navigate("/admindashboard");
                } else {
                    throw new Error("Username is not defined in the response data");
                }
            } else {
                navigate("/error");
            }
        } catch (error) {
            console.error("Error during login:", error);
            navigate("/error");
        }
    };

    const register = () => {
        navigate("/register");
    };

    return (
        <>
        <div className="body">
            <h4>Sign in to Apple Store</h4>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div className="input-type">
                <i className="fa fa-user"></i>
                <input type="text" ref={ref1} placeholder="Enter User Name" className="input" />
            </div>
            <br />
            <div className="input-type">
                <i className="fa fa-key"></i>
                <input type="password" ref={ref2} placeholder="Enter User password" className="input" />
            </div>
            <br />
            <button onClick={login} className="button">LOGIN</button>
            <br />
            <p>Dont Have An Apple Account ?<button onClick={register}>Create Your Now →</button></p>
        </div>
        </>
    );
};

export default Login;
