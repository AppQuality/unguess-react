import {
  AccordionNew,
  Button,
  FooterItem,
  FormField,
  Label,
  LG,
  Message,
  Modal,
  ModalClose,
  Spinner,
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

const CreateTaskListsWithAI = ({ onQuit }: { onQuit: () => void }) => {
  const { planId } = useParams();
  const MIN_LENGTH = 1;
  const [userPrompt, setUserPrompt] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(0);
  const [isOpenCloseConfirmation, setIsOpenCloseConfirmation] = useState(false);

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

  const handleCloseClick = () => {
    if (isFormDisabled) {
      setIsOpenCloseConfirmation(true);
    } else {
      onQuit();
    }
  };

  const handleConfirmClose = () => {
    setIsOpenCloseConfirmation(false);
    onQuit();
  };

  const handleCancelClose = () => {
    setIsOpenCloseConfirmation(false);
  };

  const handleModalClose = () => {
    if (isFormDisabled) {
      setIsOpenCloseConfirmation(true);
    } else {
      onQuit();
    }
  };

  const handleStop = () => {
    setIsCreating(false);
    setPollingInterval(0);
  };

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
        count: 5,
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
    <Modal role="dialog" onClose={handleModalClose}>
      <Modal.Header>Create Task Lists with AI</Modal.Header>
      <Modal.Body>
        {isFormDisabled ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
            }}
          >
            <Spinner />
          </div>
        ) : (
          <>
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
                        <AccordionNew.Label
                          label={`[title] ${useCase.title}`}
                        />
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
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button
            disabled={isFormDisabled && !pollingInterval}
            onClick={isFormDisabled ? handleStop : handleClick}
            isPrimary
            isAccent
            isDanger={isFormDisabled}
          >
            {isCreating
              ? 'Creating...'
              : pollingInterval > 0
              ? 'Stop'
              : 'Create Task Lists with AI'}
          </Button>
        </FooterItem>
        <FooterItem>
          <Button isBasic onClick={handleCloseClick}>
            Close
          </Button>
        </FooterItem>
      </Modal.Footer>
      <ModalClose onClick={handleCloseClick} />
      {isOpenCloseConfirmation && (
        <Modal role="dialog" onClose={handleCancelClose}>
          <Modal.Header isDanger>Close Task Creation?</Modal.Header>
          <Modal.Body>
            Are you sure you want to close? The task creation process is still
            in progress and will be cancelled.
          </Modal.Body>
          <Modal.Footer>
            <FooterItem>
              <Button isDanger isBasic onClick={handleConfirmClose}>
                Close Anyway
              </Button>
            </FooterItem>
            <FooterItem>
              <Button isPrimary isAccent onClick={handleCancelClose}>
                Keep Processing
              </Button>
            </FooterItem>
          </Modal.Footer>
          <ModalClose onClick={handleCancelClose} />
        </Modal>
      )}
    </Modal>
  );
};

export { CreateTaskListsWithAI };
