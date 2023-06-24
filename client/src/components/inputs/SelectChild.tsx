import { ChangeEvent } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import useOptionValue from '../../hooks/useOptionValue';
import useUpdateMemory from '../../hooks/useUpdateMemory';

interface SelectChildProps {
  id: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const SelectChild: React.FC<SelectChildProps> = ({ id, disabled, required, register, errors }) => {
  const optionValue = useOptionValue();
  const update = useUpdateMemory();

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    update.isUpdating
      ? update.setUpdatingMemory({
          id: update.updatingMemory.id,
          child: event.target.value,
          date: update.updatingMemory.date,
          content: update.updatingMemory.content,
        })
      : optionValue.setOptionValue(event.target.value);
  };

  return (
    <div className='w-[90%] md:w-[80%] min-w-[260px] relative z-[500]'>
      <select
        id='child'
        defaultValue={update.isUpdating ? update.updatingMemory.child : optionValue.optionValue}
        disabled={disabled}
        {...register(id, { required, onChange: e => handleOptionChange(e) })}
        className={`
          peer w-full p-4 pt-4 text-xl md:text-2xl lg:text-3xl text-center font-light bg-white border-2 rounded-md
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
          ${errors[id] ? 'focus:text-rose-500' : 'focus:text-black'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      >
        <option value=''></option>
        <option value='chris'>Chris</option>
        <option value='stewie'>Stewie</option>
        <option value='meg'>Meg</option>
      </select>
      <label
        htmlFor={id}
        className={`absolute text-xl md:text-2xl lg:text-3xl duration-150 px-1 top-4 z-10 origin-[0] left-4
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
        {errors[id]
          ? 'You have to choose a child'
          : `${
              optionValue.optionValue !== '' || update.updatingMemory.child !== ''
                ? 'You have chosen:'
                : 'Choose a child:'
            }`}
      </label>
    </div>
  );
};

export default SelectChild;
