import React from 'react'
import UserNavbar from "./UserNavbar"
import UserDashWatch from "./UserDashWatch"
import "./UserLaptops.css"
const UserWatches = () => {
  const f6=()=>{
      
  }
  const f7=()=>{
    
  }
  const f8=()=>{
      
  }
  
 
  
  return (
    <>
     <UserNavbar></UserNavbar>
     <div className="App1">
       <header className="App-header2">
         <div className="gradient-background1">
           <h1 className="store-text1">
          <span className="store-highlight1">Shop Watches.</span>
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

        <div className="b3">
    <div className="b2">
    <a href="#section1" className="y1">All Models</a>
    <a href="#section2" className="y1">Ways to Save</a>
    <a href="#section3" className="y1">Shopping Guides</a>
    
   </div>
    </div>

    </div>
   
    <div id="section1-item">
      <UserDashWatch></UserDashWatch>
    </div>
    <div id="section2">
    <header className="App-header1">
      <div className="gradient-background1">
       <h1 className="store-text1">
         <span className="store-highlight1">Ways to Save.</span>
         Right here at Apple. </h1> 
      </div>
    </header>
    <div className="img2">
      {/* <button onClick={f6} className="button1"> */}
       <div class="container" onClick={f6}>
           <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-card-40-compare-202409_GEO_IN?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=1725114884479"width={450} height={500}class="image1"></img>
           <div class="text"><h6>COMPARE ALL MODELS
           Which Apple Watch is right for you?</h6></div>
           </div>
       {/* </button> */}
       {/* <button onClick={f7} className="button1"> */}
            <div class="container" onClick={f7}>
              <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-card-40-family-setup-202409_GEO_IN?wid=800&hei=1000&fmt=png-alpha&.v=1725578389364" width={450} height={500} class="image1"></img>
              <div class="text">
              <h6>APPLE WATCH FOR YOUR KIDS
              Independence for them. Peace of mind for you. Footnote </h6></div>
            </div>

      {/* </button> */}
       </div>
      </div>
      <div id="section3">
    <header className="App-header1">
      <div className="gradient-background1">
       <h1 className="store-text1">
         <span className="store-highlight1">Shopping guides.</span>
         Can’t decide? Start here. </h1> 
      </div>
    </header>
    <div className="img2">
    {/* <button onClick={f8} className="button1"> */}
    <div class="container" onClick={f8}>
      <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-card-50-acmi-202409?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1724423176123"width={450}height={500}class="image1"></img>
      <div class="text"><h6>Get up to ₹6000.00 instant cashback,§§ plus No Cost EMI§
      Offer valid on American Express, Axis Bank and ICICI Bank cards. Plus up to 12 months of No Cost EMI.</h6></div>
      </div>
      {/* </button> */}
      {/* <button onClick={f9} className="button1"> */}
        {/* <div class="container" onClick={f9}>
          <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mac-card-50-why-mac-202410_GEO_EMEA?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1731344873535"width={450}height={500}class="image1"></img>
          <div class="text"><h6>Why Mac</h6>
            <h6>Discover what Mac can do.</h6>
          </div> */}
        
      {/* </button> */}
      </div>
    </div>
    
    </>
    
  )
}

export default UserWatches