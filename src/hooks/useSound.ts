import { useCallback, useRef } from 'react';

export const useSound = (initialVolume = 0.5) => {
  const audioContext = useRef<AudioContext | null>(null);
  const oscillators = useRef<{ [key: string]: OscillatorNode }>({});
  const gainNode = useRef<GainNode | null>(null);

  const getFrequency = (note: string): number => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = 4;
    const baseFrequency = 440; // A4
    const noteIndex = notes.indexOf(note);
    const a4Index = notes.indexOf('A');
    const halfSteps = noteIndex - a4Index + (octave - 4) * 12;
    return baseFrequency * Math.pow(2, halfSteps / 12);
  };

  const initAudio = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
      gainNode.current = audioContext.current.createGain();
      gainNode.current.connect(audioContext.current.destination);
      gainNode.current.gain.value = initialVolume;
    }
  }, [initialVolume]);

  const playNote = useCallback((note: string) => {
    initAudio();
    if (!audioContext.current || !gainNode.current) return;

    const oscillator = audioContext.current.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(getFrequency(note), audioContext.current.currentTime);
    oscillator.connect(gainNode.current);
    oscillator.start();
    oscillators.current[note] = oscillator;
  }, [initAudio]);

  const stopNote = useCallback((note: string) => {
    const oscillator = oscillators.current[note];
    if (oscillator) {
      oscillator.stop();
      delete oscillators.current[note];
    }
  }, []);

  const setVolume = useCallback((value: number) => {
    if (gainNode.current) {
      gainNode.current.gain.value = value;
    }
  }, []);

  return { playNote, stopNote, setVolume };
};