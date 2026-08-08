import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";
import API from "../api/api";

function SignupPage() {
  const { darkMode } = useTheme();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Frontend Developer",
  });

  const password = formData.password;

  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  const passwordStrength = Object.values(checks).filter(Boolean).length;

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!emailValid) {
      return alert("Invalid email address");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      alert("Registration Successful!");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center px-6 transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-black via-slate-950 to-black text-white"
          : "bg-slate-100 text-black"
      }`}
    >
      <div
        className={`w-full max-w-lg p-8 rounded-3xl border ${
          darkMode
            ? "bg-white/5 border-white/10"
            : "bg-white border-gray-200 shadow-xl"
        }`}
      >
        <h1 className="text-4xl font-bold text-center mb-8">Create Account</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full p-4 rounded-xl border ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-300"
            }`}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full p-4 rounded-xl border ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-300"
            }`}
          />

          {formData.email && (
            <p
              className={`text-sm ${
                emailValid ? "text-green-500" : "text-red-500"
              }`}
            >
              {emailValid ? "✓ Valid Email" : "✗ Invalid Email"}
            </p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full p-4 rounded-xl border ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-300"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-cyan-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="text-sm space-y-1">
            <p className={checks.length ? "text-green-500" : "text-red-500"}>
              ✓ At least 8 characters
            </p>

            <p className={checks.upper ? "text-green-500" : "text-red-500"}>
              ✓ One uppercase letter
            </p>

            <p className={checks.lower ? "text-green-500" : "text-red-500"}>
              ✓ One lowercase letter
            </p>

            <p className={checks.number ? "text-green-500" : "text-red-500"}>
              ✓ One number
            </p>

            <p className={checks.special ? "text-green-500" : "text-red-500"}>
              ✓ One special character
            </p>
          </div>

          <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-2 bg-cyan-500"
              style={{
                width: `${(passwordStrength / 5) * 100}%`,
              }}
            />
          </div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={`w-full p-4 rounded-xl border ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-300"
            }`}
          />

          {formData.confirmPassword && (
            <p
              className={`text-sm ${
                formData.password === formData.confirmPassword
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {formData.password === formData.confirmPassword
                ? "✓ Passwords Match"
                : "✗ Passwords Do Not Match"}
            </p>
          )}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full p-4 rounded-xl border ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-300"
            }`}
          >
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
            <option>Java Developer</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?
          <Link to="/login" className="text-cyan-400 ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
