import {
  Button,
  Textarea,
  FormField,
  Label,
  Message,
  Input,
  AccordionNew,
} from '@appquality/unguess-design-system';
import { is } from 'date-fns/locale';
import { use } from 'i18next';
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
    isFetching: isFetchingUsecases,
    error: useCasesError,
  } = useGetServicesApiKJobsByJobIdQuery(
    { jobId: jobData?.jobId || '' },
    {
      skip: !jobData?.jobId,
      pollingInterval: pollingInterval, // 0 for no polling, 3000 for polling every 3 seconds
    }
  );

  const isFormDisabled = useMemo(
    () => isCreating || pollingInterval > 0,
    [isCreating, pollingInterval]
  );

  const isButtonDisabled = useMemo(
    () => userPrompt.length < MIN_LENGTH || isFormDisabled,
    [userPrompt, isFormDisabled]
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

  // Polling for job status every 5 seconds when jobId becomes available or changes
  useEffect(() => {
    if (jobData?.jobId) {
      console.log('Job ID received:', jobData.jobId);
      setPollingInterval(5000);
    }
  }, [jobData?.jobId]);

  // Stop polling when job is completed
  useEffect(() => {
    if (useCasesData?.status === 'completed' && useCasesData?.result) {
      console.log('Use cases data received:', useCasesData);
      setPollingInterval(0);
    }
  }, [useCasesData]);

  // Stopping polling when there is an error
  useEffect(() => {
    if (useCasesError) {
      setPollingInterval(0);
    }
  }, [useCasesError]);

  return (
    <div>
      <FormField>
        <Label htmlFor="task-list-prompt">
          Describe the tasks you want to create:
        </Label>
        <Textarea
          disabled={isFormDisabled}
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
          disabled={isFormDisabled}
        />
      </FormField>
      <Button disabled={isButtonDisabled} onClick={handleClick}>
        {isButtonDisabled ? 'Creating...' : 'Create Task Lists with AI'}
      </Button>
      {postError && (
        <Message validation="error">Error submitting task list</Message>
      )}
      {useCasesError && (
        <Message validation="error">Error fetching task list results</Message>
      )}
      {useCasesData?.result && (
        <div>
          <h1>Generated Task Lists:</h1>
          <pre>{JSON.stringify(useCasesData.result, null, 2)}</pre>
          {useCasesData.result.useCases.map((useCase: any, index: number) => (
            <AccordionNew level={3} id={useCase.id} key={useCase.id}>
              <AccordionNew.Section>
                <AccordionNew.Header icon="code">
                  <AccordionNew.Label label={`[title] ${useCase.title}`} />
                </AccordionNew.Header>
                <AccordionNew.Panel>
                  <textarea
                    value={`
                    [mainFlow] ${useCase.mainFlow} \n
                    [priority] ${useCase.priority} \n
                    [guidelines] ${useCase.guidelines} \n
                    [description] ${useCase.description} \n
                    [preconditions] ${useCase.preconditions} \n
                    [postconditions] ${useCase.postconditions} \n
                    [relatedSections] ${useCase.relatedSections.join(', ')} \n
                    [alternativeFlows] ${useCase.alternativeFlows} \n
                  `}
                  />
                </AccordionNew.Panel>
              </AccordionNew.Section>
            </AccordionNew>
          ))}
        </div>
      )}
    </div>
  );
};
