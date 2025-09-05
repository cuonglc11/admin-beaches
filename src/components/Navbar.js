import React, { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { menuData } from "./data";
import { FiLogIn } from "react-icons/fi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    // console.log(111111111);
    navigate("/seach-beaches/" + inputValue);
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon">🌴</span>
        <span className="logo-text">SeaView</span>
      </div>
      <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </button>
      <ul className={`navbar-links ${menuOpen ? "active" : ""} gap-4`}>
        {menuData.map((item, key) => (
          <li key={key}>
            <Link to={item.to}>{item.titile}</Link>
          </li>
        ))}
        <li className="md:hidden">
          {!localStorage.getItem("token") &&
          !localStorage.getItem("role") &&
          localStorage.getItem("role") != 2 ? (
            <Link
              to="/login-account"
              className="block w-full px-4 py-2 rounded-full 
             bg-gradient-to-r from-cyan-500 to-blue-600 
             text-white font-semibold 
             shadow-lg hover:from-cyan-600 hover:to-blue-700 
             active:scale-95 transition-all duration-300 ease-in-out
             flex items-center justify-center gap-2"
            >
              <FiLogIn className="text-lg" />
              <span className="drop-shadow-md">Login</span>
            </Link>
          ) : (
            <div></div>
          )}
        </li>
      </ul>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search for beach..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm</button>
      </div>
      {!localStorage.getItem("token") &&
      !localStorage.getItem("role") &&
      localStorage.getItem("role") != 2 ? (
        <Link
          to="/login-account"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full 
             bg-gradient-to-r from-blue-500 to-indigo-600 
             text-white font-medium shadow-md 
             hover:from-blue-600 hover:to-indigo-700 
             transition-all duration-300 ease-in-out"
        >
          <FiLogIn className="text-lg" />
          <span>Login</span>
        </Link>
      ) : (
        <div className="hidden md:flex items-center gap-3">
          <span className="font-medium text-gray-700">
            Hello, {localStorage.getItem("user")}
          </span>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              localStorage.removeItem("user");

              window.location.reload();
            }}
            className="px-3 py-1 rounded-full bg-red-500 text-white 
                 hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
