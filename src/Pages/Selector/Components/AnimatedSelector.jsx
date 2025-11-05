import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const AnimatedSelector = ({
  options = [],
  defaultValue = null,
  onChange = () => {},
  placeholder = "Select an option",
  className = "",
  classNameInput = "",
  value = undefined,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState(defaultValue);

  // Use controlled value if provided, otherwise use internal state
  const selected = value !== undefined ? value : internalSelected;
  const dropdownRef = useRef(null);
  const itemsRef = useRef([]);
  const arrowRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Animate dropdown open
      gsap.fromTo(
        dropdownRef.current,
        {
          opacity: 0,
          y: -10,
          scaleY: 0.95,
          transformOrigin: "top",
        },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );

      // Stagger animate items
      gsap.fromTo(
        itemsRef.current,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        }
      );

      // Animate backdrop
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      );
    }

    // Rotate arrow
    gsap.to(arrowRef.current, {
      rotation: isOpen ? 180 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isOpen]);

  const handleSelect = (option) => {
    // Only update internal state if not controlled
    if (value === undefined) {
      setInternalSelected(option);
    }
    onChange(option);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Backdrop */}
      {isOpen && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Selector Button */}
      <button
        onClick={handleToggle}
        className={`w-full ${classNameInput} rounded-lg flex items-center justify-between transition-colors duration-200 relative z-20 shadow-sm`}
      >
        <span className={selected ? "text-gray-900" : "text-gray-400"}>
          {selected?.label || placeholder}
        </span>
        <svg
          ref={arrowRef}
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-30 overflow-hidden"
        >
          <div className="max-h-60 overflow-y-auto">
            {options.map((option, idx) => (
              <button
                key={option.value}
                ref={(el) => (itemsRef.current[idx] = el)}
                onClick={() => handleSelect(option)}
                className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 flex items-center justify-between ${
                  selected?.value === option.value
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700"
                }`}
              >
                <span>{option.label}</span>
                {selected?.value === option.value && (
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default AnimatedSelector;
