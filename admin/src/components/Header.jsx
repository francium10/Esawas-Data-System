import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

const Header = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-blue-500 ">
      <nav className="flex px-0 justify-around md:justify-between md:px-6 py-2">
        <div>
          <Link to="/">
            <p className="text-xl  font-bold">ESAWAS</p>
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
                  } translate-x-8 flex-col p-2 px-4 top-[44px] space-y-2 transition duration-300 absolute rounded-b bg-blue-400`}
                >
                  <Link className="cursor-pointer" to="/profile">
                    Profile
                  </Link>
                  <button className="cursor-pointer">Logout</button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2 items-center justify-center bg-blue-300 py-2 px-3 rounded cursor-pointer">
                <IoPersonSharp />
                <Link to="/login">Login</Link>
              </div>
            )}
          </div>
          <div>{}</div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
