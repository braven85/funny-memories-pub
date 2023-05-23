import { create } from 'zustand';

interface OptionValueStore {
  optionValue: string;
  setOptionValue: (value: string) => void;
  resetOptionValue: () => void;
}

const useOptionValue = create<OptionValueStore>(set => ({
  optionValue: '',
  setOptionValue: value => set({ optionValue: value }),
  resetOptionValue: () => set({ optionValue: '' }),
}));

export default useOptionValue;
