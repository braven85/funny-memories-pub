import { create } from 'zustand';

interface DateInputStore {
  date: string;
  setDate: (value: string) => void;
  resetDate: () => void;
}

const useDateInput = create<DateInputStore>(set => ({
  date: '',
  setDate: value => set({ date: value }),
  resetDate: () => set({ date: '' }),
}));

export default useDateInput;
