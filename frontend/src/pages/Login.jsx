import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Container from "../components/Container";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAuth from "../context/useAuth";
import login  from "../actions/auth/login"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const navigate = useNavigate();
  const  auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    // setError("");
 
    if(!email || !password)
    {
      setLoading(false)
      // setError("email or password missing")
      toast.error("email or password missing");
      return
    }

    console.log("login component")
    console.log(email, " ", password)
    
    const status = await login({email,password},   auth);

    if(status.error){
       toast.error(status.error)
       setLoading(false)
       return
    }

    setLoading(false)

    setTimeout(() => navigate("/"), 500);
     
   
  };

  return (
    <Container>
    <div className="flex items-center justify-center py-10">

     
      <div className="w-full max-w-md neo-card p-6">
        <h1 className="text-3xl font-black tracking-tight mb-1 text-[color:var(--text)]">Login !</h1>
        <p className="text-sm mb-6 text-[color:var(--text-muted)]">
          Sign in to access your cart and orders.
        </p>

        {/* {error && (
          <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )} */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-[color:var(--text)]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="neo-input block w-full rounded-xl px-3 py-2 text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-[color:var(--text)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="neo-input block w-full rounded-xl px-3 py-2 text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex justify-center rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-xs text-[color:var(--text-muted)]">
          Don't have an account?{" "}
          <Link to="/register" className="text-[color:var(--primary-strong)] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>

    </Container>
    
  
  );
}
