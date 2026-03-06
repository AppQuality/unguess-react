import { useEffect } from 'react';
import { useModule } from 'src/features/modules/useModule';

const Personas = () => {
  const { value, setOutput } = useModule('personas');

  const isHiddenVariant = value?.variant === 'hidden';

  useEffect(() => {
    if (isHiddenVariant && !value?.output) {
      setOutput([]);
    }
  }, [isHiddenVariant]);

  if (isHiddenVariant) {
    return null; // No UI for hidden variant
  }

  return <div>Personas Module - Default Variant</div>;
};

export default Personas;
