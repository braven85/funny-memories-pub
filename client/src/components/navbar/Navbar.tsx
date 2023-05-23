import Button from '../Button';
import chrisIcon from '../../assets/images/chris.png';
import stewieIcon from '../../assets/images/stewie.png';
import megIcon from '../../assets/images/meg.png';
import allIcons from '../../assets/images/threeChildren.png';
import BabyIcon from './BabyIcon';
import { useLocation } from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti';
import Sidebar from './Sidebar';
import useNewMemory from '../../hooks/useNewMemory';
import useEditMemory from '../../hooks/useEditMemory';
import { toast } from 'react-toastify';
import useSidebar from '../../hooks/useSidebar';
import useOptionValue from '../../hooks/useOptionValue';
import useDateInput from '../../hooks/useDateInput';
import useMemoryContent from '../../hooks/useMemoryContent';

const babies = [
  {
    name: '',
    icon: allIcons,
  },
  {
    name: 'chris',
    icon: chrisIcon,
  },
  {
    name: 'stewie',
    icon: stewieIcon,
  },
  {
    name: 'meg',
    icon: megIcon,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const newMemory = useNewMemory();
  const editMemory = useEditMemory();
  const sidebar = useSidebar();
  const optionValue = useOptionValue();
  const date = useDateInput();
  const content = useMemoryContent();

  const clearNewMemoryInputData = () => {
    optionValue.resetOptionValue();
    date.resetDate();
    content.resetContent();
  };

  const handleEditMemory = () => {
    if (editMemory.isOpen) {
      editMemory.onClose();
      toast.success('Edit mode OFF!');
    } else {
      clearNewMemoryInputData();
      editMemory.onOpen();
      toast.success('Edit mode ON!');
    }
  };

  return (
    <>
      <Sidebar isOpen={sidebar.isOpen} onClose={() => sidebar.onClose()} data={babies} />
      <div className='fixed z-10 h-20 w-screen bg-fm2-gradient-end'>
        <div className='flex h-full items-center justify-end md:justify-around'>
          <div className='hidden md:flex w-[45%] lg:w-[40%] justify-evenly'>
            <Button blue desktop onClick={() => newMemory.onOpen()}>
              ADD A NEW MEMORY
            </Button>
            {editMemory.isOpen ? (
              <Button green desktop onClick={handleEditMemory}>
                TURN OFF EDIT MODE
              </Button>
            ) : (
              <Button red desktop onClick={handleEditMemory}>
                TURN ON EDIT MODE
              </Button>
            )}
          </div>
          <div className='hidden md:flex w-[45%] lg:w-[40%] justify-evenly'>
            {babies.map(baby => (
              <BabyIcon
                key={baby.name}
                name={baby.name}
                icon={baby.icon}
                selected={pathname === `/${baby.name}`}
              />
            ))}
          </div>
          <div
            onClick={() => sidebar.onOpen()}
            className='md:hidden mr-6 p-5 hover:cursor-pointer rounded-full hover:bg-green-300'
          >
            <TiThMenu size={26} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
