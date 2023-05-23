import { useCallback, useEffect } from 'react';
import memoryApi from '../api/memoryApi';
import MemoriesContainer from '../components/MemoriesContainer';
import useMemories from '../hooks/useMemories';
import useGlobalLoading from '../hooks/useGlobalLoading';
import useMemoryAdded from '../hooks/useMemoryAdded';

const StewieMemories = () => {
  const globalLoading = useGlobalLoading();
  const memories = useMemories();
  const memoryAdded = useMemoryAdded();

  const stewieMemories =
    memories.memories && memories.memories.filter(memory => memory.child === 'stewie');

  const getMemories = useCallback(async () => {
    try {
      globalLoading.setIsLoading();
      const response = await memoryApi.getOneChildsMemories('stewie');
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

  return <MemoriesContainer data={stewieMemories} />;
};

export default StewieMemories;
