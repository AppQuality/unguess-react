import {
  Button,
  Textarea,
  FormField,
  Label,
  Message,
  Input,
} from '@appquality/unguess-design-system';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostServicesApiKUsecasesMutation } from 'src/features/api';

export const CreateTaskListsWithAI = () => {
  const { planId } = useParams();
  const MIN_LENGTH = 1;
  const [userPrompt, setUserPrompt] = useState('');
  const [taskCount, setTaskCount] = useState(3);
  const [isCreating, setIsCreating] = useState(false);
  const [postServicesApiKUsecases, { data, error }] =
    usePostServicesApiKUsecasesMutation();
  const isButtonDisabled = useMemo(
    () => userPrompt.length < MIN_LENGTH || isCreating,
    [userPrompt, isCreating]
  );

  // planid dalla url
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

  useEffect(() => {
    if (data?.jobId) {
      console.log('Job ID received:', data.jobId);
      // polling logic to check job status
    }
  }, [data?.jobId]);

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
        <Button disabled={isButtonDisabled} onClick={handleClick}>
          {isCreating ? 'Creating...' : 'Create Task Lists with AI'}
        </Button>
        {error && (
          <Message validation="error">Error submitting task list</Message>
        )}
      </FormField>
    </div>
  );
};
