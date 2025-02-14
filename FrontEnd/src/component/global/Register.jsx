import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate=useNavigate()
  const ref1 = useRef(null); // Username
  const ref2 = useRef(null); // Password
  const ref3 = useRef(null); // Email
  const ref4 = useRef(null); // Phone Number

  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const errors = {};
    const username = ref1.current.value.trim();
    const password = ref2.current.value.trim();
    const email = ref3.current.value.trim();
    const number = ref4.current.value.trim();

    // Username validation
    if (!username) {
      errors.username = "Username is required.";
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      errors.email = "Invalid email format.";
    }

    // Phone number validation
    const phonePattern = /^[0-9]{10}$/;
    if (!number) {
      errors.number = "Phone number is required.";
    } else if (!phonePattern.test(number)) {
      errors.number = "Phone number must be 10 digits.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const register = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const res = await axios.post("http://localhost:9090/guest/register", {
        username: ref1.current.value,
        password: ref2.current.value,
        role: "ROLE_USER",
        email: ref3.current.value,
        number: ref4.current.value,
      });

      const { data } = res;
      if (data != null) {
        alert("REGISTER SUCCESS....!!!");
      } else {
        alert("REGISTER failed....!!!");
      }
    } catch (error) {
      alert("Error occurred while registering. Please try again.");
      console.error(error);
    }
  };

  const login=()=>{
    navigate("/sign")
  }

  return (
    <div className="reg_body">
      <h5 className="h5">Create Your Apple Account</h5>
      <p className="p">One Apple Account is all you need to access all Apple services. <br />
      Already have an Apple Account? <button onClick={login}>Sign In →</button></p>
       <div className="input-wrapper">
        <input type="text" ref={ref1} placeholder="Enter Username" />
        {errors.username && <p className="error">{errors.username}</p>}
      </div>
      <div className="input-wrapper">
        <input type="password" ref={ref2} placeholder="Enter Password" />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div className="input-wrapper">
        <input type="email" ref={ref3} placeholder="Enter Email" />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="input-wrapper">
        <input type="tel" ref={ref4} placeholder="Enter Phone Number" />
        {errors.number && <p className="error">{errors.number}</p>}
      </div>
      <button onClick={register} className="reg_but">Register</button>
    </div>
  );
};

export default Register;
