import dayjs from 'dayjs';
import { ChangeEvent } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import useDateInput from '../../hooks/useDateInput';
import useOptionValue from '../../hooks/useOptionValue';
import useUpdateMemory from '../../hooks/useUpdateMemory';

interface DateInputProps {
  id: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const DateInput: React.FC<DateInputProps> = ({ id, disabled, required, register, errors }) => {
  const currentDay = dayjs(Date.now()).format('YYYY-MM-DD');
  const date = useDateInput();
  const optionValue = useOptionValue();
  const update = useUpdateMemory();

  const handleDateVerification = (event: string) => {
    if (
      update.updatingMemory.child === 'stewie' &&
      event < dayjs('2020-01-01').format('YYYY-MM-DD')
    ) {
      return '';
    } else if (
      update.updatingMemory.child === 'chris' &&
      event < dayjs('2017-01-01').format('YYYY-MM-DD')
    ) {
      return '';
    } else {
      return event;
    }
  };

  const handleDateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    update.isUpdating
      ? update.setUpdatingMemory({
          id: update.updatingMemory.id,
          child: update.updatingMemory.child,
          date: handleDateVerification(event.target.value),
          content: update.updatingMemory.content,
        })
      : date.setDate(event.target.value);
  };

  return (
    <div className='w-[90%] md:w-[80%] min-w-[260px] relative'>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required, onChange: e => handleDateChange(e) })}
        type='date'
        defaultValue={
          update.isUpdating ? dayjs(update.updatingMemory.date).format('YYYY-MM-DD') : date.date
        }
        min='2015-01-01'
        max={currentDay}
        className={`
          peer text-xl md:text-2xl lg:text-3xl w-full p-4 pt-6 font-normal bg-white border-2 rounded-md
          outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-20
          ${
            errors[id]
              ? 'border-rose-500'
              : optionValue.optionValue === 'chris' || update.updatingMemory.child === 'chris'
              ? 'border-fm2-chris'
              : optionValue.optionValue === 'stewie' || update.updatingMemory.child === 'stewie'
              ? 'border-fm2-stewie'
              : optionValue.optionValue === 'meg' || update.updatingMemory.child === 'meg'
              ? 'border-fm2-meg'
              : 'border-black'
          }
          ${
            errors[id]
              ? 'text-rose-500'
              : optionValue.optionValue === 'chris' || update.updatingMemory.child === 'chris'
              ? 'text-fm2-chris'
              : optionValue.optionValue === 'stewie' || update.updatingMemory.child === 'stewie'
              ? 'text-fm2-stewie'
              : optionValue.optionValue === 'meg' || update.updatingMemory.child === 'meg'
              ? 'text-fm2-meg'
              : 'text-black'
          }
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
          ${errors[id] ? 'focus:text-rose-500' : 'focus:text-black'}
        `}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? 'peer-focus:text-rose-500' : 'peer-focus:text-black'}
        ${
          errors[id]
            ? 'text-rose-500'
            : optionValue.optionValue === 'chris' || update.updatingMemory.child === 'chris'
            ? 'text-fm2-chris'
            : optionValue.optionValue === 'stewie' || update.updatingMemory.child === 'stewie'
            ? 'text-fm2-stewie'
            : optionValue.optionValue === 'meg' || update.updatingMemory.child === 'meg'
            ? 'text-fm2-meg'
            : 'text-black'
        }
        `}
      >
        Date:
      </label>
    </div>
  );
};

export default DateInput;
