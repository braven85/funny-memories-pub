import { create } from 'zustand';

interface MemoryAddedStore {
  memoryAdded: boolean;
  setMemoryAdded: () => void;
}

const useMemoryAdded = create<MemoryAddedStore>(set => ({
  memoryAdded: false,
  setMemoryAdded: () => set(state => ({ memoryAdded: !state.memoryAdded })),
}));

export default useMemoryAdded;
