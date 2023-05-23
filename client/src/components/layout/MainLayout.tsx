import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import GlobalLoading from '../GlobalLoading';
import NewMemoryModal from '../NewMemoryModal';
import useNewMemory from '../../hooks/useNewMemory';
import { useEffect } from 'react';

const MainLayout = () => {
  const newMemory = useNewMemory();

  useEffect(() => {
    if (newMemory.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [newMemory.isOpen]);

  return (
    <main className='flex justify-center bg-gradient-to-t from-fm2-gradient-start via-fm2-gradient-middle to-fm2-gradient-end min-h-[100vh]'>
      <GlobalLoading />
      {newMemory.isOpen && <NewMemoryModal />}
      <Navbar />
      <Outlet />
    </main>
  );
};

export default MainLayout;
