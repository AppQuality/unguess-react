import { useModule } from 'src/features/modules/useModule';

const OutOfScope = () => {
  const { value, setOutput, remove } = useModule('title');

  return <>Module OutOfScope not implemented yet</>;
};

export default OutOfScope;
