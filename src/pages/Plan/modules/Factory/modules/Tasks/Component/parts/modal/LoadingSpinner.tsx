import { Paragraph, Spinner } from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { styled } from 'styled-components';

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  background-color: ${({ theme }) => theme.palette.white};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${appTheme.space.md};
  font-size: ${appTheme.fontSizes.md};
  padding: 0 ${appTheme.space.lg};
`;

const TasksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${appTheme.space.xxs};
`;

const TaskItem = styled.li<{ $isActive: boolean; $isCompleted: boolean }>`
position: relative;
  padding-left: ${appTheme.space.lg};
  opacity: ${({ $isActive, $isCompleted }) => ($isActive || $isCompleted ? 1 : 0.5)};
  ${({ $isActive, $isCompleted }) =>
    !$isActive && !$isCompleted ? `animation: pulse 1.5s ease-in-out infinite;` : ''}
  transition: opacity 0.3s ease-in-out;

  &::before {
    content: '○';
    position: absolute;
    left: 0;
    ${({ $isActive, $isCompleted }) =>
      !$isActive && !$isCompleted
        ? `animation: pulse 1.5s ease-in-out infinite;`
        : ''}
  }

  ${({ $isCompleted }) =>
    $isCompleted &&
    `
    &::before {
      content: '✓';
      font-weight: bold;
      animation: checkmark .4s ease-in-out;
    }
  `}

  @keyframes checkmark {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.8;
    }
  }
`;

const PHASES = {
  GATHERING: { start: 0, end: 5000 },
  PROCESSING: { start: 5000, end: 30000 },
  FINALIZING: { start: 30000, end: Infinity },
};

const LoadingSpinner = () => {
  const { t } = useTranslation();
  const [elapsedTime, setElapsedTime] = useState(0);

  const PROCESSING_TASKS = {
    1: t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_TASK_COLLECTING_INPUTS'),
    2: t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_TASK_ANALYZING_CONTEXT'),
    3: t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_TASK_IDENTIFYING_AREAS'),
    4: t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_TASK_GENERATING_TASKS'),
  };

  // Calculate which task is active based on elapsed time
  const getActiveTaskIndex = () => {
    const processingDuration = PHASES.PROCESSING.end - PHASES.PROCESSING.start;
    const timeInProcessing = elapsedTime - PHASES.PROCESSING.start;
    if (timeInProcessing < 0) return -1;
    return Math.floor((timeInProcessing / processingDuration) * Object.keys(PROCESSING_TASKS).length);
  };

  const activeTaskIndex = getActiveTaskIndex();

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getLoadingContent = () => {
    if (elapsedTime < PHASES.GATHERING.end) {
      return (
        <Paragraph>
          {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_GATHERING')}
        </Paragraph>
      );
    }

    if (elapsedTime >= PHASES.PROCESSING.start && elapsedTime < PHASES.PROCESSING.end) {
      return (
        <TasksList>
          {Object.entries(PROCESSING_TASKS).map(([index, taskLabel], idx) => {
            const isCompleted = idx < activeTaskIndex;
            const isActive = idx === activeTaskIndex;

            return (
              <TaskItem key={taskLabel} $isActive={isActive} $isCompleted={isCompleted}>
                <Paragraph>{taskLabel}</Paragraph>
              </TaskItem>
            );
          })}
        </TasksList>
      );
    }

    return (
      <Paragraph>
        {t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_CREATE_WITH_AI_FINALIZING')}
      </Paragraph>
    );
  };

  return (
    <Loading>
      <Spinner style={{ width: '32px', height: '32px' }} />
      {getLoadingContent()}
    </Loading>
  );
};

export { LoadingSpinner };
