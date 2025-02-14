import React from 'react'
import UserNavbar from "./UserNavbar"
import UserDashIpad from "./UserDashIpad"
import "./UserLaptops.css"
const UserIpads = () => {
  const f6=()=>{
      
  }
  const f7=()=>{
    
  }
  
  const f9=()=>{
    
  }
 
  
  return (
    <>
     <UserNavbar></UserNavbar>
     <div className="App1">
       <header className="App-header2">
         <div className="gradient-background1">
           <h1 className="store-text1">
          <span className="store-highlight1">Shop iPads.</span>
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
      <UserDashIpad></UserDashIpad>
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
           <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-50-waystobuy-202409?wid=960&hei=1000&fmt=jpeg&qlt=90&.v=1725302297356"width={450} height={500}class="image1"></img>
           <div class="text"><h6>Special OfferGet up to ₹5000.00 <br/>instant cashback.§§
           Offer valid on American Express, Axis Bank and ICICI Bank cards on selected products. Plus up to 12 months of No Cost EMI.§</h6></div>
       </div>
       {/* </button> */}
       {/* <button onClick={f7} className="button1"> */}
            <div class="container" onClick={f7}>
              <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/store-ipad-card-40-education-202405_GEO_IN?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=1714087451348" width={450} height={500} class="image1"></img>
              <div class="text"><h6>Education</h6> 
              <h6>We offer special iPad pricing for students and educators.</h6></div>
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
    {/* <div class="container" onClick={f8}>
      <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mac-card-50-compare-models-202410?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1728342371872"width={450}height={500}class="image1"></img>
      <div class="text"><h6>Compare all Mobiles</h6>
      <h6>Which Mac is right for you?</h6></div>
      </div> */}
      {/* </button> */}
      {/* <button onClick={f9} className="button1"> */}
        <div class="container" onClick={f9}>
          <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-card-50-compare-202410?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1728493251970"width={450}height={500}class="image1"></img>
      <div class="text"><h6>Compare all iPads</h6>
      <h6>Which iPad is right for you?</h6></div>
        </div>
      {/* </button> */}
      </div>
    </div>
    
    </>
    
  )
}

export default UserIpads