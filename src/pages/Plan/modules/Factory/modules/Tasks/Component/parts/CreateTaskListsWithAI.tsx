import {
  Button,
  Textarea,
  FormField,
  Label,
  Message,
  Input,
} from '@appquality/unguess-design-system';
import { is } from 'date-fns/locale';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetServicesApiKJobsByJobIdQuery,
  usePostServicesApiKUsecasesMutation,
} from 'src/features/api';

export const CreateTaskListsWithAI = () => {
  const { planId } = useParams();
  const MIN_LENGTH = 1;
  const [userPrompt, setUserPrompt] = useState('');
  const [taskCount, setTaskCount] = useState(3);
  const [isCreating, setIsCreating] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(0);
  const [postServicesApiKUsecases, { data: jobData, error: postError }] =
    usePostServicesApiKUsecasesMutation();

  const {
    data: useCasesData,
    isFetching,
    isLoading,
    error: useCasesError,
  } = useGetServicesApiKJobsByJobIdQuery(
    { jobId: jobData?.jobId || '' },
    {
      skip: !jobData?.jobId,
      pollingInterval: pollingInterval,
    }
  );

  const isButtonDisabled = useMemo(
    () =>
      userPrompt.length < MIN_LENGTH || isCreating || isFetching || isLoading,
    [userPrompt, isCreating, isFetching, isLoading]
  );

  const handleClick = async () => {
    setIsCreating(true);
    console.log('Button clicked', userPrompt);
    await postServicesApiKUsecases({
      body: {
        planId: planId || '',
        count: taskCount,
        requirements: userPrompt,
      },
    });
    setIsCreating(false);
  };

  // Polling for job status every 3 seconds when jobId is available
  useEffect(() => {
    if (jobData?.jobId) {
      console.log('Job ID received:', jobData.jobId);
      setPollingInterval(3000);
    }
  }, [jobData?.jobId]);

  // Stop polling when job is completed
  useEffect(() => {
    if (useCasesData?.status === 'completed' && useCasesData?.result) {
      console.log('Use cases data received:', useCasesData);
      setPollingInterval(0);
    }
  }, [useCasesData]);

  return (
    <div>
      <FormField>
        <Label htmlFor="task-list-prompt">
          Describe the tasks you want to create:
        </Label>
        <Textarea
          id="task-list-prompt"
          minLength={MIN_LENGTH}
          maxLength={102300}
          placeholder="Enter your task list here..."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.currentTarget.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="task-list-count">Number of task lists to create:</Label>
        <Input
          id="task-list-count"
          type="number"
          min={1}
          max={5}
          value={taskCount}
          onChange={(e) => setTaskCount(Number(e.currentTarget.value))}
        />
      </FormField>
      <Button disabled={isButtonDisabled} onClick={handleClick}>
        {isCreating ? 'Creating...' : 'Create Task Lists with AI'}
      </Button>
      {postError && (
        <Message validation="error">Error submitting task list</Message>
      )}
      {useCasesError && (
        <Message validation="error">Error fetching task list results</Message>
      )}
    </div>
  );
};
