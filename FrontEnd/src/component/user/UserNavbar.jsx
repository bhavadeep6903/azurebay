import React from "react";
import { useNavigate} from "react-router-dom"
import { useState,useEffect,useRef} from "react";
import axios from "axios"
import "./UserNavbar.css"
const UserNavbar=({data1})=>{
    console.log(data1)
    const navigate=useNavigate()
    const [user,setUser]=useState([])

    const fetchuser= async()=>{
        const res= await axios.get(`http://localhost:9090/user/details/${data1}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem(`token`)}` },
            // signal: controller.signal,
        });
        const {data}=res
        const {username}=data
        console.log(data)
        setUser(username)
    }

    const ref1=useRef(null)
    
    const store=()=>navigate("/userdashboard")
    const laptops=()=>navigate("/userlaptops")
    const mobiles=()=>navigate("/usermobiles")
    const ipads=()=>navigate("/useripads")
    const airpods=()=>navigate("/userairpods")
    const watches=()=>navigate("/userwatches")
    const homeapp=()=>navigate("/userhomeapp")
    const cart=()=>navigate("/cart")

    const [laptop,setLaptop]=useState([])
    const [mobile,setMobile]=useState([])
    const [watch,setWatch]=useState([])
    const [ipad,setIpad]=useState([])
    const [airpod,setAirpod]=useState([])
    const [home,setHome]=useState([])
    const [search,setSearch]=useState([])

    const fetchData = async (url, setter, controller) => {
        try {
            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${localStorage.getItem(`token`)}` },
                signal: controller.signal,
            });
            setter(res.data);
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log("Request canceled:", err.message);
            } else {
                console.error("Error fetching data:", err);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data
                await fetchuser();
    
                // Controller for aborting other data fetch
                const controller = new AbortController();
                await Promise.all([
                    fetchData("http://localhost:9090/user/laptops", setLaptop, controller),
                    fetchData("http://localhost:9090/user/mobiles", setMobile, controller),
                    fetchData("http://localhost:9090/user/watches", setWatch, controller),
                    fetchData("http://localhost:9090/user/airpods", setAirpod, controller),
                    fetchData("http://localhost:9090/user/ipads", setIpad, controller),
                    fetchData("http://localhost:9090/user/homeapp", setHome, controller),
                ]);
                return () => controller.abort();
            } catch (error) {
                console.error("Error in useEffect:", error);
            }
        };
    
        fetchData();
    }, [localStorage.getItem("token"), data1]); 
    

    const display_singleitem=(element)=>{
        navigate(`/usersingle`,{state:{element}})
    }

    const logout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            window.localStorage.removeItem("token");
            navigate("/");
        }
    };

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
               <button onClick={cart} className="nav2">
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
                    <a>UserName: {user}</a>
                    {/* <a>UserEmail{user.email}</a>
                    <a>UserNumber{user.number}</a> */}
                    <a onClick={logout}>Logout</a>
                    
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
export default UserNavbar