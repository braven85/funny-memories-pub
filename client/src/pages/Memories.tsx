import { useCallback, useEffect } from 'react';
import memoryApi from '../api/memoryApi.js';
import useGlobalLoading from '../hooks/useGlobalLoading.js';
import useMemories from '../hooks/useMemories.js';
import MemoriesContainer from '../components/MemoriesContainer.js';
import useMemoryAdded from '../hooks/useMemoryAdded.js';

const Memories = () => {
  const globalLoading = useGlobalLoading();
  const memories = useMemories();
  const memoryAdded = useMemoryAdded();

  const getMemories = useCallback(async () => {
    try {
      globalLoading.setIsLoading();
      const response = await memoryApi.getAllMemories();
      memories.setMemories(response);
      setTimeout(() => {
        globalLoading.setIsNotLoading();
      }, 100);
    } catch (err) {
      console.log(err);
      globalLoading.setIsNotLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoryAdded.memoryAdded]);

  useEffect(() => {
    getMemories();
  }, [getMemories]);

  return <MemoriesContainer data={memories.memories} />;
};

export default Memories;
