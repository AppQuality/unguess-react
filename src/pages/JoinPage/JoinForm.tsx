import { useFormikContext } from 'formik';
import { JoinFormValues } from './FormProvider';
import { Step1 } from './Steps/Step1';
import { Step2 } from './Steps/Step2';
import { Step3 } from './Steps/Step3';

export const JoinForm = () => {
  const {
    values: { step },
  } = useFormikContext<JoinFormValues>();
  return (
    <div>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
    </div>
  );
};
