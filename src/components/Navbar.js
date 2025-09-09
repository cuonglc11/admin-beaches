import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { listRegion } from "../api/function";
import "./style/Navbar.css";
function Navbar() {
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [regions, setRegions] = useState([]);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Load region
  useEffect(() => {
    fetchDataRegion();
  }, []);
  const fetchDataRegion = async () => {
    try {
      const rs = await listRegion();
      setRegions(rs.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Load user từ localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    if (token && username) {
      setUser(username);
    }
  }, []);

  const handleSearch = () => {
    navigate("/seach-beaches/" + inputValue);
  };

  const handleSelectRegion = (regionId) => {
    navigate(`/region/${regionId}`);
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };
  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="flex items-center text-lg md:text-xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            🌴 SeaView
          </div>
          <button
            className="ml-4 text-2xl lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-6 font-medium">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hover:text-blue-600 flex items-center"
              >
                Region ▾
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectRegion("all")}
                  >
                    All
                  </li>
                  {regions.map((r) => (
                    <li
                      key={r.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectRegion(r.id)}
                    >
                      {r.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link to="/favorite" className="hover:text-blue-600">
                Featured Beaches
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-blue-600">
                Profile
              </Link>
            </li>
          </ul>

          <div className="flex items-center space-x-6">
            <button className="toggle-btn" onClick={toggleDarkMode}>
              {darkMode ? "🌙" : "☀️"}
            </button>
            <div className="flex border rounded overflow-hidden">
              <input
                type="text"
                placeholder="Search beaches..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="px-3 py-1 outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 hover:bg-blue-700"
              >
                Search
              </button>
            </div>

            {!user ? (
              <button
                onClick={() => navigate("/login-account")}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700">Hello, {user}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`${menuOpen ? "block" : "hidden"} lg:hidden mt-3`}>
        <ul className="space-y-2 font-medium border-t pt-2">
          <li>
            <Link to="/" className="block px-4 py-2 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="block w-full text-left px-4 py-2 hover:text-blue-600"
            >
              Region ▾
            </button>
            {dropdownOpen && (
              <ul className="ml-4 mt-1 space-y-1 border-l pl-2">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectRegion("all")}
                >
                  All
                </li>
                {regions.map((r) => (
                  <li
                    key={r.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectRegion(r.id)}
                  >
                    {r.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/featured"
              className="block px-4 py-2 hover:text-blue-600"
            >
              Featured Beaches
            </Link>
          </li>
          <li>
            <Link to="/contact" className="block px-4 py-2 hover:text-blue-600">
              Contact
            </Link>
          </li>
        </ul>

        <div className="mt-4 space-y-2">
          <button className="toggle-btn" onClick={toggleDarkMode}>
            {darkMode ? "🌙" : "☀️"}
          </button>
          <div className="flex border rounded overflow-hidden mx-4">
            <input
              type="text"
              placeholder="Search beaches..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="px-3 py-1 outline-none flex-1 text-sm"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
        <div className="px-4 mt-2">
          {!user ? (
            <button
              onClick={() => navigate("/login-account")}
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Hello, {user}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
