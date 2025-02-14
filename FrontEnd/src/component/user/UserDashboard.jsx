import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./UserDashboard.css"
import UserNavbar from './UserNavbar'
import UserDashLap from './UserDashLap'
import UserDashMob from './UserDashMob'
import UserDashWatch from './UserDashWatch'
import UserDashAir from './UserDashAir'
import UserDashIpad from './UserDashIpad'
import UserDashHome from './UserDashHome'
import Footer from "../global/Footer"

 const UserDashboard = () => {
  const {data}=useParams()
  console.log(data)
  useEffect(()=>{
    
  })
  const navigate=useNavigate();
         const fig1=()=>{
               navigate("/userlaptops")
         }

         const fig2=()=>{
          navigate("/usermobiles")
    }


    const fig3=()=>{
      navigate("/useripads")
}

const fig4=()=>{
  navigate("/userairpods")
}


const fig5=()=>{
  navigate("/userwatches")
}


const fig6=()=>{
  navigate("/userhomeapp")
}

  return (
    <>
    <UserNavbar data1={data}></UserNavbar>
    
    <div className="App">
        <header className="App-header">
         <div className="gradient-background">
           <div className="store-text">
             <span className="store-highlight">Store.</span>
              Gift magic this New Year. </div> 
             
               </div> 
               <div className="help-section">
                 <div className="help-item"> 
                  
                   <p>Need shopping help? <br /><a href="https://contactretail.apple.com/Help" className="help-link">Ask a Specialist</a></p>
                    </div>
                     <div className="help-item"> 
                     
                       <p>Visit an Apple Store <br /><a href="#" className="help-link">Find one near you</a></p> 
                       </div> 
                       </div> 
         </header>
     </div>


    <div className="photo">
      <button onClick={fig1} className='b1'>

      <figure >
  <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-mac-nav-202410?wid=400&hei=260&fmt=png-alpha&.v=1728342368663" alt="mac error" width={100}></img>
  <figcaption className="underline">Mac</figcaption>
</figure>
</button>

  <button onClick={fig2} className='b1'>
  <figure>
    <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-iphone-nav-202409_GEO_EMEA?wid=400&hei=260&fmt=png-alpha&.v=1723857138464" width={100}></img>
    <figcaption className="underline">Mobiles</figcaption>
   </figure>
  </button>

  <button onClick={fig3} className='b1'>
  <figure >
    <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-ipad-nav-202405?wid=400&hei=260&fmt=png-alpha&.v=1714168620875" width={100}></img>
    <figcaption className="underline">IPads</figcaption>
   </figure>
  </button>


  <button onClick={fig4} className='b1'>
  <figure>
    <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-airpods-nav-202409?wid=400&hei=260&fmt=png-alpha&.v=1722974349822" width={100}></img>
    <figcaption className="underline">Airpods</figcaption>
   </figure>
  </button>


  <button onClick={fig5} className='b1'>
  <figure>
    <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-watch-nav-202409?wid=400&hei=260&fmt=png-alpha&.v=1724165625838" width={100}></img>
    <figcaption className="underline">Watches</figcaption>
   </figure>
  </button>


  <button onClick={fig6} className='b1'>
  <figure>
    <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-card-13-appletv-nav-202210?wid=400&hei=260&fmt=png-alpha&.v=1664628458484" width={100}></img>
    <figcaption className="underline">Accessories</figcaption>
   </figure>
  </button>

    </div>
    <UserDashIpad></UserDashIpad>
    <UserDashMob></UserDashMob>
    <UserDashWatch></UserDashWatch>
    <UserDashAir></UserDashAir>
    <UserDashLap></UserDashLap>
    <UserDashHome></UserDashHome>
    <Footer></Footer>

    </>
  )
}

export default UserDashboard