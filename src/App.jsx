import { useState, useEffect } from "react";
import Timer from "./components/Timer";
import Garden from "./components/Garden";
import Stats from "./components/Stats";

function App() {
  const [totalMinutes, setTotalMinutes] = useState(() => {
    return Number(localStorage.getItem("mindfulMinutes")) || 0;
  });

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem("mindfulStreak")) || 0;
  });

  const [lastSessionDate, setLastSessionDate] = useState(
    localStorage.getItem("lastSessionDate") || null
  );

  useEffect(() => {
    localStorage.setItem("mindfulMinutes", totalMinutes);
    localStorage.setItem("mindfulStreak", streak);
    if (lastSessionDate) {
      localStorage.setItem("lastSessionDate", lastSessionDate);
    }
  }, [totalMinutes, streak, lastSessionDate]);

  const handleSessionComplete = (minutes) => {
    setTotalMinutes((prev) => prev + minutes);

    const today = new Date().toDateString();

    if (lastSessionDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastSessionDate === yesterday.toDateString()) {
        setStreak((prev) => prev + 1);
      } else {
        setStreak(1);
      }
      setLastSessionDate(today);
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-800 mb-2">
          Mindful Minutes
        </h1>
        <p className="text-green-600 text-lg">
          Grow calm, one focused minute at a time
        </p>
      </header>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Timer onComplete={handleSessionComplete} />
          <Stats totalMinutes={totalMinutes} streak={streak} />
        </div>

        <Garden totalMinutes={totalMinutes} />
      </div>
    </div>
  );
}

export default App;