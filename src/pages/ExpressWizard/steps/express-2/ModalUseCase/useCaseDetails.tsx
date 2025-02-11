import { FormikProps } from 'formik';
import { AnimatedContainer } from 'src/common/components/animatedContainer';
import { UseCase } from 'src/pages/ExpressWizard/fields/how';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { UseCaseEditor } from './useCaseDetailsEditor';
import { UseCaseLink } from './useCaseDetailsLink';
import { UseCaseTitle } from './useCaseDetailsTitle';

export const UseCaseDetails = ({
  useCase,
  useCaseIndex,
}: {
  useCase: UseCase;
  useCaseIndex: number;
}) => (
  <AnimatedContainer>
    <UseCaseTitle useCase={useCase} useCaseIndex={useCaseIndex} />
    <UseCaseEditor useCase={useCase} useCaseIndex={useCaseIndex} />
    <UseCaseLink useCase={useCase} useCaseIndex={useCaseIndex} />
  </AnimatedContainer>
);
