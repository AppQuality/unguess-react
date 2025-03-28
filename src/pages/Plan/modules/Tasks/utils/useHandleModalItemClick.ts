import { components } from 'src/common/schema';
import { useModuleTasksContext } from '../context';
import { useModuleTasks } from '../hooks';

const useHandleModalItemClick = () => {
  const { add } = useModuleTasks();
  const { setModalRef } = useModuleTasksContext();

  return (k: components['schemas']['OutputModuleTask']['kind']) => {
    add(k);
    setModalRef(null);
  };
};

export { useHandleModalItemClick };
