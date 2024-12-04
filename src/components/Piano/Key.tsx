import React from 'react';

interface KeyProps {
  note: string;
  isBlack?: boolean;
  onPress: (note: string) => void;
  onRelease: (note: string) => void;
}

export const Key: React.FC<KeyProps> = ({ note, isBlack = false, onPress, onRelease }) => {
  return (
    <button
      className={`
        ${isBlack 
          ? 'bg-gray-900 h-32 w-12 -mx-6 z-10 hover:bg-gray-800' 
          : 'bg-white h-48 w-14 hover:bg-gray-50'
        }
        relative
        rounded-b-md
        border-2
        border-gray-300
        active:bg-gray-200
        transition-colors
        duration-150
      `}
      onMouseDown={() => onPress(note)}
      onMouseUp={() => onRelease(note)}
      onMouseLeave={() => onRelease(note)}
      onTouchStart={() => onPress(note)}
      onTouchEnd={() => onRelease(note)}
    />
  );
};