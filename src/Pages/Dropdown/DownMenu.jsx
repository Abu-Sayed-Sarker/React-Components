import { useRef, useState } from "react";

//////
{
  /* <DropdownMenu
  items={[
    {
      label: "Edit",
      onClick: () => console.log("Edit"),
      icon: "✏️", // optional
    },
    {
      label: "Delete",
      onClick: () => console.log("Delete"),
      danger: true, // optional: red styling
      disabled: false, // optional
    },
  ]}
  position="bottom-right" // options: bottom-right, bottom-left, top-right, top-left
/>; */
}
const DownMenu = ({ items, position = "bottom-right" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const positionClasses = {
    "bottom-right": "right-0 mt-2",
    "bottom-left": "left-0 mt-2",
    "top-right": "right-0 bottom-full mb-2",
    "top-left": "left-0 bottom-full mb-2",
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Menu"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <circle cx="8" cy="3" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="8" cy="13" r="1.5" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute ${positionClasses[position]} w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              disabled={item.disabled}
              className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 flex items-center gap-2
                ${
                  item.disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }
                ${item.danger ? "text-red-600 hover:bg-red-50" : ""}
              `}
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownMenu;
