import { Button, Textarea } from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const CreateTaskListsWithAI = () => {
  const { planId } = useParams();
  const [jobId, setJobId] = useState<string | null>(null);
  const MIN_LENGTH = 1;
  const [userPrompt, setUserPrompt] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const isButtonDisabled = userPrompt.length < MIN_LENGTH;

  // planid dalla url
  const handleClick = () => {
    setIsCreating(true);
    console.log('Button clicked', userPrompt);
    const body = {
      planId: planId,
      count: 3,
      requirements: userPrompt,
    };

    // Simulate API call
    setTimeout(() => {
      setJobId('fake-job-id-123');
      console.log('Task lists submitted');
      console.log('Request body:', body);
    }, 4000);
  };

  useEffect(() => {
    if (jobId) {
      console.log('Job ID received:', jobId);
      // polling logic to check job status
    }
  }, [jobId]);

  return (
    <div>
      <Textarea
        minLength={MIN_LENGTH}
        maxLength={102300}
        placeholder="Enter your task list here..."
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.currentTarget.value)}
      />
      <Button disabled={isButtonDisabled || isCreating} onClick={handleClick}>
        {isCreating ? 'Creating...' : 'Create Task Lists with AI'}
      </Button>
    </div>
  );
};
