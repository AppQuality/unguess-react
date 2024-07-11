export const observations = [
  {
    id: '1',
    title: 'Observation 1',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui.',
  },
  {
    id: '2',
    title: 'Observation 2',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.',
  },
  {
    id: '3',
    title: 'Observation 3',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui.',
  },
];

export type Observation = {
  id: string;
  title: string;
  quote: string;
};
