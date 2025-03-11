import { components } from 'src/common/schema';
import { useModuleTasksContext } from '../context';
import { useModuleTasks } from '../hooks';

const useHandleModalItemClick = () => {
  const { add } = useModuleTasks();
  const { setModalRef, scrollRef } = useModuleTasksContext();

  return (k: components['schemas']['OutputModuleTask']['kind']) => {
    const lastIndex = add(k);
    setModalRef(null);
    // TODO: Scroll to `task-${lastIndex}` element
  };
};

export { useHandleModalItemClick };
