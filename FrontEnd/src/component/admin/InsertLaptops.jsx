import React, { useState } from 'react';
import axios from 'axios';
import "./InsertLaptops.css"
const InsertLaptops = () => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [quantity, setQuantity] = useState('');
    const [file, setFile] = useState(null);
    const [discount, setDiscount] = useState('');
    const [desc, setDesc] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form inputs
        const validationErrors = {};
        if (!name) validationErrors.name = 'Product Name is required';
        if (!cost || cost <= 0) validationErrors.cost = 'Valid Product Cost is required';
        if (!quantity || quantity <= 0) validationErrors.quantity = 'Valid Product Quantity is required';
        if (!file) validationErrors.file = 'Product Image is required';
        if (!discount || discount < 0) validationErrors.discount = 'Valid Product Discount is required';
        if (!desc) validationErrors.desc = 'Product Description is required';

        setErrors(validationErrors);

        // Stop if there are validation errors
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('cost', cost);
        formData.append('file', file);
        formData.append('quantity', quantity);
        formData.append('discount', discount);
        formData.append('description', desc);

        try {
            const response = await axios.post('http://localhost:9090/admin/upload/laptops', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log(response);
            alert('Laptop uploaded successfully!');
        } catch (error) {
            console.error(error);
            alert('Error uploading laptop.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="upload_main">
                <h4>LAPTOPS FORM</h4>
                <div className='upload_box'>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className='upload_box'>
                    <label>Product Cost:</label>
                    <input
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                    {errors.cost && <span className="error">{errors.cost}</span>}
                </div>
                <div className='upload_box'>
                    <label>Product Qty:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    {errors.quantity && <span className="error">{errors.quantity}</span>}
                </div>
                <div className='upload_box'>
                    <label>Product Discount:</label>
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                    {errors.discount && <span className="error">{errors.discount}</span>}
                </div>
                <div className='upload_box'>
                    <label>Product Description:</label>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                    {errors.desc && <span className="error">{errors.desc}</span>}
                </div>
                <div className='upload_box'>
                    <label>Product Image:</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    {errors.file && <span className="error">{errors.file}</span>}
                </div>
                <button type="submit" className='upload_but'>UPLOAD</button>
            </div>
        </form>
    );
}

export default InsertLaptops;
