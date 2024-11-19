import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants.js";
import { toast } from "react-toastify";
const ProfilePage = () => {
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userInfo = useMemo(
    () => JSON.parse(localStorage.getItem("userInfo")),
    []
  );

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (userInfo) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        name: userInfo.name,
        email: userInfo.email,
      }));
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = userDetails;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const response = await fetch(`${BASE_URL}/users/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important for sending cookies
          body: JSON.stringify(userDetails),
        });

        if (!response.ok) {
          throw new Error("Failed to update profile");
        }

        const updatedUser = await response.json();

        // Optionally update local storage with the new user info
        localStorage.setItem("userInfo", JSON.stringify(updatedUser));
        toast.success("Profile updated successfully");

        navigate("/");

        // Optionally, refresh the page or update local state
      } catch (err) {
        console.error(err);
        toast.error("Error updating profile");
      }
    }
  };

  return (
    <div className="container mx-auto mt-12 py-6 font-sans">
      <div className="w-2/3 mx-auto">
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-blue-400 mb-1">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              value={userDetails.name}
              onChange={handleChange}
            />
          </div>
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
              value={userDetails.email}
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
              value={userDetails.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-blue-400 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm your password"
              value={userDetails.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition duration-200"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
