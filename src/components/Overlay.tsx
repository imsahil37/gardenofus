import { useStore } from '../store'

export function Overlay() {
  const { memoryCount, totalOrbs, isComplete } = useStore()

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-between p-4 md:p-8">
      {/* Top Bar */}
      <div className="w-full max-w-[90%] md:max-w-md mx-auto bg-white/20 backdrop-blur-md rounded-full p-3 md:p-4 shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-bold text-sm md:text-lg drop-shadow-md">
            Restoring our world...
          </span>
          <span className="text-white font-bold text-sm md:text-lg drop-shadow-md">
            {memoryCount} / {totalOrbs}
          </span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-3 md:h-4">
          <div
            className="bg-[#fce181] h-3 md:h-4 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(memoryCount / totalOrbs) * 100}%` }}
          />
        </div>
      </div>

      {/* Center Message (Conditional) */}
      {isComplete && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-auto max-w-lg bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl text-center pointer-events-auto animate-fade-in transition-all duration-300">
          <h1 className="text-2xl md:text-3xl font-bold text-[#3c096c] mb-3 md:mb-4">
            I'm so sorry.
          </h1>
          <p className="text-sm md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
            I know I messed up. These memories mean the world to me, just like you do. 
            I want to help our garden grow again.
          </p>
          <button
            className="w-full md:w-auto px-6 md:px-8 py-2 md:py-3 bg-[#e0aaff] hover:bg-[#c77dff] text-white font-bold rounded-full transition-colors shadow-lg transform active:scale-95 md:hover:scale-105 text-sm md:text-base"
            onClick={() => alert("Thank you. ❤️")}
          >
            Forgive me?
          </button>
        </div>
      )}
    </div>
  )
}
