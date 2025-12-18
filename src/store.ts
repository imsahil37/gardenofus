import { create } from 'zustand'

interface LanternData {
    position: [number, number, number]
}

interface State {
  memoryCount: number
  totalOrbs: number
  isComplete: boolean
  hasForgiven: boolean
  lanterns: LanternData[]
  incrementMemory: (position: [number, number, number]) => void
  setComplete: () => void
  forgive: () => void
}

export const useStore = create<State>((set) => ({
  memoryCount: 0,
  totalOrbs: 5,
  isComplete: false,
  hasForgiven: false,
  lanterns: [],
  incrementMemory: (position) =>
    set((state) => {
      const newCount = state.memoryCount + 1
      // Spawn a lantern at the orb's position
      const newLanterns = [...state.lanterns, { position }]
      return {
        memoryCount: newCount,
        isComplete: newCount >= state.totalOrbs,
        lanterns: newLanterns
      }
    }),
  setComplete: () => set({ memoryCount: 5, isComplete: true }),
  forgive: () => set({ hasForgiven: true }),
}))

// Expose store to window for testing
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).useStore = useStore
}
