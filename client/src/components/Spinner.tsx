import styles from './Spinner.module.css';

const Logo = () => {
  return (
    <span className='font-bold text-3xl flex flex-col justify-center items-center text-blue-700'>
      Loading...
      <span className={styles.spinner}></span>
    </span>
  );
};

export default Logo;
