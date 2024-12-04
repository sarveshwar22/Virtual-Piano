import React from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';

interface ControlsProps {
  volume: number;
  onVolumeChange: (value: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({ volume, onVolumeChange }) => {
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
      <VolumeIcon className="w-6 h-6 text-gray-600" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-sm text-gray-600">{Math.round(volume * 100)}%</span>
    </div>
  );
};