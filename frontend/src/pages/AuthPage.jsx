import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

const initialLogin = { email: "", password: "" };
const initialRegister = { name: "", email: "", password: "" };

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [registerForm, setRegisterForm] = useState(initialRegister);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await api.post("/auth/login", loginForm);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setSuccess("Login successful. Redirecting to buses...");
      setTimeout(() => navigate("/buses"), 700);
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/auth/register", registerForm);
      setSuccess("Registration successful. Please login.");
      setMode("login");
      setRegisterForm(initialRegister);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <p className="auth-kicker">GoRideX Access</p>
          <h2>Welcome Back, Traveler</h2>
          <p>
            Login or create account to manage bookings, check offers and get
            instant ticket updates.
          </p>
        </div>

        <div className="auth-right">
          <div className="auth-tabs">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
            >
              Login
            </button>
            <button
              type="button"
              className={mode === "register" ? "active" : ""}
              onClick={() => {
                setMode("register");
                setError("");
                setSuccess("");
              }}
            >
              Register
            </button>
          </div>

          {mode === "login" ? (
            <form onSubmit={onLogin} className="auth-form">
              <input
                type="email"
                placeholder="Email address"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Please wait..." : "Login"}
              </button>
            </form>
          ) : (
            <form onSubmit={onRegister} className="auth-form">
              <input
                type="text"
                placeholder="Full name"
                value={registerForm.name}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email address"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Create password"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Please wait..." : "Create Account"}
              </button>
            </form>
          )}

          {error && <p className="auth-msg error">{error}</p>}
          {success && <p className="auth-msg success">{success}</p>}
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
