import { useState } from 'react';

const DropdownItem = ({ children, description, fire }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex justify-between items-center" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor" onClick={() => fire()}>
        {children}
      </p>
      {isHovered && (
        <span className="text-xs text-gray-500">
          {description}
        </span>
      )}
    </div>
  );
};

export default DropdownItem;