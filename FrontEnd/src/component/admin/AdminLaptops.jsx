import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLLaptops.css"; // Import external CSS file

const AdminLaptops = () => {
  const [laptops, setLaptops] = useState([]);
  const navigate = useNavigate();

  const fetchLaptops = async () => {
    const res = await axios.get("http://localhost:9090/admin/laptops", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(`token`)}`,
      },
    });

    const { data } = res;
    console.log(data);
    setLaptops(data);
  };

  useEffect(() => {
    fetchLaptops();
  }, []);

  const delete_func = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/admin/delete/laptops/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      });
      setLaptops(laptops.filter((laptop) => laptop.id !== id)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting laptop:", error);
    }
  };

  const edit = (id, name, cost, quantity, description, discount) => {
    navigate(
      `/updatelaptops/${id}/${name}/${cost}/${quantity}/${description}/${discount}`
    );
  };

  const add = () => {
    navigate("/insertlaptops");
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
          {laptops.map((element, index) => (
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
export default AdminLaptops