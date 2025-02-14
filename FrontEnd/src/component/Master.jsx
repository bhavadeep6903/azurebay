import {BrowserRouter,Route,Routes} from "react-router-dom"
import React from 'react'
const UserDashboard=React.lazy(()=>import("./user/UserDashboard"))
//import UserDashboard from "./user/UserDashboard"
import AdminDashboard from "./admin/AdminDashboard"
import Error from "./global/Error"
import Login from "./global/Login"
import AdminLaptops from "./admin/AdminLaptops"
import AdminMobiles from "./admin/AdminMobiles"
import AdminWatches from "./admin/AdminWatches"
import AdminIpads from "./admin/AdminIpads"
import AdminAirpods from "./admin/AdminAirpods"
import AdminHomeapp from "./admin/AdminHomeapp"
import InsertLaptops from "./admin/InsertLaptops"
import UpdateLaptops from "./admin/UpdateLaptops"
import Register from "./global/Register"
import InsertMobiles from "./admin/InsertMobiles"
import UpdateMobiles from "./admin/UpdateMobiles"
import InsertIpads from "./admin/InsertIpads"
import UpdateIpads from "./admin/UpdateIpads"
import InsertWatches from "./admin/InsertWatches"
import UpdateWatches from "./admin/UpdateWatches"
import InsertAirpods from "./admin/InsertAiropds"
import UpdateAirpods from "./admin/UpdateAirpods"
import InsertHomeapp from "./admin/InsertHomeapp"
import UpdateHomeapp from "./admin/UpdateHomeapp"
const GuestDashboard=React.lazy(()=>import("./guest/Guestdashboard"))
//import GuestDashboard from "./guest/Guestdashboard"
import GuestLaptops from "./guest/GuestLaptops"
import GuestMobiles from "./guest/GuestMobiles"
import GuestWatches from "./guest/GuestWatches"
import GuestIpads from "./guest/GuestIpads"
import GuestAirpods from "./guest/GuestAirpods"
import GuestHomeapp from "./guest/GuestHomeapp"
import UserLaptops from "./user/UserLaptops"
import UserMobiles from "./user/UserMobiles"
import UserIpads from "./user/UserIpads"
import UserWatches from "./user/UserWatches"
import UserAirpods from "./user/UserAirpods"
import UserHomeapp from "./user/UserHomeapp"
import GuestSingle from "./guest/GuestSingle"
import UserSingle from "./user/UserSingle"
import CartInvoice from "./CartInvoice"
import { CartProvider } from "./CartContext"
import InsertLogin from "./admin/InsertLogin"
import UpdateLogin from "./admin/UpdateLogin"
import AdminLogin from "./admin/AdminLogin"
const Master = () => {
  return (
    <>
    <CartProvider>
    <BrowserRouter>
          <Routes>
            
           
            <Route path="/" element={<GuestDashboard></GuestDashboard>}></Route>
            <Route path="/guestlaptops" element={<GuestLaptops></GuestLaptops>}></Route>
            <Route path="/guestmobiles" element={<GuestMobiles></GuestMobiles>}></Route>
            <Route path="/guestwatches" element={<GuestWatches></GuestWatches>}></Route>
            <Route path="/guestipads" element={<GuestIpads></GuestIpads>}></Route>
            <Route path="/guestairpods" element={<GuestAirpods></GuestAirpods>}></Route>
            <Route path="/guesthomeapp" element={<GuestHomeapp></GuestHomeapp>}></Route>
            <Route path="/guestsingle" element={<GuestSingle></GuestSingle>}></Route>
            <Route path="/userdashboard/:data" element={<UserDashboard></UserDashboard>}></Route>
            <Route path="/userdashboard" element={<UserDashboard></UserDashboard>}></Route>


            <Route path="/userlaptops" element={<UserLaptops></UserLaptops>}></Route>
            <Route path="/usermobiles" element={<UserMobiles></UserMobiles>}></Route>
            <Route path="/useripads" element={<UserIpads></UserIpads>}></Route>
            <Route path="/userwatches" element={<UserWatches></UserWatches>}></Route>
            <Route path="/userairpods" element={<UserAirpods></UserAirpods>}></Route>
            <Route path="/userhomeapp" element={<UserHomeapp></UserHomeapp>}></Route>
            <Route path="/cart" element={<CartInvoice></CartInvoice>}></Route>

            <Route path="/usersingle" element={<UserSingle></UserSingle>}></Route>


            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/sign" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>

            <Route path="/admindashboard" element={<AdminDashboard></AdminDashboard>}>

                    <Route index element={<AdminLaptops></AdminLaptops>}></Route>
            
                   <Route path="admindashboard/adminlaptops" element={<AdminLaptops></AdminLaptops>}></Route>
                   <Route path="admindashboard/adminmobiles" element={<AdminMobiles></AdminMobiles>}></Route>
                   <Route path="admindashboard/adminwatches" element={<AdminWatches></AdminWatches>}></Route>
                   <Route path="admindashboard/adminipads" element={<AdminIpads></AdminIpads>}></Route>
                   <Route path="admindashboard/adminairpods" element={<AdminAirpods></AdminAirpods>}></Route>
                   <Route path="admindashboard/adminhomeapp" element={<AdminHomeapp></AdminHomeapp>}></Route>
                   <Route path="admindashboard/adminlogin" element={<AdminLogin></AdminLogin>}></Route>
            
            </Route>

            <Route path="/error" element={<Error></Error>}></Route>

            <Route path="/insertlaptops" element={<InsertLaptops></InsertLaptops>}></Route>
            <Route path="/updatelaptops/:pid/:pname/:pcost/:pquantity/:pdescription/:pdiscount" element={<UpdateLaptops></UpdateLaptops>}></Route>

            <Route path="/insertmobiles" element={<InsertMobiles></InsertMobiles>}></Route>
            <Route path="/updatemobiles/:pid/:pname/:pcost/:pquantity/:pdescription/:pdiscount" element={<UpdateMobiles></UpdateMobiles>}></Route>

            <Route path="/insertipads" element={<InsertIpads></InsertIpads>}></Route>
            <Route path="/updateipads/:pid/:pname/:pcost/:pquantity/:pdescription/:pdiscount" element={<UpdateIpads></UpdateIpads>}></Route>

            <Route path="/insertwatches" element={<InsertWatches></InsertWatches>}></Route>
            <Route path="/updatewatches/:pid/:pname/:pcost/:pquantity/:pdescription/:pdiscount" element={<UpdateWatches></UpdateWatches>}></Route>

            <Route path="/insertairpods" element={<InsertAirpods></InsertAirpods>}></Route>
            <Route path="/updateairpods/:pid/:pname/:pcost/:pquantity/:pdescription/:pdiscount" element={<UpdateAirpods></UpdateAirpods>}></Route>

            <Route path="/inserthomeapp" element={<InsertHomeapp></InsertHomeapp>}></Route>
            <Route path="/updatehomeapp/:pid/:pname/:pcost/:pquantity/:pdescription/:pdiscount" element={<UpdateHomeapp></UpdateHomeapp>}></Route>
          
            <Route path="/insertlogin" element={<InsertLogin></InsertLogin>}></Route>
            <Route path="/updatelogin/:pid/:pusername/:ppassword/:prole/:pemail/:pnumber" element={<UpdateLogin></UpdateLogin>}></Route>

          </Routes>
    </BrowserRouter>
    </CartProvider>
    </>
  )
}

export default Master