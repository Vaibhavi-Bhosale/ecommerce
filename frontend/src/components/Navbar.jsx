import { NavLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "../context/useAuth";
import useTheme from "../context/useTheme";
import Search from "./search";
import useCart from "../context/useCart";

function Navbar() {
  // Auth + ui context.
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { count } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Shared nav item style for consistency.
  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium rounded-full transition ${
      isActive
        ? "bg-[color:var(--surface-2)] text-[color:var(--text)]"
        : "text-[color:var(--text-muted)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text)]"
    }`;

  return (
    <header className="neo-surface sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            className="shrink-0 text-lg sm:text-xl font-black tracking-tight text-[color:var(--text)]"
          >
            ShopWave
          </NavLink>

          <div className="flex-1 min-w-0">
            <Search />
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="sm:hidden rounded-full px-3 py-2 text-sm font-semibold neo-card text-[color:var(--text)]"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        <div className={`${isMenuOpen ? "flex" : "hidden"} sm:flex flex-wrap items-center gap-2`}>
          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Signup
              </NavLink>
            </>
          ) : (
                <>
                     {
                        !isAdmin ? (
                                    <> 
                                       <NavLink to="/cart" className={linkClass}>
                                              Cart
                                       </NavLink>
                                       <NavLink to="/orders/my" className={linkClass}>
                                              My Orders
                                       </NavLink>
                                    </>
                                  )
               
                                  :(
                                     <>
                                        <NavLink to="/" className={linkClass}>
                                          All Products
                                        </NavLink>
                                        <NavLink to="/admin/orders" className={linkClass}>
                                          Customer Orders
                                        </NavLink>
                                        <NavLink to="/admin/products" className={linkClass}>
                                          Manage Products
                                        </NavLink>
                                        <NavLink to="/admin/products/add" className={linkClass}>
                                          Add Product
                                        </NavLink>
                                      </>           
                                   )

                                   

                       }
                  </>)  }

           

          <div className="ml-auto flex items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={logout}
                className="rounded-full px-4 py-2 text-sm font-semibold bg-[color:var(--primary)] text-[color:var(--bg)] hover:opacity-90"
              >
                Logout
              </button>
            )}

            <NavLink to="/cart" className={linkClass} title="Cart">
              🛒 <span className="font-semibold">{count}</span>
            </NavLink>

            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              className="rounded-full px-4 py-2 text-sm font-semibold neo-card text-[color:var(--text)]"
            >
              {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
