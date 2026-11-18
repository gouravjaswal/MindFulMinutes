export default function Garden({ totalMinutes }) {
  const plants = Math.min(Math.floor(totalMinutes / 15), 8); // 1 plant every 15 minutes

  const plantEmojis = ["🌱", "🌿", "🪴", "🌳", "🌲", "🌴", "🌻", "🌺"];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 h-full">
      <h2 className="text-xl font-semibold text-green-800 mb-2">
        Your Calm Garden
      </h2>
      <p className="text-sm text-green-600 mb-6">
        Every 15 focused minutes grows a new plant
      </p>

      <div className="grid grid-cols-4 gap-4 min-h-[180px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`flex items-center justify-center text-4xl h-16 rounded-xl transition-all duration-500 ${
              i < plants
                ? "bg-green-100 scale-100"
                : "bg-gray-50 scale-90 opacity-40"
            }`}
          >
            {i < plants ? plantEmojis[i] : "·"}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-green-600 font-medium">
        {plants === 0
          ? "Start your first session to plant a seed 🌱"
          : plants >= 8
            ? "Your garden is flourishing ✨"
            : `${plants} plant${plants > 1 ? "s" : ""} growing beautifully`}
      </div>
    </div>
  );
}
