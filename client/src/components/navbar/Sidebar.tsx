import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { HiXMark } from 'react-icons/hi2';
import BabyIcon from './BabyIcon';
import { useLocation } from 'react-router-dom';
import Button from '../Button';
import useEditMemory from '../../hooks/useEditMemory';
import useNewMemory from '../../hooks/useNewMemory';
import { toast } from 'react-toastify';
import useSidebar from '../../hooks/useSidebar';
import useOptionValue from '../../hooks/useOptionValue';
import useDateInput from '../../hooks/useDateInput';
import useMemoryContent from '../../hooks/useMemoryContent';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  data: { name: string; icon: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, data }) => {
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
      sidebar.onClose();
    } else {
      clearNewMemoryInputData();
      editMemory.onOpen();
      toast.success('Edit mode ON!');
      sidebar.onClose();
    }
  };

  const handleNewMemory = () => {
    newMemory.onOpen();
    sidebar.onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50 md:hidden' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-40' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 left-0 flex max-w-full'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-200'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-200'
                leaveTo='translate-y-full'
              >
                <Dialog.Panel className='pointer-events-auto w-[50vw]'>
                  <div className='flex h-full flex-col bg-fm2-gradient-end shadow-xl'>
                    <div className='flex justify-end'>
                      <div
                        className='md:hidden mr-1 p-5 hover:cursor-pointer rounded-full hover:bg-green-300'
                        onClick={onClose}
                      >
                        <HiXMark size={26} />
                      </div>
                    </div>
                    <div className='flex flex-col items-center h-screen justify-evenly mx-3'>
                      <div className='w-full flex flex-col items-center'>
                        <hr className='border border-black w-full' />
                        <div className='text-2xl font-bold text-blue-600 mx-1'>MENU</div>
                        <hr className='border border-black w-full mb-2' />
                        <Button blue mobile onClick={handleNewMemory}>
                          ADD A NEW MEMORY
                        </Button>
                      </div>
                      <div className='w-full flex flex-col items-center'>
                        <hr className='border border-black w-full' />
                        <div className='text-2xl font-bold text-green-600 mx-1'>FILTER</div>
                        <hr className='border border-black w-full' />
                        <div className='grid grid-cols-2 gap-5 mt-8'>
                          {data.map(baby => (
                            <BabyIcon
                              key={baby.name}
                              name={baby.name}
                              icon={baby.icon}
                              selected={pathname === `/${baby.name}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className='w-full flex flex-col items-center'>
                        <hr className='border border-black w-full' />
                        <div className='text-2xl font-bold text-red-600 mx-1'>EDIT MODE</div>
                        <hr className='border border-black w-full mb-2' />
                        {editMemory.isOpen ? (
                          <Button green mobile onClick={handleEditMemory}>
                            TURN OFF EDIT MODE
                          </Button>
                        ) : (
                          <Button red mobile onClick={handleEditMemory}>
                            TURN ON EDIT MODE
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Sidebar;
