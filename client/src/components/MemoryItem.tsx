import classes from './MemoryItem.module.css';
import chrisLogo from '../assets/images/chris.png';
import stewieLogo from '../assets/images/stewie.png';
import megLogo from '../assets/images/meg.png';
import dayjs from 'dayjs';
import useEditMemory from '../hooks/useEditMemory';
import Button from './Button';
import useNewMemory from '../hooks/useNewMemory';
import useUpdateMemory from '../hooks/useUpdateMemory';
import { toast } from 'react-toastify';
import memoryApi from '../api/memoryApi';
import useGlobalLoading from '../hooks/useGlobalLoading';
import useMemoryAdded from '../hooks/useMemoryAdded';
import useOptionValue from '../hooks/useOptionValue';
import useDateInput from '../hooks/useDateInput';
import useMemoryContent from '../hooks/useMemoryContent';

interface MemoryItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  memory: any;
}

const MemoryItem: React.FC<MemoryItemProps> = ({ memory }) => {
  const editMemory = useEditMemory();
  const newMemory = useNewMemory();
  const update = useUpdateMemory();
  const globalLoading = useGlobalLoading();
  const memoryAdded = useMemoryAdded();
  const optionValue = useOptionValue();
  const date = useDateInput();
  const content = useMemoryContent();

  const clearNewMemoryInputData = () => {
    optionValue.resetOptionValue();
    date.resetDate();
    content.resetContent();
  };

  const handleUpdateMemory = () => {
    clearNewMemoryInputData();
    update.setIsUpdating();
    update.setUpdatingMemory({
      id: memory.id,
      child: memory.child,
      date: memory.date,
      content: memory.content,
    });
    newMemory.onOpen();
  };

  const deleteMemoryHandler = async () => {
    try {
      globalLoading.setIsLoading();
      await memoryApi.deleteMemory(memory.id);
      toast.success('Memory successfully deleted!');
      memoryAdded.setMemoryAdded();
      setTimeout(() => {
        globalLoading.setIsNotLoading();
      }, 100);
    } catch (error: unknown) {
      console.error(error);
      toast.error('Something went wrong!');
      globalLoading.setIsNotLoading();
    }
  };

  return (
    <>
      <h2
        className={` ${classes.heading} text-3xl
                  ${memory.child === 'chris' ? 'text-fm2-chris' : ''}
                  ${
                    memory.child === 'chris'
                      ? 'before:bg-gradient-to-r from-transparent to-fm2-chris'
                      : ''
                  }
                  ${
                    memory.child === 'chris'
                      ? 'after:bg-gradient-to-l from-transparent to-fm2-chris'
                      : ''
                  }
                  ${memory.child === 'stewie' ? 'text-fm2-stewie' : ''}
                  ${
                    memory.child === 'stewie'
                      ? 'before:bg-gradient-to-r from-transparent to-fm2-stewie'
                      : ''
                  }
                  ${
                    memory.child === 'stewie'
                      ? 'after:bg-gradient-to-l from-transparent to-fm2-stewie'
                      : ''
                  }
                  ${memory.child === 'meg' ? 'text-fm2-meg' : ''}
                  ${
                    memory.child === 'meg'
                      ? 'before:bg-gradient-to-r from-transparent to-fm2-meg'
                      : ''
                  }
                  ${
                    memory.child === 'meg'
                      ? 'after:bg-gradient-to-l from-transparent to-fm2-meg'
                      : ''
                  }
                  `}
      >
        {memory.child.slice(0, 1).toUpperCase() + memory.child.slice(1)}
      </h2>
      <div className='flex items-center justify-center'>
        <img
          src={`
          ${memory.child === 'chris' ? chrisLogo : memory.child === 'stewie' ? stewieLogo : megLogo}
          `}
          alt='Child image'
          className='w-8 mr-4'
        />
        <div className='font-medium text-gray-500'>{dayjs(memory.date).format('DD-MM-YYYY')}</div>
      </div>
      <div className='my-2 mx-4 lg:mx-10'>{memory.content}</div>
      {editMemory.isOpen && (
        <div className='flex flex-row-reverse md:flex-row justify-center my-3 gap-x-10'>
          <Button form orange onClick={handleUpdateMemory}>
            Update
          </Button>
          <Button form red onClick={deleteMemoryHandler}>
            Delete
          </Button>
        </div>
      )}
    </>
  );
};

export default MemoryItem;
