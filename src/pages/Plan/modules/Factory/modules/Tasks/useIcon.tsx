import { ReactComponent as TasksIcon } from 'src/assets/icons/tasks-icon.svg';
import useIconColor from '../../useIconColor';

const useIcon = (withValidation: boolean = true) => {
  const color = useIconColor({
    module_type: 'tasks',
    withValidation,
  });

  return <TasksIcon color={color} />;
};

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
