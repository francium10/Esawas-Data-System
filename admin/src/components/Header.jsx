import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { BASE_URL } from "../constants";
import logo from "../assets/logo.jpeg";

const Header = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/logout`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      navigate("/");
      localStorage.removeItem("userInfo");
      setDropdownOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-blue-500 ">
      <nav className="flex px-0 justify-around md:justify-between md:px-6 py-2">
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="Esawas Illustration"
              className="w-32 md:w-48 lg:w-64 mx-auto shadow-lg rounded-lg mt-2 mb-2"
            />
          </Link>
        </div>
        <div className="flex items-center ">
          <div>
            {userInfo ? (
              <div className="flex">
                {userInfo.name}
                <div className="flex">
                  <button
                    className={`${
                      dropdownOpen && "-rotate-180"
                    } cursor-pointer transition duration-300`}
                  >
                    <IoMdArrowDropdown
                      className="text-white"
                      size={24}
                      onClick={() => {
                        handleDropdown();
                      }}
                    />
                  </button>
                </div>
                <div
                  className={`${
                    dropdownOpen ? "flex" : "hidden"
                  } translate-x-8 flex-col p-2 px-6 right-12 top-[55px] space-y-2 transition
                   duration-300 absolute rounded-b bg-white
                   `}
                  onMouseLeave={() => {
                    setDropdownOpen(false);
                  }}
                >
                  <Link className="cursor-pointer" to="/profile">
                    Profile
                  </Link>

                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      logoutUser();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              location.pathname === "/login" ||
              (location.pathname === "/register" ? (
                ""
              ) : (
                <div className="flex space-x-2 items-center justify-center bg-blue-300 py-2 px-3 rounded cursor-pointer">
                  <IoPersonSharp />
                  <Link to="/login">Login</Link>
                </div>
              ))
            )}
          </div>
          <div>{}</div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
