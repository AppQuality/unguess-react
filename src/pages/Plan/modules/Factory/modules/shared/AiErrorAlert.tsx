import { Alert } from '@appquality/unguess-design-system';

export const AiErrorAlert = ({
  title,
  message,
}: {
  title?: string;
  message?: string;
}) => (
  <Alert type="error">
    <Alert.Title>{title}</Alert.Title>
    {message}
  </Alert>
);
