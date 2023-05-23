import { create } from 'zustand';

interface NewMemoryStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useNewMemory = create<NewMemoryStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useNewMemory;
