import { create } from 'zustand';

interface Memory {
  id: string;
  child: string;
  content: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface MemoriesStore {
  memories: Memory[];
  setMemories: (data: Memory[]) => void;
}

const useMemories = create<MemoriesStore>(set => ({
  memories: [],
  setMemories: data => set({ memories: data }),
}));

export default useMemories;
