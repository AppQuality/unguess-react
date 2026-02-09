import { Button } from '@appquality/unguess-design-system';

export const CreateTaskListsWithAI = () => {
  // planid dalla url
  const handleClick = () => {
    alert('Task lists created with AI!');
  };

  return (
    <div>
      <Button onClick={handleClick}>Create Task Lists with AI</Button>
    </div>
  );
};
