import { create } from 'zustand';

interface UpdateMemoryStore {
  isUpdating: boolean;
  updatingMemory: { id: string; child: string; date: string; content: string };
  setIsUpdating: () => void;
  setIsNotUpdating: () => void;
  setUpdatingMemory: (data: { id: string; child: string; date: string; content: string }) => void;
}

const useUpdateMemory = create<UpdateMemoryStore>(set => ({
  isUpdating: false,
  child: '',
  updatingMemory: { id: '', child: '', date: '', content: '' },
  setIsUpdating: () => set({ isUpdating: true }),
  setIsNotUpdating: () => set({ isUpdating: false }),
  setUpdatingMemory: data => set({ updatingMemory: data }),
}));

export default useUpdateMemory;
