import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./GuestNavbar.css";

const GuestNavbar = () => {
  const navigate = useNavigate();
  const ref1=useRef(null)
  
  const [laptop, setLaptop] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [watch, setWatch] = useState([]);
  const [ipad, setIpad] = useState([]);
  const [airpod, setAirpod] = useState([]);
  const [home, setHome] = useState([]);
  const [search,setSearch]=useState([])

  const store = () => navigate("/");
  const laptops = () => navigate("/guestlaptops");
  const mobiles = () => navigate("/guestmobiles");
  const ipads = () => navigate("/guestipads");
  const airpods = () => navigate("/guestairpods");
  const watches = () => navigate("/guestwatches");
  const homeapp = () => navigate("/guesthomeapp");
  const login = () => navigate("/login");
  const Regist= () => navigate("/register")


  const display_singleitem = (element) => {
    navigate(`/guestsingle`, { state: { element } });
  };


  const fetchData = async (url, setState, abortSignal) => {
    try {
      const res = await axios.get(url, { signal: abortSignal });
      setState(res.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.error(error);
      }
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    const controller = new AbortController();

    fetchData("http://localhost:9090/guest/laptops", setLaptop, controller.signal);
    fetchData("http://localhost:9090/guest/mobiles", setMobile, controller.signal);
    fetchData("http://localhost:9090/guest/watches", setWatch, controller.signal);
    fetchData("http://localhost:9090/guest/ipads", setIpad, controller.signal);
    fetchData("http://localhost:9090/guest/airpods", setAirpod, controller.signal);
    fetchData("http://localhost:9090/guest/homeapp", setHome, controller.signal);

    // Cleanup function to cancel API requests
    return () => {
      controller.abort();
    };
  }, []);

   const func=async(ref1)=>{
    const ref=ref1.current.value.trim();
        if(!ref){
            setSearch([]);
            return
        }
        
       const res=await axios.get(`http://localhost:9090/search?keyword=${ref}`)
       console.log(res.data)
       setSearch(res.data)
   }

     return(
        <>
        
        <div className="nav1">
              
            <div className="nav1-child">
                 <div class="hi">
               <button onClick={store} style={{marginRight:50}}className="nav2">Store</button>
               </div>

<nav> 
    <ul> 
        <li class="dropdown">
            <a onClick={laptops} class="dropbtn" className="nav2" style={{marginRight:50}}>Laptop</a>
            <div class="dropdown-content"> 
                <div class="block1"> 
                    <h3 className="container-heading">Explore Laptop</h3>
                    {laptop.map((element, index) => ( 
                        <a key={index} onClick={()=>display_singleitem(element)}>{element.name}</a> 
                    )) }
                </div>
            </div>
        </li> 
    </ul> 
</nav>    

<nav> 
    <ul> 
        <li class="dropdown">
            <a onClick={mobiles} class="dropbtn" className="nav2" style={{marginRight:50}}>Mobiles</a>
            <div class="dropdown-content"> 
                <div class="block1"> 
                    <h3 className="container-heading">Explore Mobile</h3>
                    {mobile.map((element, index) => ( 
                        <a onClick={()=>display_singleitem(element)} key={index}>{element.name}</a> 
                    )) }
                </div>
            </div>
        </li> 
    </ul> 
</nav>
<nav> 
    <ul> 
        <li class="dropdown">
            <a onClick={ipads} class="dropbtn" className="nav2" style={{marginRight:50}}>Ipad</a>
            <div class="dropdown-content"> 
                <div class="block1"> 
                    <h3 className="container-heading">Explore Ipads</h3>
                    {ipad.map((element, index) => ( 
                        <a onClick={()=>display_singleitem(element)} key={index}>{element.name}</a> 
                    )) }
                </div>
            </div>
        </li> 
    </ul> 
</nav>
<nav> 
    <ul> 
        <li class="dropdown">
            <a onClick={airpods} class="dropbtn" className="nav2" style={{marginRight:50}}>Airpod</a>
            <div class="dropdown-content"> 
                <div class="block1"> 
                    <h3 className="container-heading">Explore Airpods</h3>
                    {airpod.map((element, index) => ( 
                        <a onClick={()=>display_singleitem(element)} key={index}>{element.name}</a> 
                    )) }
                </div>
            </div>
        </li> 
    </ul> 
</nav>
<nav> 
    <ul> 
        <li class="dropdown">
            <a onClick={watches} class="dropbtn" className="nav2" style={{marginRight:50}}>watches</a>
            <div class="dropdown-content"> 
                <div class="block1"> 
                    <h3 className="container-heading">Explore Watches</h3>
                    {watch.map((element, index) => ( 
                        <a onClick={()=>display_singleitem(element)} key={index}>{element.name}</a> 
                    )) }
                </div>
            </div>
        </li> 
    </ul> 
</nav>
<nav> 
    <ul> 
        <li class="dropdown">
            <a onClick={homeapp} class="dropbtn" className="nav2" style={{marginRight:50}}>HomeApp</a>
            <div class="dropdown-content"> 
                <div class="block1"> 
                    <h3 className="container-heading">Explore HomeApp</h3>
                    {home.map((element, index) => ( 
                        <a onClick={()=>display_singleitem(element)} key={index}>{element.name}</a> 
                    )) }
                </div>
            </div>
        </li> 
    </ul> 
</nav>    
        
<nav> 
    <ul> 
        <li class="dropdown">
            <a class="dropbtn" className="nav2" ><i class="fa-solid fa-magnifying-glass"></i></a>
            <div class="dropdown-content"> 
                <div class="block1"> 
                    <h3 className="container-heading">Explore Search</h3>
                    <input type="search" placeholder="Search Product" ref={ref1} onChange={()=>func(ref1)}/>
                    {
                        search.map((element,index)=>{
                           return(
                            <a onClick={()=>display_singleitem(element)} key={index}>{element.name}</a> 
                           )
                        })
                    }
                </div>
            </div>
        </li> 
    </ul> 
</nav>  
               
               <div class="hi">
               <button onClick={login} className="nav2">
               <i class="fa fa-shopping-bag"></i>
               </button>
               </div>

<nav> 
    <ul> 
        <li class="dropdown">
            <a  class="dropbtn" className="nav2" ><i class="fa-solid fa-user-gear"></i></a>
            <div class="dropdown-content"> 
                <div class="block1"> 
                    <h3 className="container-heading">Explore Account</h3>
                    <a onClick={login}>SignIn</a>
                    <a onClick={Regist}>Resister</a>
                </div>
            </div>
        </li> 
    </ul> 
</nav> 

            </div>
               

        </div>

            <div className="emi">
              <div className="p1">  Get up to ₹10000.00 instant cashback with eligible cards.§§ Plus up to 12 months of No Cost EMI.</div>
              </div>
        
        </>
     )

}
export default GuestNavbar