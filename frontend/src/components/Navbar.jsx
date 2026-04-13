import React from 'react'
import {NavLink} from "react-router-dom";
import useAuth from '../context/useAuth';
import useTheme from '../context/useTheme'

function Navbar() {

  const {isLoggedIn, isAdmin, logout} = useAuth()
  const { theme, setTheme } = useTheme();
  return (
    <div>
           <div className='flex items-center'>
                 <NavLink to="/">Home</NavLink>
            {
               !isLoggedIn ? 
              (
                (
                    <div>
                   
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register"> Signup</NavLink>
                    </div>
                )
              ) : (
                <div> 
                       <NavLink to="/cart">Cart</NavLink>
                       <NavLink to="/orders/my">My Orders</NavLink>

                </div>
              )

              
            }

            {
               isAdmin && 
               <div>
                   <NavLink to="/cart">Cart</NavLink>
                   <NavLink to="/orders/my">My Orders</NavLink>
                   <NavLink to="/admin/orders">Customer Orders</NavLink>
                   <NavLink to="/admin/products">Add Products</NavLink>
               </div>
            }


            <div>

              {
                 isLoggedIn && <button onClick={logout}>Logout</button>
              }

            </div>
                  

             <div>
                <button
                onClick={()=>{
                     setTheme(theme == "dark" ? "light" : "dark")
                }}>Change theme</button>
             </div>
                 
           </div>
    </div>
  )
}

export default Navbar
