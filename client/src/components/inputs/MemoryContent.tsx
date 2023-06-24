import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import useMemoryContent from '../../hooks/useMemoryContent';
import { ChangeEvent } from 'react';
import useOptionValue from '../../hooks/useOptionValue';
import useUpdateMemory from '../../hooks/useUpdateMemory';
import TextareaAutosize from '@mui/base/TextareaAutosize';

interface MemoryContentProps {
  id: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MemoryContent: React.FC<MemoryContentProps> = ({
  id,
  disabled,
  required,
  register,
  errors,
}) => {
  const content = useMemoryContent();
  const optionValue = useOptionValue();
  const update = useUpdateMemory();

  const handleContentChange = (event: ChangeEvent<HTMLSelectElement>) => {
    update.isUpdating
      ? update.setUpdatingMemory({
          id: update.updatingMemory.id,
          child: update.updatingMemory.child,
          date: update.updatingMemory.date,
          content: event.target.value,
        })
      : content.setContent(event.target.value);
  };

  return (
    <div className='w-[90%] md:w-[80%] min-w-[260px] h-auto relative'>
      <TextareaAutosize
        id={id}
        disabled={disabled}
        defaultValue={update.isUpdating ? update.updatingMemory.content : content.content}
        {...register(id, { required, onChange: e => handleContentChange(e) })}
        minRows={2}
        maxRows={8}
        placeholder='Memory:'
        className={`
          peer text-base md:text-lg lg:text-xl w-full p-4 font-normal bg-white border-2 rounded-md
          outline-none transition disabled:opacity-70 disabled:cursor-not-allowed resize-none
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
      />
    </div>
  );
};

export default MemoryContent;
