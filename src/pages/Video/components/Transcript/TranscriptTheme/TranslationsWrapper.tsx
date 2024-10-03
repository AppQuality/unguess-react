import { ReactNode } from 'react';

const Component = ({
  content,
  translations,
}: {
  content: ReactNode;
  translations: ReactNode;
}) => (
  <div style={{ display: 'flex', gap: '20px' }}>
    <div style={{ width: '50%' }}>{content}</div>
    <div style={{ width: '50%' }}>{translations}</div>
  </div>
);

export default Component;
