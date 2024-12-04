import React from 'react';
import { Key } from './Key';
import { NOTES } from '../../utils/constants';

interface KeyboardProps {
  onKeyPress: (note: string) => void;
  onKeyRelease: (note: string) => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, onKeyRelease }) => {
  return (
    <div className="flex relative">
      {NOTES.map((note) => (
        <Key
          key={note.name}
          note={note.name}
          isBlack={note.isBlack}
          onPress={onKeyPress}
          onRelease={onKeyRelease}
        />
      ))}
    </div>
  );
};