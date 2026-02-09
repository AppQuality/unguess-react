import {
  Button,
  Textarea,
  FormField,
  Label,
  Message,
} from '@appquality/unguess-design-system';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostServicesApiKUsecasesMutation } from 'src/features/api';

export const CreateTaskListsWithAI = () => {
  const { planId } = useParams();
  const [jobId, setJobId] = useState<string | null>(null);
  const MIN_LENGTH = 1;
  const [userPrompt, setUserPrompt] = useState('');
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
        count: 3,
        requirements: userPrompt,
      },
    });
    setIsCreating(false);
  };

  useEffect(() => {
    if (jobId) {
      console.log('Job ID received:', jobId);
      // polling logic to check job status
    }
  }, [jobId]);

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
