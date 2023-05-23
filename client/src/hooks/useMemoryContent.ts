import { create } from 'zustand';

interface MemoryContentStore {
  content: string;
  setContent: (data: string) => void;
  resetContent: () => void;
}

const useMemoryContent = create<MemoryContentStore>(set => ({
  content: '',
  setContent: data => set({ content: data }),
  resetContent: () => set({ content: '' }),
}));

export default useMemoryContent;
