import { useState, useEffect, useRef } from "react";

export default function Timer({ onComplete }) {
  const [minutes, setMinutes] = useState(10);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      onComplete(minutes);
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, secondsLeft]);

  const startTimer = () => {
    setSecondsLeft(minutes * 60);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
      <h2 className="text-xl font-semibold text-green-800 mb-4">
        Focus Timer
      </h2>

      {!isRunning ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">
              Minutes:
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="w-20 px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            onClick={startTimer}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition duration-200"
          >
            Start Mindful Session
          </button>
        </div>
      ) : (
        <div className="text-center space-y-5">
          <div className="text-5xl font-mono font-bold text-green-700 tracking-wider">
            {formatTime(secondsLeft)}
          </div>
          <button
            onClick={stopTimer}
            className="px-6 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
          >
            Stop Session
          </button>
        </div>
      )}
    </div>
  );
}