import { useState } from "react";
import { useNavigate } from "react-router-dom";

function IconSearch({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M20 20l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Search() {
  const [product, setProduct] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const q = product.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form
      onSubmit={submit}
      className="group/search flex w-full min-w-0 items-center gap-0 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] shadow-sm transition-all duration-200 focus-within:border-[color:var(--primary)] focus-within:shadow-[0_0_0_3px_var(--ring)] dark:bg-[color:var(--surface)]"
    >
      <label htmlFor="nav-search" className="sr-only">
        Search products
      </label>
      <div className="pointer-events-none flex shrink-0 pl-3 text-[color:var(--text-muted)]">
        <IconSearch className="h-4 w-4" />
      </div>
      <input
        id="nav-search"
        type="search"
        autoComplete="off"
        onChange={(e) => setProduct(e.target.value)}
        value={product}
        placeholder="Search products…"
        className="min-w-0 flex-1 border-0 bg-transparent py-2.5 pl-2 pr-2 text-sm text-[color:var(--text)] placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-0"
      />
      <button
        type="submit"
        className="m-1 shrink-0 rounded-xl bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-[color:var(--primary-foreground)] shadow-sm transition-all duration-200 hover:bg-[color:var(--primary-hover)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
      >
        Search
      </button>
    </form>
  );
}
