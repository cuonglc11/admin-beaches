import React, { useState, useEffect } from "react";
import { detailBeaches, url } from "../../api/function";

function Slider({ id }) {
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    const fetchDataImage = async () => {
      try {
        const rs = await detailBeaches(id);
        const images = rs?.data?.data?.images || [];
        console.log(images);
        setSlides(images);
      } catch (error) {}
    };
    fetchDataImage();
  }, [id]);

  const handleNext = () => {
    const newSlides = [...slides];
    console.log(newSlides);
    const firstSlide = newSlides.shift();
    newSlides.push(firstSlide);
    setSlides(newSlides);
  };

  const handlePrev = () => {
    const newSlides = [...slides];
    const lastSlide = newSlides.pop();
    newSlides.unshift(lastSlide);
    setSlides(newSlides);
  };

  return (
    <main className="slider-container">
      <div className="slider__track">
        {slides.map((item, index) => (
          <article
            key={item.id}
            className="slider__item"
            style={{
              backgroundImage: `url(${url}${item.img_link})`,
            }}
          ></article>
        ))}
      </div>
      <div className="slider__nav">
        <button
          onClick={handlePrev}
          className="slider__nav-button slider__nav-button--prev"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          className="slider__nav-button slider__nav-button--next"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </main>
  );
}

export default Slider;
