import { useCallback, useEffect } from 'react';
import useMemories from '../hooks/useMemories';
import MemoriesContainer from '../components/MemoriesContainer';
import memoryApi from '../api/memoryApi';
import useGlobalLoading from '../hooks/useGlobalLoading';
import useMemoryAdded from '../hooks/useMemoryAdded';

const ChrisMemories = () => {
  const globalLoading = useGlobalLoading();
  const memories = useMemories();
  const memoryAdded = useMemoryAdded();

  const chrisMemories =
    memories.memories && memories.memories.filter(memory => memory.child === 'chris');

  const getMemories = useCallback(async () => {
    try {
      globalLoading.setIsLoading();
      const response = await memoryApi.getOneChildsMemories('chris');
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

  return <MemoriesContainer data={chrisMemories} />;
};

export default ChrisMemories;
