import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 cursor-pointer right-6 transform -translate-y-1/2 bg-[#FF8C00] text-white p-3 rounded-full shadow-md
        transition-all duration-300 hover:bg-orange-500 hover:scale-110 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      aria-label="Scroll to top"
    >
      <FaArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
