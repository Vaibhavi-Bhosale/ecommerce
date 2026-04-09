import { Link, NavLink } from "react-router-dom";
import useAuth from "../context/useAuth";
import { useState } from "react";
// import useCart from '../context/useCart'
import  useTheme  from "../context/useTheme.js";

import CartCount from "./CartCount";
export default function Navbar() {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

   const { theme, setTheme } = useTheme();

 
  const linkBaseClasses =
    "px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md";

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          ShopEase
        </Link>
      <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
        

        <CartCount></CartCount>


        {/* <div><span>{useCart.itemCartCount ?? 7}</span></div> */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            )}
          </svg>
        </button>

        <div className="hidden md:flex md:items-center md:space-x-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBaseClasses} ${isActive ? "bg-gray-100" : ""}`
            }
          >
            Products
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/orders/my"
              className={({ isActive }) =>
                `${linkBaseClasses} ${isActive ? "bg-gray-100" : ""}`
              }
            >
              My Orders
            </NavLink>
          )}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${linkBaseClasses} ${isActive ? "bg-gray-100" : ""}`
            }
          >
            Cart
          </NavLink>

          {isAdmin && (
            <>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `${linkBaseClasses} ${isActive ? "bg-gray-100" : ""}`
                }
              >
                Admin Products
              </NavLink>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `${linkBaseClasses} ${isActive ? "bg-gray-100" : ""}`
                }
              >
                Admin Orders
              </NavLink>
            </>
          )}

          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${linkBaseClasses} ${isActive ? "bg-gray-100" : ""}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${linkBaseClasses} ${isActive ? "bg-gray-100" : ""}`
                }
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              type="button"
              onClick={logout}
              className="ml-2 px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${linkBaseClasses} block ${isActive ? "bg-gray-100" : ""}`
              }
            >
              Products
            </NavLink>

            {isLoggedIn && (
              <NavLink
                to="/orders/my"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkBaseClasses} block ${
                    isActive ? "bg-gray-100" : ""
                  }`
                }
              >
                My Orders
              </NavLink>
            )}

            <NavLink
              to="/cart"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${linkBaseClasses} block ${isActive ? "bg-gray-100" : ""}`
              }
            >
              Cart
            </NavLink>

            {isAdmin && (
              <>
                <NavLink
                  to="/admin/products"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${linkBaseClasses} block ${
                      isActive ? "bg-gray-100" : ""
                    }`
                  }
                >
                  Admin Products
                </NavLink>
                <NavLink
                  to="/admin/orders"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${linkBaseClasses} block ${
                      isActive ? "bg-gray-100" : ""
                    }`
                  }
                >
                  Admin Orders
                </NavLink>
              </>
            )}

            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${linkBaseClasses} block ${
                      isActive ? "bg-gray-100" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${linkBaseClasses} block ${
                      isActive ? "bg-gray-100" : ""
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
