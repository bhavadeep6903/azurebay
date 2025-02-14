import React from 'react'
import UserNavbar from "./UserNavbar"
import UserDashAir from "./UserDashAir"
import "./UserLaptops.css"
const UserAirpods = () => {
  
 
  
  return (
    <>
     <UserNavbar></UserNavbar>
     <div className="App1">
       <header className="App-header2">
         <div className="gradient-background1">
           <h1 className="store-text1">
          <span className="store-highlight1">Shop Airpod.</span>
               </h1> 
               
              <div className="help-section1">
                 <div className="help-item1"> 
                  
                   <p><h6>Need shopping help?</h6><a href="https://contactretail.apple.com/Help" className="help-link"><h6>Ask a Specialist</h6></a></p>
                    </div>
                     <div className="help-item1"> 
                     
                       <p><h6>Visit an Apple Store</h6> <a href="#" className="help-link1"><h6>Find one near you</h6></a></p> 
                    </div> 
                </div> 
                </div> 
        </header>
    </div>
    <UserDashAir></UserDashAir>
   
    
      
    
    </>
    
  )
}

export default UserAirpods