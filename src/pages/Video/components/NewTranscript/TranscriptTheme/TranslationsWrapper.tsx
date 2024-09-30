import { ReactNode } from 'react';

const Component = ({
  content,
  translations,
}: {
  content: ReactNode;
  translations: ReactNode;
}) => (
  <div style={{ display: 'flex', gap: '20px' }}>
    <div>{content}</div>
    <div>{translations}</div>
  </div>
);

export default Component;
