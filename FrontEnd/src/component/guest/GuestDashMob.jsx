import React, { useEffect, useState } from 'react';
import './GuestDashLap.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GuestDashLap = () => {
    const [laptop, setLaptop] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate=useNavigate()

    // Fetch laptops from the API
    const fetchLaptops = async () => {
        try {
            const res = await axios.get('http://localhost:9090/guest/mobiles');
            const { data } = res;
            setLaptop(data);
        } catch (error) {
            console.error('Error fetching mobiles:', error);
        }
    };

    useEffect(() => {
        fetchLaptops();
    }, []);

    const handleLeftClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleRightClick = () => {
        if (currentIndex < laptop.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const display_singleitem=(element)=>{
        navigate(`/guestsingle`,{state:{element}})
    }

    return (
       <div className="carousel-main">
        <h3 className="lap-text"><span className="store-highlight">The latest.</span> Let them unwrap wonders</h3>
         <div className="carousel-container">
    <div className="nav-button" id="left-button" onClick={handleLeftClick}>
        <span className="arrow">&lt;</span>
    </div>
    <div className="carousel">
        {laptop.map((element, index) => (
            <div
                onClick={()=>display_singleitem(element)}
                id="child"
                key={index}
                className={index === currentIndex ? "active" : ""}
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    width: '300px', 
                    height: '90%',
                }}
                
            >
                <div
                    className="image"
                    style={{
                        backgroundImage: `url(${element.image})`,
                        backgroundSize: 'contain',  // This will ensure the image covers the container
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: '90%',  // Adjust as needed
                        backgroundColor: 'white',
                        margin: '10px',
                    }}
                    
                ></div>
                <div className="details" style={{ padding: '10px' }}>
                    <h3 style={{ margin: '5px 0' ,color:'black', fontFamily:'Helvetica, Helvetica, Arial, sans-serif'}}>{element.name}</h3>
                    <p style={{ margin: '5px 0', fontSize: '16px' ,color:'black'}}>Price: ${element.cost}</p>
                </div>
            </div>
        ))}
    </div>
    <div className="nav-button" id="right-button" onClick={handleRightClick}>
        <span className="arrow">&gt;</span>
    </div>
</div>
       </div>

    );
};

export default GuestDashLap;
