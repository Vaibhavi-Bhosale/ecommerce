import { Link, NavLink } from "react-router-dom";
import useAuth from "../context/useAuth";
import { useState } from "react";
// import useCart from '../context/useCart'
import  useTheme  from "../context/useTheme.js";


import CartCount from "./CartCount";
import Search from "./search.jsx";
export default function Navbar() {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

   const { theme, setTheme } = useTheme();

 
  const linkBaseClasses =
    "px-3 py-2 text-sm font-medium rounded-full transition-colors text-[color:var(--text-muted)] hover:text-[color:var(--text)] hover:bg-[color:color-mix(in_srgb,var(--surface-2)_45%,transparent)]";

  return (
    <nav className="neo-surface sticky top-0 z-40 border-b border-[color:color-mix(in_srgb,var(--text)_10%,transparent)]">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/" className="text-xl font-black tracking-tight text-[color:var(--text)]">
            ShopEase
          </Link>
          <CartCount className="md:hidden" />
        </div>

        <div className="hidden lg:block lg:flex-1 lg:max-w-xl">
          <Search />
        </div>

        <CartCount className="hidden md:inline-flex" />

      <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="hidden md:inline-flex px-4 py-2 rounded-full text-xs font-semibold neo-card"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>


        {/* <div><span>{useCart.itemCartCount ?? 7}</span></div> */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2.5 text-[color:var(--text)] hover:bg-[color:color-mix(in_srgb,var(--surface-2)_45%,transparent)] focus:outline-none md:hidden"
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
              `${linkBaseClasses} ${
                isActive ? "neo-card text-[color:var(--text)]" : ""
              }`
            }
          >
            Products
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/orders/my"
              className={({ isActive }) =>
                `${linkBaseClasses} ${
                  isActive ? "neo-card text-[color:var(--text)]" : ""
                }`
              }
            >
              My Orders
            </NavLink>
          )}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${linkBaseClasses} ${
                isActive ? "neo-card text-[color:var(--text)]" : ""
              }`
            }
          >
            Cart
          </NavLink>

          {isAdmin && (
            <>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `${linkBaseClasses} ${
                    isActive ? "neo-card text-[color:var(--text)]" : ""
                  }`
                }
              >
                Admin Products
              </NavLink>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `${linkBaseClasses} ${
                    isActive ? "neo-card text-[color:var(--text)]" : ""
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
                className={({ isActive }) =>
                  `${linkBaseClasses} ${
                    isActive ? "neo-card text-[color:var(--text)]" : ""
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${linkBaseClasses} ${
                    isActive ? "neo-card text-[color:var(--text)]" : ""
                  }`
                }
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              type="button"
              onClick={logout}
              className="ml-2 px-4 py-2 text-sm font-semibold text-white rounded-full bg-[color:var(--primary-strong)] hover:opacity-90"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div className="px-4 pb-3 lg:hidden">
        <Search />
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[color:color-mix(in_srgb,var(--text)_10%,transparent)]">
          <div className="px-4 py-3 space-y-1">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${linkBaseClasses} block ${
                  isActive ? "neo-card text-[color:var(--text)]" : ""
                }`
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
                    isActive ? "neo-card text-[color:var(--text)]" : ""
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
                `${linkBaseClasses} block ${
                  isActive ? "neo-card text-[color:var(--text)]" : ""
                }`
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
                      isActive ? "neo-card text-[color:var(--text)]" : ""
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
                      isActive ? "neo-card text-[color:var(--text)]" : ""
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
                      isActive ? "neo-card text-[color:var(--text)]" : ""
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
                      isActive ? "neo-card text-[color:var(--text)]" : ""
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
                className="w-full text-left px-3 py-2 text-sm font-semibold text-white rounded-xl bg-[color:var(--primary-strong)] hover:opacity-90"
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
