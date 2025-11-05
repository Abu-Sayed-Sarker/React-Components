import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";

export default function Carousel({
  slides = [],
  autoPlayInterval = 5000,
  showNavigationButtons = true,
  showDots = true,
  height = "500px",
  slideHeight = "450px",
  sideSlideHeight = "400px",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentSlideRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const prevSlideRef = useRef(null);
  const nextSlideRef = useRef(null);
  const containerRef = useRef(null);

  const animateSlideTransition = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const timeline = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    const slideOutX = direction === "right" ? -100 : 100;
    const slideInX = direction === "right" ? 100 : -100;

    timeline
      .to([titleRef.current, buttonRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      })
      .to(
        currentSlideRef.current,
        {
          x: `${slideOutX}%`,
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.2"
      )
      .call(() => {
        setCurrentIndex((prevIndex) => {
          if (direction === "right") {
            return prevIndex === slides.length - 1 ? 0 : prevIndex + 1;
          } else {
            return prevIndex === 0 ? slides.length - 1 : prevIndex - 1;
          }
        });
      })
      .fromTo(
        currentSlideRef.current,
        {
          x: `${slideInX}%`,
          opacity: 0,
          scale: 0.9,
        },
        {
          x: "0%",
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      )
      .fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .fromTo(
        buttonRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

    gsap.to(prevSlideRef.current, {
      x: direction === "right" ? -30 : 30,
      opacity: 0.2,
      duration: 0.4,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });

    gsap.to(nextSlideRef.current, {
      x: direction === "right" ? 30 : -30,
      opacity: 0.2,
      duration: 0.4,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });
  };

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline
      .fromTo(
        currentSlideRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .fromTo(
        [prevSlideRef.current, nextSlideRef.current],
        { opacity: 0, scale: 0.9 },
        {
          opacity: 0.4,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.5"
      );
  }, []);

  useEffect(() => {
    if (!autoPlayInterval || slides.length === 0) return;

    const interval = setInterval(() => {
      animateSlideTransition("right");
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, autoPlayInterval, slides.length]);

  const goToPrevious = () => {
    animateSlideTransition("left");
  };

  const goToNext = () => {
    animateSlideTransition("right");
  };

  const getPreviousIndex = () => {
    return currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  };

  const getNextIndex = () => {
    return currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center h-96">
        <p className="text-gray-500 text-lg">No slides available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div
        ref={containerRef}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height }}
      >
        <div
          ref={prevSlideRef}
          className="absolute left-0 w-1/4 opacity-40 transition-all duration-300 ease-out transform hover:scale-105 hover:opacity-60 cursor-pointer"
          style={{ height: sideSlideHeight }}
          onClick={goToPrevious}
        >
          <img
            src={slides[getPreviousIndex()].image || "/placeholder.svg"}
            alt="Previous slide"
            className="w-full h-full object-cover rounded-2xl brightness-50 transition-all duration-300"
          />
        </div>

        <div
          ref={currentSlideRef}
          className="relative z-10 w-2/3"
          style={{ height: slideHeight }}
        >
          <img
            src={slides[currentIndex].image || "/placeholder.svg"}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover rounded-2xl shadow-2xl"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <h2
              ref={titleRef}
              className="text-white text-4xl md:text-5xl font-bold mb-8 drop-shadow-lg max-w-3xl leading-tight"
            >
              {slides[currentIndex].title}
            </h2>
            <button
              ref={buttonRef}
              size="lg"
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-6 text-lg rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
              onClick={slides[currentIndex].onButtonClick}
            >
              {slides[currentIndex].buttonText}
            </button>
          </div>
        </div>

        <div
          ref={nextSlideRef}
          className="absolute right-0 w-1/4 opacity-40 transition-all duration-300 ease-out transform hover:scale-105 hover:opacity-60 cursor-pointer"
          style={{ height: sideSlideHeight }}
          onClick={goToNext}
        >
          <img
            src={slides[getNextIndex()].image || "/placeholder.svg"}
            alt="Next slide"
            className="w-full h-full object-cover rounded-2xl brightness-50 transition-all duration-300"
          />
        </div>

        {showNavigationButtons && (
          <>
            <button
              onClick={goToPrevious}
              disabled={isAnimating}
              className="absolute left-4 md:left-8 z-20 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-gray-800" />
            </button>

            <button
              onClick={goToNext}
              disabled={isAnimating}
              className="absolute right-4 md:right-8 z-20 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-gray-800" />
            </button>
          </>
        )}
      </div>

      {showDots && (
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index !== currentIndex && !isAnimating) {
                  animateSlideTransition(
                    index > currentIndex ? "right" : "left"
                  );
                }
              }}
              disabled={isAnimating}
              className={`h-2.5 rounded-full transition-all duration-500 disabled:cursor-not-allowed ${
                index === currentIndex
                  ? "bg-blue-700 w-8"
                  : "bg-gray-300 hover:bg-gray-400 w-2.5 hover:w-4"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
