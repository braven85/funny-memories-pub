import useNewMemory from '../hooks/useNewMemory';
import { HiXMark } from 'react-icons/hi2';
import { FieldValues, useForm } from 'react-hook-form';
import SelectChild from './inputs/SelectChild';
import useOptionValue from '../hooks/useOptionValue';
import DateInput from './inputs/DateInput';
import MemoryContent from './inputs/MemoryContent';
import Button from './Button';
import memoryApi from '../api/memoryApi';
import { toast } from 'react-toastify';
import useDateInput from '../hooks/useDateInput';
import useMemoryContent from '../hooks/useMemoryContent';
import useGlobalLoading from '../hooks/useGlobalLoading';
import useMemoryAdded from '../hooks/useMemoryAdded';
import useUpdateMemory from '../hooks/useUpdateMemory';
import dayjs from 'dayjs';

const NewMemoryModal = () => {
  const newMemory = useNewMemory();
  const optionValue = useOptionValue();
  const date = useDateInput();
  const content = useMemoryContent();
  const globalLoading = useGlobalLoading();
  const memoryAdded = useMemoryAdded();
  const update = useUpdateMemory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const clearNewMemoryInputData = () => {
    optionValue.resetOptionValue();
    date.resetDate();
    content.resetContent();
  };

  const submitNewMemory = async (data: FieldValues) => {
    if (
      optionValue.optionValue === 'stewie' &&
      date.date < dayjs('2020-01-01').format('YYYY-MM-DD')
    ) {
      toast.error('Stewie was born on 01.01.2020!');
      return;
    }

    if (
      optionValue.optionValue === 'chris' &&
      date.date < dayjs('2017-01-01').format('YYYY-MM-DD')
    ) {
      toast.error('Chris was born on 01.01.2017!');
      return;
    }

    try {
      globalLoading.setIsLoading();
      await memoryApi.createNewMemory(data);
      toast.success('New memory added!');
      clearNewMemoryInputData();
      newMemory.onClose();
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

  const submitUpdateMemory = async (data: FieldValues) => {
    if (update.updatingMemory.date === '') {
      toast.error(
        `${update.updatingMemory.child
          .slice(0, 1)
          .toUpperCase()}${update.updatingMemory.child.slice(1)} was born on ${
          update.updatingMemory.child === 'stewie'
            ? '01.01.2020!'
            : update.updatingMemory.child === 'chris'
            ? '01.01.2017!'
            : null
        }`
      );
      return;
    }

    if (
      update.updatingMemory.child === 'stewie' &&
      update.updatingMemory.date < dayjs('2020-01-01').format('YYYY-MM-DD')
    ) {
      toast.error('Stewie was born on 01.01.2020!');
      return;
    }

    if (
      update.updatingMemory.child === 'chris' &&
      update.updatingMemory.date < dayjs('2017-01-01').format('YYYY-MM-DD')
    ) {
      toast.error('Chris was born on 01.01.2017!');
      return;
    }

    try {
      globalLoading.setIsLoading();
      await memoryApi.updateMemory(update.updatingMemory.id, data);
      toast.success('Memory successfully updated!');
      newMemory.onClose();
      memoryAdded.setMemoryAdded();
      setTimeout(() => {
        globalLoading.setIsNotLoading();
      }, 100);
    } catch (error: unknown) {
      console.error(error);
      toast.error('Something went wrong!');
      globalLoading.setIsNotLoading();
    }

    update.setIsNotUpdating();
    update.setUpdatingMemory({ id: '', child: '', date: '', content: '' });
  };

  const closeUpdateButtonHandler = () => {
    newMemory.onClose();
    update.setIsNotUpdating();
    update.setUpdatingMemory({ id: '', child: '', date: '', content: '' });
  };

  return (
    <div className='fixed z-[200] shadow-md w-[100vw] h-[100vh] bg-white text-sm'>
      <div className='flex justify-end'>
        <div
          className='m-2 p-5 hover:cursor-pointer rounded-full hover:bg-gray-300 z-[300]'
          onClick={newMemory.onClose}
        >
          <HiXMark size={26} />
        </div>
      </div>
      <div
        className={`flex justify-center items-center text-2xl lg:text-4xl text-center font-medium
        ${
          optionValue.optionValue === 'chris' || update.updatingMemory.child === 'chris'
            ? 'text-fm2-chris'
            : optionValue.optionValue === 'stewie' || update.updatingMemory.child === 'stewie'
            ? 'text-fm2-stewie'
            : optionValue.optionValue === 'meg' || update.updatingMemory.child === 'meg'
            ? 'text-fm2-meg'
            : 'text-black'
        }`}
      >
        {optionValue.optionValue === 'chris' || update.updatingMemory.child === 'chris'
          ? 'You have chosen Chris. Enter your memory below'
          : optionValue.optionValue === 'stewie' || update.updatingMemory.child === 'stewie'
          ? 'You have chosen Stewie. Enter your memory below'
          : optionValue.optionValue === 'meg' || update.updatingMemory.child === 'meg'
          ? 'You have chosen Meg. Enter your memory below'
          : 'Choose a child and enter your memory'}
      </div>
      <form
        onSubmit={
          update.isUpdating
            ? handleSubmit(data => submitUpdateMemory(data))
            : handleSubmit(data => submitNewMemory(data))
        }
        className='flex flex-col gap-4 items-center mt-4'
      >
        <SelectChild id='child' register={register} errors={errors} required />
        <DateInput id='date' register={register} errors={errors} required />
        <MemoryContent id='content' register={register} errors={errors} required />
        <div className='flex justify-evenly w-[90%] md:w-[80%] min-w-[260px]'>
          {optionValue.optionValue === 'chris' || update.updatingMemory.child === 'chris' ? (
            <Button chris form type='submit'>
              Add a memory
            </Button>
          ) : optionValue.optionValue === 'stewie' || update.updatingMemory.child === 'stewie' ? (
            <Button stewie form type='submit'>
              Add a memory
            </Button>
          ) : optionValue.optionValue === 'meg' || update.updatingMemory.child === 'meg' ? (
            <Button meg form type='submit'>
              Add a memory
            </Button>
          ) : (
            <Button black form type='submit'>
              Add a memory
            </Button>
          )}
          <Button
            black
            form
            type='button'
            onClick={update.isUpdating ? closeUpdateButtonHandler : newMemory.onClose}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewMemoryModal;
