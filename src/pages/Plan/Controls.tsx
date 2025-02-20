import { useFormikContext } from 'formik';
import { Button } from '@appquality/unguess-design-system';
import { ModuleWrapper } from 'src/features/modules/ModuleWrapper';
import { FormBody } from 'src/features/modules/types';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useParams } from 'react-router-dom';

export const Controls = () => {
  const { isSubmitting, submitForm, values, setFieldValue } =
    useFormikContext<FormBody>();
  const { planId } = useParams();
  const { activeWorkspace } = useActiveWorkspace();
  const handleQuoteRequest = async () => {
    // save an updated version of the plan

    await submitForm();
    // if the save is successful, change the status of the plan
    fetch(`/api/workspaces/${activeWorkspace?.id}/plans/${planId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'pending_review' }),
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        // update the status in the state
        setFieldValue('status', data.status);
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
