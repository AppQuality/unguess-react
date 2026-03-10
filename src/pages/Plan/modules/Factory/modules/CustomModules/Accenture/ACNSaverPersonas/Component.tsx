import { useModule } from 'src/features/modules/useModule';

const ACNSaverPersonas = () => {
  const { value } = useModule('acn_saver_personas');

  if (value?.variant === 'hidden') {
    return null;
  }

  return <div>Personas Module - Default Variant</div>;
};

export default ACNSaverPersonas;
