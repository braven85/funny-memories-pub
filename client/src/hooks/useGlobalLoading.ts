import { create } from 'zustand';

interface GlobalLoadingStore {
  isLoading: boolean;
  setIsLoading: () => void;
  setIsNotLoading: () => void;
}

const useGlobalLoading = create<GlobalLoadingStore>(set => ({
  isLoading: false,
  setIsLoading: () => set({ isLoading: true }),
  setIsNotLoading: () => set({ isLoading: false }),
}));

export default useGlobalLoading;
