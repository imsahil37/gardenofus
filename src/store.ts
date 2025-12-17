import { create } from 'zustand'

interface State {
  memoryCount: number
  totalOrbs: number
  isComplete: boolean
  incrementMemory: () => void
}

export const useStore = create<State>((set) => ({
  memoryCount: 0,
  totalOrbs: 5,
  isComplete: false,
  incrementMemory: () =>
    set((state) => {
      const newCount = state.memoryCount + 1
      return {
        memoryCount: newCount,
        isComplete: newCount >= state.totalOrbs,
      }
    }),
}))
