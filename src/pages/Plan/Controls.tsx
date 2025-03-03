import { Button } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { useSave } from 'src/features/modules/useSave';
import { FormProvider } from 'src/features/modules/FormProvider';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';

export const Controls = () => {
  const { isSubmitting, submitForm, setPlanStatus, getPlanStatus } = useSave();
  const { planId } = useParams();
  const { activeWorkspace } = useActiveWorkspace();
  const handleQuoteRequest = async () => {
    // save an updated version of the plan

    console.log('submitting');
    await submitForm();
    console.log('submitted');
    // if the save is successful, change the status of the plan
    fetch(`/api/workspaces/${activeWorkspace?.id}/plans/${planId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'pending_review' }),
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        // update the status in the state
        setPlanStatus(data.status);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Button
        type="submit"
        disabled={isSubmitting || getPlanStatus() !== 'draft'}
      >
        Save
      </Button>
      <Button
        type="button"
        disabled={isSubmitting || getPlanStatus() === 'pending_review'}
        onClick={handleQuoteRequest}
      >
        Request quotation
      </Button>
      <FormProvider.Debugger />
    </>
  );
};
