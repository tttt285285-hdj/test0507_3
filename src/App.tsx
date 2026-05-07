/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  teamName: string;
  themeColor: string;
}

const TimerComponent = ({ teamName, themeColor }: TimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }, [isRunning]);

  const pauseTimer = useCallback(() => {
    if (!isRunning) return;
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [isRunning]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSeconds(0);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex flex-col items-center p-8 rounded-2xl bg-white shadow-xl border-t-8 ${themeColor}`}>
      <h2 className="text-[34px] font-bold mb-4 text-gray-700">{teamName}</h2>
      <div className="font-mono text-[80px] font-bold text-gray-900 mb-8 tabular-nums">
        {formatTime(seconds)}
      </div>
      <div className="flex gap-4">
        <button
          onClick={startTimer}
          disabled={isRunning}
          className={`px-6 py-3 rounded-lg text-white transition-all flex items-center gap-2 font-semibold ${isRunning ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
        >
          <Play size={20} />
          開始
        </button>
        <button
          onClick={pauseTimer}
          disabled={!isRunning}
          className={`px-6 py-3 rounded-lg text-white transition-all flex items-center gap-2 font-semibold ${!isRunning ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600'}`}
        >
          <Pause size={20} />
          暫停
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all flex items-center gap-2 font-semibold"
        >
          <RotateCcw size={20} />
          重設
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12">比賽計時系統</h1>
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <TimerComponent teamName="A隊" themeColor="border-blue-500" />
        <TimerComponent teamName="B隊" themeColor="border-orange-500" />
      </div>
    </div>
  );
}
