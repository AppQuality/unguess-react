import { FormikProps } from 'formik';
import { AnimatedContainer } from 'src/common/components/animatedContainer';
import { UseCase } from 'src/pages/ExpressWizard/fields/how';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { UseCaseEditor } from './useCaseDetailsEditor';
import { UseCaseLink } from './useCaseDetailsLink';
import { UseCaseTitle } from './useCaseDetailsTitle';

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
