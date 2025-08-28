import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";

function Navbar() {
  const { setSearchQuery } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = () => {
    setSearchQuery(inputValue); // cập nhật từ khóa tìm kiếm
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <span className="logo-icon">🌴</span>
        <span className="logo-text">SeaView</span>
      </div>
      
      {/* Hamburger icon */}
      <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </button>
      {/* Menu Links */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Trang chủ</Link>
        </li>
        <li>
          <Link to="/region" onClick={() => setMenuOpen(false)}>Khu vực</Link>
        </li>
        <li>
          <Link to="/featured" onClick={() => setMenuOpen(false)}>Bãi biển nổi bật</Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Liên hệ</Link>
        </li>
      </ul>

      {/* Call Us */}
      <div className="navbar-call">
        <span className="call-icon">📞</span>
        <span className="call-text">Call us:</span>
        <span className="call-number">0 (800) 123-456</span>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Tìm bãi biển..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm</button>
      </div>
    </nav>
  );
}

export default Navbar;
