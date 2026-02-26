import { UIMessage } from 'ai';
import { WorkflowDataPart } from '@mastra/ai-sdk';

export const parseMessages = (messages: UIMessage[]) => {
  const lastUserMessage = messages
    .findLast((m) => m.role === 'user')
    ?.parts.find((p) => p.type === 'text')?.text;

  // identify the most recent workflow interaction by scanning all message parts
  // for a "data-workflow" type.
  const lastWorkflowPart = messages
    .flatMap((m) => m.parts)
    .findLast((p): p is WorkflowDataPart => p.type === 'data-workflow');

  const stepsObj = lastWorkflowPart?.data.steps || {};
  const blockingSteps = Object.entries(stepsObj).filter(
    ([, step]) => step.status !== 'success'
  );

  // Considerando gli step innestato come "step1.substepA", "step1.substepB", prendiamo lo step più profondo
  const [, lastUncopletedStep] =
    blockingSteps.sort(
      (a, b) => b[0].split('.').length - a[0].split('.').length
    )[0] || [];

  const [, lastStep] =
    Object.entries(stepsObj).sort(
      (a, b) => b[0].split('.').length - a[0].split('.').length
    )[0] || [];

  // console.log('--- DEBUG parseMessages ---');
  // console.log('🚀🚀 ~ parseMessages ~ lastStep:', {
  //   lastStepKey,
  //   lastUncompletedStepKey,
  // });
  // console.dir(messages);
  // console.log('--- END DEBUG parseMessages ---');

  // Set the active run id:
  // - If the workflow finished successfully, clear the run id (set to undefined) so a new workflow can start.
  // - Otherwise, keep the run id of the last workflow part to allow resuming or tracking the current workflow.
  const activeRunId =
    lastWorkflowPart?.data?.status === 'success'
      ? undefined
      : lastWorkflowPart?.id;

  return {
    lastStep: lastUncopletedStep ?? lastStep,
    lastUserMessage,
    activeRunId,
  };
};
