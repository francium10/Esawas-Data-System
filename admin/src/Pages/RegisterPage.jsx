import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import logo from "../assets/logo.png";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(registerData),
      });
      const user = await response.json();
      if (user) {
        localStorage.setItem("userInfo", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        alert("Error occurred");
      }
    } catch (error) {
      console.log(error?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-300">
      <div className="bg-white p-8 py-4 shadow-md w-full max-w-md">
        <img src={logo} alt="EWASAS" className="w-24 h-auto mx-auto" />
        <div className="flex justify-center mb-6">
          <FaUserCircle className="text-4xl text-blue-500" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-blue-500 mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-blue-300 mb-1">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              value={registerData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-blue-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={registerData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-blue-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={registerData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition duration-200"
          >
            Continue
          </button>
        </form>
        <p className="mt-2 text-center">
          Have an account?
          <Link to="/login" className="text-blue-400 ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
