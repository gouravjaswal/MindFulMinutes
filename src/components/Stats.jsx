export default function Stats({ totalMinutes, streak }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
      <h2 className="text-xl font-semibold text-green-800 mb-4">
        Your Progress
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-5 bg-green-50 rounded-xl">
          <div className="text-3xl font-bold text-green-700">{totalMinutes}</div>
          <div className="text-sm text-green-600 mt-1">Total Minutes</div>
        </div>

        <div className="text-center p-5 bg-green-50 rounded-xl">
          <div className="text-3xl font-bold text-green-700">{streak}</div>
          <div className="text-sm text-green-600 mt-1">Day Streak</div>
        </div>
      </div>
    </div>
  );
}