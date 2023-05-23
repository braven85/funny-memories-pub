import { create } from 'zustand';

interface EditMemoryStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditMemory = create<EditMemoryStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditMemory;
