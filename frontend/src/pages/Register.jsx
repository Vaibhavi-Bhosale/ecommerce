import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signup from "../actions/auth/signup";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // try {
    //   await api.post("/auth/register", { name, email, password });
    //   setSuccess("Registration successful. You can now login.");
    //   setTimeout(() => navigate("/login"), 1000);
    // } catch (err) {
    //   setError("Registration failed. Please try again.");
    // } finally {
    //   setLoading(false);
    // }

    
    if(!email || !password || !name)
      {
       
      setLoading(false)
      setError(" fill all fields")
      return
    }

    console.log({name, email, password})
     const result = await signup({name, email, password})

     if(!result)
     {
      setError("Registration failed. Please try again.");
      setLoading(false);

     }

     setSuccess("Registration successful. You can now login.");
     setLoading(false);
     setTimeout(() => navigate("/login"), 500);


  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-md neo-card p-6">
        <h1 className="text-3xl font-black tracking-tight text-[color:var(--text)] mb-1">Register</h1>
        <p className="text-sm text-[color:var(--text-muted)] mb-6">
          Create an account to start shopping.
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[color:var(--text)] mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="neo-input block w-full rounded-xl px-3 py-2 text-sm"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[color:var(--text)] mb-1"
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
              className="block text-sm font-medium text-[color:var(--text)] mb-1"
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-xs text-[color:var(--text-muted)]">
          Already have an account?{" "}
          <Link to="/login" className="text-[color:var(--primary-strong)] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
