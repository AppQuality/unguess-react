import { useFormikContext } from 'formik';
import { Button } from '@appquality/unguess-design-system';
import { ModuleWrapper } from 'src/features/modules/ModuleWrapper';
import { FormBody } from 'src/features/modules/types';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useParams } from 'react-router-dom';
import { usePatchWorkspacesByWidPlansAndPidStatusMutation } from 'src/features/api';

export const Controls = () => {
  const { isSubmitting, submitForm, values, setFieldValue } =
    useFormikContext<FormBody>();
  const { planId } = useParams();
  const { activeWorkspace } = useActiveWorkspace();

  const [requestQuote] = usePatchWorkspacesByWidPlansAndPidStatusMutation();

  const handleQuoteRequest = async () => {
    // save an updated version of the plan

    console.log('submitting');
    await submitForm();
    console.log('submitted');

    requestQuote({
      wid: activeWorkspace?.id.toString() || '',
      pid: planId || '',
      body: {
        status: 'pending_review',
      },
    })
      .unwrap()
      .then((data) => {
        setFieldValue('status', 'pending_review');
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Button
        type="submit"
        disabled={isSubmitting || values.status !== 'draft'}
      >
        Save
      </Button>
      <Button
        type="button"
        disabled={isSubmitting || values.status === 'pending_review'}
        onClick={handleQuoteRequest}
      >
        Request quotation
      </Button>
      <ModuleWrapper.Debugger />
    </>
  );
};
