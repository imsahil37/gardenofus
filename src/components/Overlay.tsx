import { useStore } from '../store'

export function Overlay() {
  const { memoryCount, totalOrbs, isComplete } = useStore()

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-between p-4 md:p-8">
      {/* Top Bar with Glassmorphism */}
      <div className="w-full max-w-[90%] md:max-w-md mx-auto bg-black/20 backdrop-blur-xl border border-white/10 rounded-full p-3 md:p-4 shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-bold text-sm md:text-lg drop-shadow-md tracking-wider">
            Restoring our world...
          </span>
          <span className="text-white font-bold text-sm md:text-lg drop-shadow-md">
            {memoryCount} / {totalOrbs}
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 md:h-4 overflow-hidden border border-white/5">
          <div
            className="bg-gradient-to-r from-[#e0aaff] to-[#fce181] h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(252,225,129,0.5)]"
            style={{ width: `${(memoryCount / totalOrbs) * 100}%` }}
          />
        </div>
      </div>

      {/* Center Message (Conditional) */}
      {isComplete && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-auto max-w-lg bg-black/30 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl text-center pointer-events-auto animate-fade-in transition-all duration-300">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
            I'm so sorry.
          </h1>
          <p className="text-sm md:text-lg text-gray-200 mb-4 md:mb-6 leading-relaxed drop-shadow-md">
            I know I messed up. These memories mean the world to me, just like you do. 
            I want to help our garden grow again.
          </p>
          <button
            className="w-full md:w-auto px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-[#e0aaff] to-[#c77dff] hover:from-[#c77dff] hover:to-[#e0aaff] text-white font-bold rounded-full transition-all shadow-lg transform active:scale-95 md:hover:scale-105 text-sm md:text-base border border-white/20"
            onClick={() => alert("Thank you. ❤️")}
          >
            Forgive me?
          </button>
        </div>
      )}
    </div>
  )
}
