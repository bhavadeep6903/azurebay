import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLLaptops.css"; // Import external CSS file

const AdminHomeapp = () => {
  const [homeapp, setHomeapp] = useState([]);
  const navigate = useNavigate();

  const fetcHomeapp = async () => {
    const res = await axios.get("http://localhost:9090/admin/homeapp", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(`token`)}`,
      },
    });

    const { data } = res;
    console.log(data);
    setHomeapp(data);
  };

  useEffect(() => {
    fetcHomeapp();
  }, []);

  const delete_func = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/admin/delete/homeapp/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      });
      setHomeapp(homeapp.filter((homeapp) => homeapp.id !== id)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting homeapp:", error);
    }
  };

  const edit = (id, name, cost, quantity, description, discount) => {
    navigate(
      `/updatehomeapp/${id}/${name}/${cost}/${quantity}/${description}/${discount}`
    );
  };

  const add = () => {
    navigate("/inserthomeapp");
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
          {homeapp.map((element, index) => (
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
export default AdminHomeapp