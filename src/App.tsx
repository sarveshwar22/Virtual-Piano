import React, { useState } from 'react';
import { Music } from 'lucide-react';
import { Keyboard } from './components/Piano/Keyboard';
import { Controls } from './components/Piano/Controls';
import { useSound } from './hooks/useSound';
import { useKeyboard } from './hooks/useKeyboard';

function App() {
  const [volume, setVolume] = useState(0.5);
  const { playNote, stopNote, setVolume: setAudioVolume } = useSound(volume);

  useKeyboard({
    onKeyPress: playNote,
    onKeyRelease: stopNote,
  });

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setAudioVolume(newVolume);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Virtual Piano</h1>
          </div>
          <p className="text-gray-600">
            Use your mouse or keyboard (A-J and W-U) to play notes
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-xl shadow-lg">
          <div className="mb-6 flex justify-center">
            <Controls volume={volume} onVolumeChange={handleVolumeChange} />
          </div>
          
          <div className="overflow-x-auto pb-4">
            <Keyboard onKeyPress={playNote} onKeyRelease={stopNote} />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Built with Web Audio API • React • TypeScript</p>
        </div>
      </div>
    </div>
  );
}

export default App;