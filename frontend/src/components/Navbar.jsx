import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAuth from "../context/useAuth";
import useTheme from "../context/useTheme";
import Search from "./Search";
import useCart from "../context/useCart";


function IconCart({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6h15l-1.5 9h-12L6 6Zm0 0L5 3H2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.35" fill="currentColor" />
      <circle cx="18" cy="20" r="1.35" fill="currentColor" />
    </svg>
  );
}

function IconUser({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function IconChevronDown({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSun({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMoon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMenu({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconClose({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Navbar() {
  const { isLoggedIn, isAdmin, logout, user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { count, fetchCount } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  const cartCount = typeof count === "number" ? count : 0;

    const handleLogout = () => {

    logout();
     

    fetchCount(); // Refresh cart count after logout
  }


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!profileOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setProfileOpen(false);
    };
    const onPointer = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [profileOpen]);

  const linkClass = ({ isActive }) =>
    `rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)] ${
      isActive
        ? "bg-[color:var(--primary-soft)] text-[color:var(--primary)]"
        : "text-[color:var(--text-muted)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--text)]"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
      isActive
        ? "bg-[color:var(--primary-soft)] text-[color:var(--primary)]"
        : "text-[color:var(--text)] hover:bg-[color:var(--surface-2)]"
    }`;

  const displayName =
    user?.name?.trim() ||
    user?.username?.trim() ||
    user?.email?.split("@")[0] ||
    "Account";

  const initials = (displayName.slice(0, 1) || "?").toUpperCase();

  const mainNav = !isLoggedIn ? (
    <>
      <NavLink to="/login" className={linkClass}>
        Sign in
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          `rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)] ${
            isActive
              ? "bg-[color:var(--primary)] text-[color:var(--primary-foreground)] shadow-sm"
              : "bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary-hover)] shadow-sm"
          }`
        }
      >
        Create account
      </NavLink>
    </>
  ) : !isAdmin ? (
    <>
      <NavLink to="/" end className={linkClass}>
        Shop
      </NavLink>
      <NavLink to="/orders/my" className={linkClass}>
        My orders
      </NavLink>
    </>
  ) : (
    <>
      <NavLink to="/" end className={linkClass}>
        Storefront
      </NavLink>
      <NavLink to="/admin/orders" className={linkClass}>
        Orders
      </NavLink>
      <NavLink to="/admin/products" className={linkClass}>
        Products
      </NavLink>
      <NavLink to="/admin/products/add" className={linkClass}>
        Add product
      </NavLink>
    </>
  );

  const mobileNav = !isLoggedIn ? (
    <>
      <NavLink to="/login" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
        Sign in
      </NavLink>
      <NavLink to="/register" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
        Create account
      </NavLink>
    </>
  ) : !isAdmin ? (
    <>
      <NavLink to="/" end className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
        Shop
      </NavLink>
      <NavLink to="/orders/my" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
        My orders
      </NavLink>
    </>
  ) : (
    <>
      <NavLink to="/" end className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
        Storefront
      </NavLink>
      <NavLink to="/admin/orders" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
        Customer orders
      </NavLink>
      <NavLink to="/admin/products" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
        Manage products
      </NavLink>
      <NavLink to="/admin/products/add" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
        Add product
      </NavLink>
    </>
  );

 return (
  <header
    className={`sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--surface)]/80 backdrop-blur-xl transition-all duration-300 ${
      scrolled ? "shadow-lg shadow-black/5" : ""
    }`}
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden py-3 space-y-3">

        {/* Top row */}
        <div className="flex items-center justify-between gap-3">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--primary)] text-white font-bold">
              S
            </div>
            <span className="font-bold text-lg">
              Shop<span className="text-[color:var(--primary)]">Wave</span>
            </span>
          </NavLink>

          {/* Right icons */}
          <div className="flex items-center gap-2">

            {!isAdmin && (
              <NavLink
                to="/cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-[color:var(--surface-2)]"
              >
                <IconCart />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[color:var(--primary)] text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-[color:var(--surface-2)]"
            >
              {isMenuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>

        {/* Search row */}
        <Search />

        {/* Drawer */}
        {isMenuOpen && (
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-3 space-y-2 shadow-xl">

            {mobileNav}

            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="w-full rounded-xl px-4 py-3 text-left hover:bg-[color:var(--surface-2)]"
            >
              {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>

            {isLoggedIn && (
              <>
                <div className="border-t border-[color:var(--border)] pt-2 mt-2">
                  <p className="px-4 text-sm font-semibold">
                    {displayName}
                  </p>

                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full rounded-xl px-4 py-3 text-left text-[color:var(--primary)] hover:bg-[color:var(--primary-soft)]"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:flex h-20 items-center gap-6">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--primary)] text-white font-bold">
            S
          </div>
          <span className="font-bold text-xl">
            Shop<span className="text-[color:var(--primary)]">Wave</span>
          </span>
        </NavLink>

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <Search />
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-2">
          {mainNav}
        </nav>

        {/* Cart */}
        {!isAdmin && (
          <NavLink
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-[color:var(--surface-2)]"
          >
            <IconCart />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[color:var(--primary)] text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>
        )}

        {/* Theme */}
        <button
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-[color:var(--surface-2)]"
        >
          {theme === "dark" ? <IconSun /> : <IconMoon />}
        </button>

        {/* Profile */}
       {isLoggedIn && (
  <div className="relative" ref={profileRef}>
    {/* Trigger */}
    <button
  onClick={() => setProfileOpen(!profileOpen)}
  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm font-medium transition-all duration-200 ${
    profileOpen
      ? "border-[color:var(--primary)] bg-[color:var(--primary-soft)] text-[color:var(--primary)]"
      : "border-[color:var(--border)] text-[color:var(--text)] hover:border-[color:var(--primary)] hover:bg-[color:var(--surface-2)]"
  }`}
>
  <span className="whitespace-nowrap">
    {displayName}
  </span>

  <IconChevronDown
    className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
      profileOpen
        ? "rotate-180 text-[color:var(--primary)]"
        : "text-[color:var(--text-muted)]"
    }`}
  />
</button>

    {/* Dropdown */}
    <div
      className={`absolute right-0 top-[calc(100%+10px)] w-64 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-2 shadow-2xl transition-all duration-200 ${
        profileOpen
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-2 opacity-0"
      }`}
    >
      {/* User Info */}
      <div className="rounded-xl px-3 py-3">
        <p className="truncate text-sm font-semibold">
          {displayName}
        </p>

        {user?.email && (
          <p className="truncate text-xs text-[color:var(--text-muted)] mt-1">
            {user.email}
          </p>
        )}
      </div>

      <div className="my-2 border-t border-[color:var(--border)]" />

      {/* Links */}
      {!isAdmin ? (
        <>
          <NavLink
            to="/orders/my"
            onClick={() => setProfileOpen(false)}
            className="block rounded-xl px-3 py-2 text-sm hover:bg-[color:var(--surface-2)]"
          >
            My Orders
          </NavLink>

          <NavLink
            to="/cart"
            onClick={() => setProfileOpen(false)}
            className="block rounded-xl px-3 py-2 text-sm hover:bg-[color:var(--surface-2)]"
          >
            Cart
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/admin/products"
            onClick={() => setProfileOpen(false)}
            className="block rounded-xl px-3 py-2 text-sm hover:bg-[color:var(--surface-2)]"
          >
            Manage Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            onClick={() => setProfileOpen(false)}
            className="block rounded-xl px-3 py-2 text-sm hover:bg-[color:var(--surface-2)]"
          >
            Customer Orders
          </NavLink>
        </>
      )}

      <div className="my-2 border-t border-[color:var(--border)]" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-[color:var(--primary)] hover:bg-[color:var(--primary-soft)]"
      >
        Logout
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  </header>
);
}

export default Navbar;
