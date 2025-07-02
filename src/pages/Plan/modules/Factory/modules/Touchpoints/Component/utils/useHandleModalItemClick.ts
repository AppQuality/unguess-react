import { components } from 'src/common/schema';
import { useModuleTouchpointsContext } from '../context';
import { useModuleTouchpoints } from '../hooks';

const useHandleModalItemClick = () => {
  const { add } = useModuleTouchpoints();
  const { setModalRef } = useModuleTouchpointsContext();

  return (
    k: components['schemas']['OutputModuleTouchpoints']['kind'],
    ff: components['schemas']['OutputModuleTouchpoints']['form_factor']
  ) => {
    add(k, ff);
    setModalRef(null);
  };
};

export { useHandleModalItemClick };
