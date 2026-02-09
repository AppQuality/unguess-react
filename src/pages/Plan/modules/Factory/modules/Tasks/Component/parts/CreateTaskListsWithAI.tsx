import { useState } from 'react';
import { Button, Textarea } from '@appquality/unguess-design-system';

export const CreateTaskListsWithAI = () => {
  const MIN_LENGTH = 1;
  const [userPrompt, setUserPrompt] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const isButtonDisabled = userPrompt.length < MIN_LENGTH;

  // planid dalla url
  const handleClick = () => {
    console.log('Button clicked', userPrompt);
    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      alert('Task lists created with AI!');
    }, 4000);
  };

  return (
    <div>
      <Textarea
        minLength={MIN_LENGTH}
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
