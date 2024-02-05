import { useState, useEffect } from "react";
import "./BannerSlider.scss";

const slides = [
  {
    image:
      "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/slide_1.jpg",
    info: "Info about slide 1",
  },
  {
    image:
      "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/slide_2.jpg",
    info: "Info about slide 2",
  },
  {
    image:
      "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/slide_3.jpg",
    info: "Info about slide 3",
  },
  {
    image:
      "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/slide_4.jpg",
    info: "Info about slide 4",
  },
];

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 3500);

    return () => clearInterval(slideInterval);
  }, []);

  const handleSlideClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="banner-slider">
      <div
        className="banner-slider__slides"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="slide"
          />
        ))}
      </div>
      <div className="banner-slider__info-bars">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`info-bar ${currentSlide === index ? "active" : ""}`}
            onClick={() => handleSlideClick(index)}
          >
            {slide.info}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
