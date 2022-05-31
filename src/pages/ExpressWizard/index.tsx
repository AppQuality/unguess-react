import {
  Col,
  ContainerCard,
  ModalFullScreen,
  Row,
  Stepper,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { closeWizard, resetWizard } from 'src/features/express/expressSlice';
import * as Yup from 'yup';
import styled from 'styled-components';
import {
  Project,
  Campaign,
  usePostCampaignsMutation,
  usePostProjectsMutation,
} from 'src/features/api';
import {
  EXPRESS_CAMPAIGN_TYPE_ID,
  BASE_DATE_FORMAT,
  ZAPIER_WEBHOOK_TRIGGER,
} from 'src/constants';
import format from 'date-fns/format';
import async from 'async';
import { createCrons, createPages, createTasks } from 'src/common/campaigns';
import { toggleChat } from 'src/common/utils';
import {
  WhatStepValidationSchema,
  WhereStepValidationSchema,
  WhoStepValidationSchema,
  WhenStepValidationSchema,
  ConfirmationValidationSchema,
  ThankYouStep,
} from './steps';
import { WizardHeader } from './wizardHeader';
import { WizardModel } from './wizardModel';
import defaultValues from './wizardInitialValues';
import { reasonItems } from './steps/what';
import { getPlatform } from './getPlatform';
import { WhatForm, WhatFormButtons } from './steps/forms/WhatForm';
import { WizardButtonsProps } from './steps/forms/types';
import { WhereForm, WhereFormButtons } from './steps/forms/WhereForm';
import { WhoForm, WhoFormButtons } from './steps/forms/WhoForm';
import { WhenForm, WhenFormButtons } from './steps/forms/WhenForm';
import {
  ConfirmationForm,
  ConfirmationFormButtons,
} from './steps/forms/ConfirmationForm';

interface StepItem {
  label: string;
  content: string;
  form: (props: FormikProps<WizardModel>) => JSX.Element;
  validationSchema: Yup.ObjectSchema<any>;
  buttons: (props: WizardButtonsProps) => JSX.Element;
}

const StyledContainer = styled(ContainerCard)`
  position: sticky;
  top: 0;
  padding-right: ${({ theme }) => theme.space.sm};
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  overflow-y: auto;
`;

const getValidationSchema = (step: number, steps: StepItem[]) => {
  if (step in steps) {
    return steps[step as number].validationSchema;
  }
  return Yup.object();
};

export const ExpressWizardContainer = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const formRef = useRef<FormikProps<{}>>(null);
  const { userData } = useAppSelector((state) => state.user);
  const { project } = useAppSelector((state) => state.express);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { isWizardOpen, steps: draftSteps } = useAppSelector(
    (state) => state.express
  );

  const [activeStep, setStep] = useState(4);
  const [isThankyou, setThankyou] = useState(false);
  const [createCampaign] = usePostCampaignsMutation();
  const [createProject] = usePostProjectsMutation();

  // Reduce draftSteps to array of data
  const draft: WizardModel = Object.values(draftSteps).reduce(
    (filtered: {}, step) => ({
      ...filtered,
      ...step.data,
    }),
    {}
  );

  const initialValues = {
    ...defaultValues,
    ...draft,
  };

  const steps: Array<StepItem> = [
    {
      label: t('__EXPRESS_WIZARD_STEP_WHAT_LABEL'),
      content: t('__EXPRESS_WIZARD_STEP_WHAT_DESCRIPTION'),
      form: WhatForm,
      validationSchema: WhatStepValidationSchema,
      buttons: WhatFormButtons,
    },
    {
      label: t('__EXPRESS_WIZARD_STEP_WHERE_LABEL'),
      content: t('__EXPRESS_WIZARD_STEP_WHERE_DESCRIPTION'),
      form: WhereForm,
      validationSchema: WhereStepValidationSchema,
      buttons: WhereFormButtons,
    },
    {
      label: t('__EXPRESS_WIZARD_STEP_WHO_LABEL'),
      content: t('__EXPRESS_WIZARD_STEP_WHO_DESCRIPTION'),
      form: WhoForm,
      validationSchema: WhoStepValidationSchema,
      buttons: WhoFormButtons,
    },
    {
      label: t('__EXPRESS_WIZARD_STEP_WHEN_LABEL'),
      content: t('__EXPRESS_WIZARD_STEP_WHEN_DESCRIPTION'),
      form: WhenForm,
      validationSchema: WhenStepValidationSchema,
      buttons: WhenFormButtons,
    },
    {
      label: t('__EXPRESS_WIZARD_STEP_CONFIRM_LABEL'),
      content: t('__EXPRESS_WIZARD_STEP_CONFIRM_DESCRIPTION'),
      form: ConfirmationForm,
      validationSchema: ConfirmationValidationSchema,
      buttons: ConfirmationFormButtons,
    },
  ];

  const onNext = () => {
    if (activeStep === steps.length - 1) {
      setThankyou(true);
    } else if (formRef.current) {
      formRef.current?.validateForm().then(() => {
        if (formRef.current?.isValid) {
          setStep(activeStep + 1);
        }
      });
    }
  };

  const onBack = () => {
    if (activeStep > 0) {
      setStep(activeStep - 1);
    }
  };

  // Form actions
  const handleSubmit = async (
    values: WizardModel,
    { setSubmitting }: FormikHelpers<WizardModel>
  ) => {
    const projectHandle = (next: any) => {
      // Create project if it doesn't exist
      if (
        project &&
        project.id === -1 &&
        activeWorkspace &&
        activeWorkspace.id
      ) {
        createProject({
          body: {
            name: project.name,
            customer_id: activeWorkspace.id,
          },
        })
          .unwrap()
          .then((payload) => {
            next(null, payload);
          })
          .catch((error) => next(error));
      } else {
        next(null, project);
      }
    };

    const campaignHandle = (prj: Project, next: any) => {
      const fallBackDate = format(new Date(), BASE_DATE_FORMAT);
      // Create the campaign
      createCampaign({
        body: {
          title: values.campaign_name || 'Express campaign',
          start_date: values.campaign_date
            ? format(values.campaign_date, BASE_DATE_FORMAT)
            : fallBackDate,
          end_date: values.campaign_date_end
            ? format(values.campaign_date_end, BASE_DATE_FORMAT)
            : fallBackDate,
          close_date: values.campaign_date_end
            ? format(values.campaign_date_end, BASE_DATE_FORMAT)
            : fallBackDate,
          customer_title: values.campaign_name,
          campaign_type_id: EXPRESS_CAMPAIGN_TYPE_ID,
          project_id: prj?.id || -1,
          pm_id: activeWorkspace?.csm.id || -1,
          platforms: getPlatform(values),
        },
      })
        .unwrap()
        .then(async (payload) => {
          next(null, payload);
        })
        .catch((error) => next(error));
    };

    // eslint-disable-next-line consistent-return
    const zapierHandle = (cp: Campaign, next: any) => {
      try {
        // Post on webhook Zapier axios call
        fetch(ZAPIER_WEBHOOK_TRIGGER, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            cp: {
              ...values,
              id: cp.id,
              reason: reasonItems[values?.product_type || 'reason-a'],
            },
            user: userData,
            workspace: activeWorkspace,
          }),
        })
          .then((data) => next(null, data))
          .catch((error) => next(error));
      } catch (error) {
        next(error);
      }
    };

    // eslint-disable-next-line consistent-return
    const wordpressHandle = async (cp: Campaign, next: any) => {
      try {
        // Post on webhook WordPress axios call
        await createPages(cp.id);
        await createCrons(cp.id);
        await createTasks(cp.id);
        next(null, cp);
      } catch (error) {
        next(error);
      }
    };

    async.waterfall(
      [projectHandle, campaignHandle, wordpressHandle, zapierHandle],
      (err: any) => {
        if (err) {
          setSubmitting(false);
        } else {
          setSubmitting(false);
        }
        onNext();
      }
    );
  };

  return isWizardOpen ? (
    <ModalFullScreen
      onClose={() => {
        dispatch(closeWizard());
        dispatch(resetWizard());
        setStep(0);
        setThankyou(false);
        toggleChat(true);
      }}
    >
      {!isThankyou ? (
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={getValidationSchema(activeStep, steps)}
        >
          {(formProps) => (
            <>
              <ModalFullScreen.Header>
                <WizardHeader
                  workspace={activeWorkspace}
                  title={t('__EXPRESS_WIZARD_TITLE')}
                />
                <ModalFullScreen.Close aria-label="Close modal" />
              </ModalFullScreen.Header>
              <ModalFullScreen.Body>
                <Form onSubmit={formProps.handleSubmit}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={3} xl={3}>
                      <StyledContainer
                        style={{
                          padding: globalTheme.space.xxl,
                          paddingBottom: globalTheme.space.xl,
                        }}
                      >
                        <Stepper activeIndex={activeStep}>
                          {steps.map((item) => (
                            <Stepper.Step key={item.label}>
                              <Stepper.Label>{item.label}</Stepper.Label>
                              <Stepper.Content>{item.content}</Stepper.Content>
                            </Stepper.Step>
                          ))}
                        </Stepper>
                      </StyledContainer>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={9} xl={6}>
                      <ContainerCard>
                        {steps[activeStep as number].form(formProps)}
                      </ContainerCard>
                    </Col>
                  </Row>
                </Form>
              </ModalFullScreen.Body>
              <Row style={{ marginLeft: 0, marginRight: 0 }}>
                <Col xs={12} sm={12} md={12} lg={9} xl={6} offsetLg={3}>
                  <ModalFullScreen.Footer>
                    <ModalFullScreen.FooterItem>
                      {steps[activeStep as number].buttons({
                        formikArgs: formProps,
                        onBackClick: onBack,
                        onNextClick: onNext,
                      })}
                    </ModalFullScreen.FooterItem>
                  </ModalFullScreen.Footer>
                </Col>
              </Row>
            </>
          )}
        </Formik>
      ) : (
        <ThankYouStep />
      )}
    </ModalFullScreen>
  ) : null;
};