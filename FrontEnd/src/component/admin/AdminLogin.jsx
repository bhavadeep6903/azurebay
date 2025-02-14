import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLLaptops.css"; // Import external CSS file

const AdminLogin = () => {
  const [login, setLogin] = useState([]);
  const navigate = useNavigate();

  const fetchLogin = async () => {
    const res = await axios.get("http://localhost:9090/admin/logindata", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(`token`)}`,
      },
    });

    const { data } = res;
    console.log(data);
    setLogin(data);
  };

  useEffect(() => {
    fetchLogin();
  }, []);

  const delete_func = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/admin/delete/login/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      });
      setLogin(login.filter((login) => login.id !== id)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting login:", error);
    }
  };

  const edit = (id, username,password,role,email,number) => {
    navigate(
      `/updatelogin/${id}/${username}/${password}/${role}/${email}/${number}`
    );
  };


  const add = () => {
    navigate("/insertlogin");
  };

  return (
    <div className="admin-laptops-container">
      <table className="admin-laptops-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th>Email</th>
            <th>Number</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {login.map((element, index) => (
            <tr key={index}>
              <td>{element.id}</td>
              
              <td>{element.username}</td>
              <td>{element.password}</td>
              <td>{element.role}</td>
              <td>{element.email}</td>
              <td>{element.number}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() =>
                    edit(
                      element.id,
                      element.username,
                      element.password,
                      element.role,
                      element.email,
                      element.number
                    )
                  }
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => delete_func(element.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} className="add-button-container">
              <button className="add-button" onClick={add}>
                Add Login
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default AdminLogin