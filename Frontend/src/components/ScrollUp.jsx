import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300); // Show button after 300px scroll
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
    className={`fixed bottom-6 right-6 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-md 
        transition-all duration-300 hover:bg-gray-800 hover:scale-110 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
    >
    <FaArrowUp size={20} />
    </button>


  );
};

export default ScrollToTop;
