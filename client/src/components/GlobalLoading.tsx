import { useState, useEffect } from 'react';
import useGlobalLoading from './../hooks/useGlobalLoading';
import Spinner from './Spinner';

const GlobalLoading = () => {
  const globalLoading = useGlobalLoading();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (globalLoading.isLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [globalLoading.isLoading]);

  return (
    <>
      <div
        className={`${
          isLoading ? 'opacity-100' : 'opacity-0'
        } pointer-events-none transition-all duration-300 ease-in-out fixed
          w-screen h-screen z-[100] flex justify-center items-center bg-white/20`}
      >
        <Spinner />
      </div>
    </>
  );
};

export default GlobalLoading;
