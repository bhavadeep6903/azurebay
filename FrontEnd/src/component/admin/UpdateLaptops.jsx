import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./UpdateLaptops.css"

const UpdateLaptopForm = () => {

    const {pid,pname,pcost,pquantity,pdescription,pdiscount} =useParams()

    const [id, setId] = useState(parseInt(pid));
    const [name, setName] = useState(pname);
    const [cost, setCost] = useState(parseInt(pcost));
    const [quantity, setQuantity] = useState(parseInt(pquantity));
    const [file, setFile] = useState(null);
    const [discount, setDiscount] = useState(parseInt(pdiscount));
    const [description, setDescription] = useState(pdescription);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form inputs
        const validationErrors = {};
        if (!id) validationErrors.id = 'Laptop ID is required';
        if (cost && cost <= 0) validationErrors.cost = 'Valid Product Cost is required';
        if (quantity && quantity <= 0) validationErrors.quantity = 'Valid Product Quantity is required';
        if (discount && discount < 0) validationErrors.discount = 'Valid Product Discount is required';

        setErrors(validationErrors);

        // Stop if there are validation errors
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const formData = new FormData();
        formData.append('id', id);
        if (name) formData.append('name', name);
        if (cost) formData.append('cost', cost);
        if (quantity) formData.append('quantity', quantity);
        if (file) formData.append('file', file);
        if (discount) formData.append('discount', discount);
        if (description) formData.append('description', description);

        try {
            const response = await axios.put('http://localhost:9090/admin/update/laptops', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log(response);
            alert('Laptop updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Error updating laptop.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="update_main">
                <h4>Update Laptop Form</h4>

                <div className='update_box'>
                    <label>Laptop ID:</label>
                    <input
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                    {errors.id && <span className="error">{errors.id}</span>}
                </div>

                <div className='update_box'>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className='update_box'>
                    <label>Product Cost:</label>
                    <input
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                    {errors.cost && <span className="error">{errors.cost}</span>}
                </div>

                <div className='update_box'>
                    <label>Product Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    {errors.quantity && <span className="error">{errors.quantity}</span>}
                </div>

                <div className='update_box'>
                    <label>Product Discount:</label>
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                    {errors.discount && <span className="error">{errors.discount}</span>}
                </div>

                <div className='update_box'>
                    <label>Product Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    {errors.description && <span className="error">{errors.description}</span>}
                </div>

                <div className='update_box'>
                    <label>Product Image:</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    {errors.file && <span className="error">{errors.file}</span>}
                </div>

                <button type="submit" className='update_but'>Update Laptop</button>
            </div>
        </form>
    );
}

export default UpdateLaptopForm;
