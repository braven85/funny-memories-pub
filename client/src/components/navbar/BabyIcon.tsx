import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useSidebar from '../../hooks/useSidebar';
import { toast } from 'react-toastify';

interface BabyIconProps {
  name: string;
  icon: string;
  selected: boolean;
}

const BabyIcon: React.FC<BabyIconProps> = ({ name, icon, selected }) => {
  const navigate = useNavigate();
  const sidebar = useSidebar();

  const handleClick = useCallback(() => {
    navigate(`/${name}`);
    if (sidebar.isOpen) sidebar.onClose();
    if (name === '') toast.success("You're watching all children's memories");
    if (name === 'chris') toast.success("You're watching Chris's memories");
    if (name === 'stewie') toast.success("You're watching Stewie's memories");
    if (name === 'meg') toast.success("You're watching Meg's memories");
  }, [name, navigate, sidebar]);

  return (
    <div
      onClick={handleClick}
      className={`min-w-[4rem] max-w-[4rem] min-h-[4rem] max-h-[4rem]
                  md:min-w-[3rem] md:max-w-[3rem] md:min-h-[3rem] md:max-h-[3rem]
                  lg:min-w-[4rem] lg:max-w-[4rem] lg:min-h-[4rem] lg:max-h-[4rem]
                  hover:shadow-sm hover:shadow-fm2-gradient-middle rounded-lg cursor-pointer hover:scale-125
      ${
        selected
          ? 'scale-125 bg-fm2-gradient-middle md:bg-gradient-to-t from-fm2-gradient-middle to-fm2-gradient-end to-30%'
          : ''
      }
      `}
    >
      <img src={icon} alt={name} />
    </div>
  );
};

export default BabyIcon;
