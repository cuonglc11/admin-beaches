import React, { useState, useEffect } from "react";
import { detailBeaches, url } from "../../api/function";
import "./Slider.css";
import { useNavigate } from "react-router-dom";

function Slider({ id }) {
  const [slides, setSlides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataImage = async () => {
      if (id) {
        try {
          const rs = await detailBeaches(id);
          if (rs?.data?.data === null) {
            navigate("/this-page-does-not-exist");
          }

          const images = rs?.data?.data?.images || [];
          const formattedSlides = images.map((img) => ({
            id: img.id,
            image: img.img_link,
          }));
          setSlides(formattedSlides);
        } catch (error) {
          console.error("Failed to fetch slider images:", error);
          setSlides([]);
        }
      }
    };
    fetchDataImage();
  }, [id]);

  const handleNext = () => {
    if (slides.length <= 1) return;
    const newSlides = [...slides];
    const firstSlide = newSlides.shift();
    newSlides.push(firstSlide);
    setSlides(newSlides);
  };

  const handlePrev = () => {
    if (slides.length <= 1) return;
    const newSlides = [...slides];
    const lastSlide = newSlides.pop();
    newSlides.unshift(lastSlide);
    setSlides(newSlides);
  };

  if (slides.length === 0) {
    return <div className="slider-loading">Loading slider...</div>;
  }

  const activeSlide = slides[0];
  const totalSlides = slides.length;

  let thumbnailSlides;
  if (totalSlides <= 3) {
    thumbnailSlides = slides.slice(1, 2);
  } else if (totalSlides === 4) {
    thumbnailSlides = slides.slice(1, 3);
  } else {
    thumbnailSlides = slides.slice(1, 4);
  }

  const thumbnailContainerClass =
    totalSlides <= 3
      ? "slider__thumbnails-container single-thumbnail"
      : "slider__thumbnails-container";

  return (
    <main className="slider-container">
      <div
        className="slider__main-image"
        style={{ backgroundImage: `url(${url}${activeSlide?.image})` }}
      >
        {/* <div className="slider__content">
          <h2 className="slider__title">{beachTitle}</h2>
          <p className="slider__description">{beachDescription}</p>
        </div> */}
      </div>

      <div className={thumbnailContainerClass}>
        {thumbnailSlides.map((slide) => (
          <div
            key={slide.id}
            className="slider__thumbnail-item"
            style={{ backgroundImage: `url(${url}${slide?.image})` }}
          />
        ))}
      </div>

      <div className="slider__nav">
        <button
          onClick={handlePrev}
          className="slider__nav-button slider__nav-button--prev"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          className="slider__nav-button slider__nav-button--next"
        >
          ›
        </button>
      </div>
    </main>
  );
}

export default Slider;
