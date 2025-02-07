import { FormikProps } from 'formik';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { UseCase } from 'src/pages/ExpressWizard/fields/how';
import { AnimatedContainer } from 'src/common/components/animatedContainer';
import { UseCaseTitle } from './useCaseDetailsTitle';
import { UseCaseEditor } from './useCaseDetailsEditor';
import { UseCaseLink } from './useCaseDetailsLink';

export const UseCaseDetails = ({
  formikProps,
  useCase,
  useCaseIndex,
}: {
  formikProps: FormikProps<WizardModel>;
  useCase: UseCase;
  useCaseIndex: number;
}) => (
  <AnimatedContainer>
    <UseCaseTitle
      formikProps={formikProps}
      useCase={useCase}
      useCaseIndex={useCaseIndex}
    />
    <UseCaseEditor
      formikProps={formikProps}
      useCase={useCase}
      useCaseIndex={useCaseIndex}
    />
    <UseCaseLink
      formikProps={formikProps}
      useCase={useCase}
      useCaseIndex={useCaseIndex}
    />
  </AnimatedContainer>
);
