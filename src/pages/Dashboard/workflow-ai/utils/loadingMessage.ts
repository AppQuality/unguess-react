export const LOADING_MESSAGES = [
  'Coordinating',
  'Negotiating',
  'Syncing',
  'Delegating',
  'Orchestrating',
  'Collaborating',
  'Assigning',
  'Scheduling',
  'Aggregating',
  'Routing',
  'Distributing',
  'Polling',
  'Dispatching',
  'Merging',
  'Integrating',
  'Balancing',
  'Monitoring',
  'Resolving',
  'Communicating',
  'Consensus',
];

export function getRandomLoadingMessage() {
  return LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
}
