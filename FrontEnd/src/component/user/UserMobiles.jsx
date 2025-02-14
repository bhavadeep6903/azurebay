import React from 'react'
import UserNavbar from "./UserNavbar"
import UserDashMob from "./UserDashMob"
import "./UserLaptops.css"
const UserMobiles = () => {
  const f6=()=>{
      
  }
  const f7=()=>{
    
  }
  const f8=()=>{
      
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
          <span className="store-highlight1">Shop Mobiles.</span>
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
      <UserDashMob></UserDashMob>
    </div>
    <div id="section2">
    <header className="App-header1">
      <div className="gradient-background1">
       <h6 className="store-text1">
         <span className="store-highlight1">Ways to Save.</span>
         Right here at Apple. </h6> 
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
              <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-50-tradein-202409?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1723847874415" width={450} height={500} class="image1"></img>
              <div class="text"><h6>Apple Trade in</h6> 
              <h6>Get up to ₹67500.00 in credit towards iPhone 16 or iPhone 16 Pro when you trade in an eligible smartphone.*</h6></div>
            </div>

      {/* </button> */}
       </div>
      </div>
      <div id="section3">
    <header className="App-header1">
      <div className="gradient-background1">
       <h6 className="store-text1">
         <span className="store-highlight1">Shopping guides.</span>
         Can’t decide? Start here. </h6> 
      </div>
    </header>
    <div className="img2">
    {/* <button onClick={f8} className="button1"> */}
    <div class="container" onClick={f8}>
    <div class="container">
      <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-50-compare-202409?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1723564949528"width={450}height={500}class="image1"></img>
      <div class="text"><h6>Compare all Mobiles</h6>
      <h6>Which iPhone is right for you?</h6></div>
      </div>
      </div>
      
      {/* </button> */}
      {/* <button onClick={f9} className="button1"> */}
        <div class="container" onClick={f9}>
        <div class="container">
          <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-50-whyswitch-202409_GEO_IN?wid=960&hei=1000&fmt=p-jpg&qlt=95&.v=1724764861472"width={450}height={500}class="image1"></img>
          <div class="text"><h6>Swith to iphone</h6>
            <h6>Switching from Android to iPhone is super simple.</h6>
          </div>
        </div>
      {/* </button> */}
      </div>
   </div>
   </div>
   
    </>
    
  )
}

export default UserMobiles