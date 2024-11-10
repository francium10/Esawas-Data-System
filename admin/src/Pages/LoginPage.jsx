import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import logo from "../assets/logo.png";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });
      const user = await response.json();
      if (user) {
        localStorage.setItem("userInfo", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        alert("Error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-300">
      <div className="bg-white p-8 shadow-md w-full max-w-md">
        <img src={logo} alt="EWASAS" className="w-24 h-auto mx-auto" />
        <div className="flex justify-center mb-6">
          <FaUserCircle className="text-4xl text-blue-400" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-blue-500 mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-blue-400 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-blue-400 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-2">
          New Customer?
          <Link to="/register" className="text-blue-400 ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
