import React, { useRef, useEffect, useState } from "react";
import type { Movie } from "../store/movieStore";

interface CarouselSectionProps {
  title: string;
  movies: Movie[];
}

const CarouselSection: React.FC<CarouselSectionProps> = React.memo(({ title, movies }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollByAmount = 300;
  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" });
    }
  };
  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      setScrollPosition(scrollRef.current.scrollLeft);
    };
    const ref = scrollRef.current;
    ref?.addEventListener("scroll", handleScroll);
    return () => ref?.removeEventListener("scroll", handleScroll);
  }, []);

  const moviesVal = movies.length > 0;

  return (
    <section className="mb-12 relative">
      <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>

      <div className="relative">
        <button
          onClick={handlePrev}
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-r-md hover:bg-black/80 transition ${
            scrollPosition <= 0
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
        >
          ◀
        </button>

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth px-10"
        >
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="relative min-w-[180px] rounded-xl overflow-hidden transition-transform transform hover:scale-110"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-[260px] object-cover"
              />
              <div className="absolute bottom-0 bg-black/70 text-center w-full py-2">
                <h3 className="text-white text-sm font-medium">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-xs">{movie.yearOrTime}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className={`absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-l-md hover:bg-black/80 transition ${
            moviesVal ? "opacity-100" : "opacity-0"
          }`}
        >
          ▶
        </button>
      </div>
    </section>
  );
});

export default CarouselSection;
