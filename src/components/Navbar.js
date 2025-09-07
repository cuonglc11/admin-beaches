import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { listRegion } from "../api/function";

function Navbar() {
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [regions, setRegions] = useState([]);
  useEffect(() => {
    fetchDataRegion();
  }, []);
  const fetchDataRegion = async () => {
    try {
      const rs = await listRegion();
      setRegions(rs.data?.data || []);
    } catch (error) {}
  };
  const handleSearch = () => {
    console.log("Search:", inputValue);
  };

  const handleSelectRegion = (regionId) => {
    navigate(`/region/${regionId}`);
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-md px-4 md:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center">
          <div className="flex items-center text-lg md:text-xl font-bold text-blue-600">
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
          {/* Menu */}
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
              <Link to="/featured" className="hover:text-blue-600">
                Featured Beaches
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex items-center space-x-6">
            <div className="text-gray-600">
              📞 <span className="font-medium">0 (800) 123-456</span>
            </div>
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
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
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

        {/* Phone + Search (mobile) */}
        <div className="mt-4 space-y-2">
          <div className="text-gray-600 px-4">
            📞 <span className="font-medium">0 (800) 123-456</span>
          </div>
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
      </div>
    </nav>
  );
}

export default Navbar;
