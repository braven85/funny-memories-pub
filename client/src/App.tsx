import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Memories from './pages/Memories';
import ChrisMemories from './pages/ChrisMemories';
import StewieMemories from './pages/StewieMemories';
import MegMemories from './pages/MegMemories';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer
        position='bottom-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme='dark'
      />
      <BrowserRouter>
        <Routes>
          <Route path='' element={<MainLayout />}>
            <Route index element={<Memories />} />
            <Route path='/all' element={<Memories />} />
            <Route path='/chris' element={<ChrisMemories />} />
            <Route path='/stewie' element={<StewieMemories />} />
            <Route path='/meg' element={<MegMemories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
