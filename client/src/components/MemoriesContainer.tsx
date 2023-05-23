import chrisIcon from '../assets/images/chris.png';
import stewieIcon from '../assets/images/stewie.png';
import megIcon from '../assets/images/meg.png';
import allIcons from '../assets/images/threeChildren.png';
import MemoryItem from './MemoryItem';
import { useLocation } from 'react-router-dom';

interface Memory {
  id: string;
  child: string;
  content: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface MemoriesContainerProps {
  data: Memory[];
}

const MemoriesContainer: React.FC<MemoriesContainerProps> = ({ data }) => {
  const { pathname } = useLocation();
  return (
    <div className='relative top-20'>
      <div className='flex flex-col items-center justify-center'>
        <img
          className='w-48 py-2'
          src={
            pathname === '/chris'
              ? chrisIcon
              : pathname === '/stewie'
              ? stewieIcon
              : pathname === '/meg'
              ? megIcon
              : allIcons
          }
          alt='children'
        />
        <div className='flex flex-col w-screen text-center'>
          {data &&
            data.map(memory => (
              <div key={memory.id}>
                <MemoryItem memory={memory} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MemoriesContainer;
