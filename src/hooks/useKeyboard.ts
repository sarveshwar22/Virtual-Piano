import { useEffect, useCallback } from 'react';
import { KEYBOARD_MAPPING } from '../utils/constants';

interface UseKeyboardProps {
  onKeyPress: (note: string) => void;
  onKeyRelease: (note: string) => void;
}

export const useKeyboard = ({ onKeyPress, onKeyRelease }: UseKeyboardProps) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const note = KEYBOARD_MAPPING[event.key.toLowerCase()];
    if (note && !event.repeat) {
      onKeyPress(note);
    }
  }, [onKeyPress]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const note = KEYBOARD_MAPPING[event.key.toLowerCase()];
    if (note) {
      onKeyRelease(note);
    }
  }, [onKeyRelease]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
};