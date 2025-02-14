import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLLaptops.css"; // Import external CSS file

const AdminIpads = () => {
  const [ipads, setIpads] = useState([]);
  const navigate = useNavigate();

  const fetchIpads = async () => {
    const res = await axios.get("http://localhost:9090/admin/ipads", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(`token`)}`,
      },
    });

    const { data } = res;
    console.log(data);
    setIpads(data);
  };

  useEffect(() => {
    fetchIpads();
  }, []);

  const delete_func = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/admin/delete/ipads/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      });
      setIpads(ipads.filter((ipads) => ipads.id !== id)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting ipads:", error);
    }
  };

  const edit = (id, name, cost, quantity, description, discount) => {
    navigate(
      `/updateipads/${id}/${name}/${cost}/${quantity}/${description}/${discount}`
    );
  };

  const add = () => {
    navigate("/insertipads");
  };

  return (
    <div className="admin-laptops-container">
      <table className="admin-laptops-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {ipads.map((element, index) => (
            <tr key={index}>
              <td>{element.id}</td>
              <td>
                <img
                  src={element.image}
                  alt="Laptop"
                  className="laptop-image"
                />
              </td>
              <td>{element.name}</td>
              <td>{element.quantity}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() =>
                    edit(
                      element.id,
                      element.name,
                      element.cost,
                      element.quantity,
                      element.description,
                      element.discount
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
                Add Laptop
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default AdminIpads