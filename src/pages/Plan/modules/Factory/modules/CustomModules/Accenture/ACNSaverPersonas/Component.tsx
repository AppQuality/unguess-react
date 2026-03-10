import { useEffect } from 'react';
import { useModule } from 'src/features/modules/useModule';

const ACNSaverPersonas = () => {
  const { value, setOutput } = useModule('acn_saver_personas');

  const isHiddenVariant = value?.variant === 'hidden';

  useEffect(() => {
    if (isHiddenVariant) {
      setOutput([]);
    }
  }, [isHiddenVariant]);

  if (isHiddenVariant) {
    return null; // No UI for hidden variant
  }

  return <div>Personas Module - Default Variant</div>;
};

export default ACNSaverPersonas;
