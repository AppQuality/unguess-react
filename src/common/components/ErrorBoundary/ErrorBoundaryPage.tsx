import { useTranslation } from 'react-i18next';
import { Logged } from '../../../features/templates/Logged';
import { Container } from '../../../pages/ExpressWizard/wizardHeader';
import { GoogleTagManager } from '../../GoogleTagManager';

const ErrorBoundaryPage = () => {
  const { t } = useTranslation();

  return (
    <GoogleTagManager title="Error page">
      <Logged route="">
        <Container id="error-container">
          <h1>Sorry.. there was an error</h1>
          <button type="button" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </Container>
      </Logged>
    </GoogleTagManager>
  );
};

export default ErrorBoundaryPage;
