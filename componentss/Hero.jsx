import React, { useState, useEffect } from "react";
import "./Hero.css";
import beach1 from "./images/beach1.jpg";
import beach2 from "./images/beach2.jpg";
import beach3 from "./images/beach3.jpg";

function Hero() {
    const images = [beach1, beach2, beach3];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3s đổi ảnh
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero">
      <img
        src={images[currentIndex]}
        alt="Beach Banner"
        className="hero-image"
      />
      <div className="hero-overlay">
        <h1>Good Place for Enjoyment</h1>
        <p>Khám phá những bãi biển tuyệt đẹp</p>
      </div>
    </div>
  );
}

export default Hero;
