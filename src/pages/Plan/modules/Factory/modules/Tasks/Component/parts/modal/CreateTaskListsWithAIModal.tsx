import {
  AccordionNew,
  Button,
  FormField,
  FooterItem,
  Input,
  Label,
  LG,
  Message,
  Modal,
  ModalClose,
  Textarea,
} from '@appquality/unguess-design-system';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import {
  useGetServicesApiKJobsByJobIdQuery,
  usePostServicesApiKUsecasesMutation,
} from 'src/features/api';
import { processItemOutput } from '../processItemOutput';

// constants
const MODULES_TO_PROMPT = [
  'title',
  'goal',
  'out_of_scope',
  'tasks',
  'language',
  'touchpoints',
];
const MAX_PROMPT_LENGTH = 102300;

const CreateTaskListsWithAIModal = ({ onQuit }: { onQuit: () => void }) => {
  const { planId } = useParams();
  const MIN_LENGTH = 1;
  const [userPrompt, setUserPrompt] = useState('');
  const [taskCount, setTaskCount] = useState(3);
  const [isCreating, setIsCreating] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(0);

  const { records } = useAppSelector((state) => state.planModules);

  // API hooks
  const [postServicesApiKUsecases, { data: jobData, error: postError }] =
    usePostServicesApiKUsecasesMutation();
  const { data: useCasesData, error: useCasesError } =
    useGetServicesApiKJobsByJobIdQuery(
      { jobId: jobData?.jobId || '' },
      {
        skip: !jobData?.jobId,
        pollingInterval, // number in ms or 0 for no polling
      }
    );

  // Form inputs and button are disabled while creating the task lists or while polling for results
  const isFormDisabled = useMemo(
    () => isCreating || pollingInterval > 0,
    [isCreating, pollingInterval]
  );

  // Button is disabled if form is disabled or if user prompt is too short
  const isButtonDisabled = useMemo(
    () => userPrompt.length < MIN_LENGTH || isFormDisabled,
    [userPrompt, isFormDisabled]
  );

  const handleClick = async () => {
    setIsCreating(true);
    // gather modules info to prepend to the user prompt
    const modulesInfo = Object.entries(records)
      .filter(([key]) => MODULES_TO_PROMPT.includes(key))
      .map(
        ([key, item]) =>
          `Module: ${key}, Config: ${JSON.stringify(processItemOutput(item))}`
      )
      .join('\n');
    const fullPrompt = `User prompt:\n${userPrompt}\nModules info:\n${modulesInfo}`;

    await postServicesApiKUsecases({
      body: {
        planId: planId || '',
        count: taskCount,
        requirements: fullPrompt.slice(0, MAX_PROMPT_LENGTH),
      },
    });
    setIsCreating(false);
  };

  // Polling for job status every 5 seconds when jobId becomes available or changes
  useEffect(() => {
    if (jobData?.jobId) {
      setPollingInterval(5000);
    }
  }, [jobData?.jobId]);

  // Stop polling when job is completed
  useEffect(() => {
    if (useCasesData?.status === 'completed' && useCasesData?.result) {
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
    <Modal role="dialog" onClose={onQuit}>
      <Modal.Header>Create Task Lists with AI</Modal.Header>
      <Modal.Body>
        <div style={{ marginBottom: appTheme.space.md }}>
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
            <Label htmlFor="task-list-count">
              Number of task lists to create:
            </Label>
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
          {postError && (
            <Message validation="error">Error submitting task list</Message>
          )}
          {useCasesError && (
            <Message validation="error">
              Error fetching task list results
            </Message>
          )}
        </div>
        {useCasesData?.result && (
          <div>
            <LG style={{ marginBottom: appTheme.space.sm }}>
              Generated Task Lists:
            </LG>
            {useCasesData.result.useCases.map((useCase: any) => (
              <AccordionNew level={3} id={useCase.id} key={useCase.id}>
                <AccordionNew.Section>
                  <AccordionNew.Header icon="🤖">
                    <AccordionNew.Label label={`[title] ${useCase.title}`} />
                  </AccordionNew.Header>
                  <AccordionNew.Panel>
                    <Textarea
                      isResizable
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
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button
            disabled={isButtonDisabled}
            onClick={handleClick}
            isPrimary
            isAccent
          >
            {isCreating || pollingInterval > 0
              ? 'Creating...'
              : 'Create Task Lists with AI'}
          </Button>
        </FooterItem>
        <FooterItem>
          <Button isBasic onClick={onQuit}>
            Close
          </Button>
        </FooterItem>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};

export { CreateTaskListsWithAIModal };
