import { useState, useEffect } from "react";
import "./BannerSlider.scss";
import slide1 from "../../assets/slide_1.jpg";
import slide2 from "../../assets/slide_2.jpg";
import slide3 from "../../assets/slide_3.jpg";
import slide4 from "../../assets/slide_4.jpg";

const slides = [
  { image: slide1, info: "Info about slide 1" },
  { image: slide2, info: "Info about slide 2" },
  { image: slide3, info: "Info about slide 3" },
  { image: slide4, info: "Info about slide 4" },
];

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 3000); // Change the interval time as needed

    return () => clearInterval(slideInterval);
  }, []);

  const handleSlideClick = (index) => {
    console.log(`Navigate to slide ${index}`);
  };

  return (
    <div className="banner-slider">
      <div className="banner-slider__slides">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className={`slide ${currentSlide === index ? "active" : ""}`}
            onClick={() => handleSlideClick(index)}
          />
        ))}
      </div>
      <div className="banner-slider__info-bars">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`info-bar ${currentSlide === index ? "active" : ""}`}
          >
            {slide.info}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
