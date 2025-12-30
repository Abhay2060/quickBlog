import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;

const SignUp = () => {
  const navigate = useNavigate();
  const { isAdmin,setIsAdmin } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
    const { data } = await axios.post(
      "/admin/register",
      { name, email, password }
    );

    if (data.success) {
      setIsAdmin(true); 
      toast.success("Account created successfully!");
      navigate("/admin"); 
    } else {
      toast.error(data.message || "Signup failed");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
  }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSignUp}
        className="p-8 bg-white shadow-md rounded-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Your Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="you@email.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="********"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2.5 rounded-full font-semibold"
        >
          Create Account
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/admin" className="text-primary font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
