import React, { useState, useEffect } from "react";
import "./style/Hero.css";
import { ImageBanner, url } from "../api/function";

function Hero() {
  const [imagesBanner, setImageBanner] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fectImage = async () => {
    try {
      const rs = await ImageBanner(1);
      setImageBanner(rs?.data?.data);
    } catch (error) {}
  };
  useEffect(() => {
    fectImage();
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imagesBanner.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [imagesBanner.length]);

  return (
    <div className="hero">
      <img
        src={url + "" + imagesBanner[currentIndex]?.img}
        alt="Beach Banner"
        className="hero-image"
      />
      <div className="hero-overlay">
        <h1>{imagesBanner[currentIndex]?.title}</h1>
        <p>{imagesBanner[currentIndex]?.content}</p>
      </div>
    </div>
  );
}

export default Hero;
