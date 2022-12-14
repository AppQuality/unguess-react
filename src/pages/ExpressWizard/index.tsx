import {
  Col,
  ContainerCard,
  Message,
  ModalFullScreen,
  Row,
  Stepper,
} from '@appquality/unguess-design-system';
import { theme as globalTheme } from 'src/app/theme';
import {
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
  setNestedObjectValues,
} from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import {
  closeDrawer,
  closeWizard,
  resetWizard,
  setExpressProject,
} from 'src/features/express/expressSlice';
import * as Yup from 'yup';
import styled from 'styled-components';
import {
  Project,
  Campaign,
  usePostCampaignsMutation,
  usePostProjectsMutation,
} from 'src/features/api';
import {
  BASE_DATE_FORMAT,
  ZAPIER_WEBHOOK_TRIGGER,
  EXPRESS_4_CAMPAIGN_TYPE_ID,
  EXPRESS_3_CAMPAIGN_TYPE_ID,
  EXPRESS_2_CAMPAIGN_TYPE_ID,
  EXPRESS_1_CAMPAIGN_TYPE_ID,
} from 'src/constants';
import { format } from 'date-fns';
import {
  createCrons,
  createPages,
  createTasks,
  createUseCases,
} from 'src/common/campaigns';
import { toggleChat } from 'src/common/utils';
import i18n from 'src/i18n';
import { extractStrapiData } from 'src/common/getStrapiData';
import { useGeti18nExpressTypesByIdQuery } from 'src/features/backoffice/strapi';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import HttpError from 'src/common/HttpError';
import { ThankYouStep } from './steps/thankYou';
import { WizardHeader } from './wizardHeader';
import { WizardModel } from './wizardModel';
import defaultValues from './wizardInitialValues';
import { reasonItems } from './steps/express-1/what';
import { getPlatform } from './getPlatform';
import { StepItem, useExpressStep } from './steps/useSteps';

const StyledContainer = styled(ContainerCard)`
  position: sticky;
  top: 0;
  padding: ${({ theme }) => theme.space.xxl};
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0;
  }
`;

const StyledFooterItem = styled(ModalFullScreen.FooterItem)`
  align-items: center;
`;

const StyledModalContent = styled.div`
  margin: 0 auto;
`;

const ModalFooter = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
`;

const StyledModalNav = styled.div`
  margin-left: 0;
  margin-right: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.xxl}) {
    width: ${({ theme }) => theme.breakpoints.xxl};
    margin: 0 auto;
  }
`;

const StyledModal = styled(ModalFullScreen)`
  background-color: ${({ theme }) => theme.palette.grey[100]};

  ${StyledModalContent}, ${StyledModalNav} {
    max-width: ${({ theme }) => theme.breakpoints.xxl};
  }
`;

const getValidationSchema = (step: number, steps: StepItem[]) => {
  if (step in steps) {
    return steps[step as number].validationSchema;
  }
  return Yup.object();
};

const getExpressCPTypeId = (expressSlug: string) => {
  switch (expressSlug) {
    case 'ux-tagging':
      return EXPRESS_4_CAMPAIGN_TYPE_ID;
    case 'unmoderated-usability-testing':
      return EXPRESS_3_CAMPAIGN_TYPE_ID;
    case 'bug-hunting':
      return EXPRESS_2_CAMPAIGN_TYPE_ID;
    default: // exploratory-test
      return EXPRESS_1_CAMPAIGN_TYPE_ID;
  }
};

export const ExpressWizardContainer = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const formRef = useRef<FormikProps<{}>>(null);
  const [stepperTitle, setStepperTitle] = useState('');
  const { userData } = useAppSelector((state) => state.user);
  const { project } = useAppSelector((state) => state.express);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const {
    isWizardOpen,
    steps: draftSteps,
    expressTypeId,
  } = useAppSelector((state) => state.express);
  const sendGTMEvent = useSendGTMevent();

  // TODO: show an alert if isError is set
  const { data } = useGeti18nExpressTypesByIdQuery({
    id: expressTypeId.toString(),
    locale: i18n.language,
    populate: {
      express: {
        populate: '*',
      },
    },
  });

  const expressTypeData = extractStrapiData(data);
  const expressTypeMeta = extractStrapiData(expressTypeData.express);

  const [formValues, setFormValues] = useState<WizardModel>(defaultValues);
  const [activeStep, setStep] = useState<number>(0);
  const [isThankyou, setThankyou] = useState<boolean>(false);
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

  const steps: Array<StepItem> = useExpressStep(expressTypeMeta.slug);

  const onNext = () => {
    if (activeStep === steps.length - 1) {
      setThankyou(true);
    } else if (formRef.current) {
      formRef.current?.validateForm().then((errors) => {
        if (formRef.current?.isValid) {
          setStep(activeStep + 1);
        } else {
          // We want to touch all the fields to show the error
          formRef.current?.setTouched(setNestedObjectValues(errors, true));
        }
      });
    }
  };

  const onBack = () => {
    if (activeStep > 0) {
      setStep(activeStep - 1);
    }
  };

  useEffect(() => {
    setStepperTitle(
      t('__EXPRESS_WIZARD_STEPPER_ACCORDION_TITLE_MOBILE')
        .replace('{current_step}', (activeStep + 1).toString())
        .replace('{total_steps}', steps.length.toString())
    );
  }, [activeStep]);

  // Form actions
  const handleSubmit = async (
    values: WizardModel,
    { setSubmitting, setStatus }: FormikHelpers<WizardModel>
  ) => {
    // Save submitted form values
    setFormValues(values);

    const projectHandle = async () => {
      // Create project if it doesn't exist
      if (
        project &&
        project.id === -1 &&
        activeWorkspace &&
        activeWorkspace.id
      ) {
        const prj = await createProject({
          body: {
            name: project.name,
            customer_id: activeWorkspace.id,
          },
        }).unwrap();

        if (prj) dispatch(setExpressProject(prj));

        return prj;
      }

      return project;
    };

    const campaignHandle = async (prj: Project) => {
      const fallBackDate = format(new Date(), BASE_DATE_FORMAT);
      // Create the campaign
      const cp = await createCampaign({
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
          campaign_type_id: getExpressCPTypeId(expressTypeMeta.slug),
          project_id: prj?.id || -1,
          pm_id: activeWorkspace?.csm.id || -1,
          platforms: getPlatform(values),
          customer_id: activeWorkspace?.id || -1,

          express_slug: expressTypeMeta.slug,
          has_bug_form: values.has_bug_form ? 1 : 0,
          has_bug_parade: values.has_bug_parade ? 1 : 0,
          ...(values.use_cases && { use_cases: values.use_cases }),
        },
      }).unwrap();

      return cp;
    };

    const zapierHandle = async (cp: Campaign) => {
      // Post on webhook Zapier axios call
      const res = await fetch(
        expressTypeData.webhook_url ?? ZAPIER_WEBHOOK_TRIGGER,
        {
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
              ...(values.campaign_date && {
                start_date: format(values.campaign_date, BASE_DATE_FORMAT),
              }),
              ...(values.campaign_date_end && {
                end_date: format(values.campaign_date_end, BASE_DATE_FORMAT),
              }),
              ...(values.campaign_date_end && {
                close_date: format(values.campaign_date_end, BASE_DATE_FORMAT),
              }),
              ...(values.campaign_reason && {
                reason: reasonItems[values.campaign_reason],
              }),
            },
            user: userData,
            workspace: activeWorkspace,
          }),
        }
      );
    };

    const wordpressHandle = async (cp: Campaign) => {
      // Post on webhook WordPress axios call
      try {
        if (!values.use_cases) {
          await createUseCases(cp.id);
        }

        await createPages(cp.id);
        await createCrons(cp.id);
        await createTasks(cp.id);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Something went wrong with wp', e);
      }
    };

    try {
      const prj = await projectHandle();

      if (prj) {
        const cp = await campaignHandle(prj);
        if (cp) {
          await zapierHandle(cp);
          await wordpressHandle(cp);
          onNext();
        } else {
          throw Error('Something went wrong with campaign');
        }
      } else {
        throw Error('Something went wrong with project');
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Submission error:', e);

      setSubmitting(false);

      // TODO: Show error message modal
      setStatus({ submitError: true });

      // Send error to GTM
      sendGTMEvent({
        event: 'generic_error',
        content: JSON.stringify(e),
      });
    }
  };

  const closeExpressWizard = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t('__EXPRESS_WIZARD_CONFIRM_CLOSE_MESSAGE'))) {
      dispatch(closeDrawer());
      dispatch(closeWizard());
      dispatch(resetWizard());
      setStep(0);
      setThankyou(false);
      if (formRef.current) {
        formRef.current?.resetForm();
      }
      toggleChat(true);
    }
  };

  return isWizardOpen ? (
    <StyledModal onClose={closeExpressWizard} focusOnMount={false}>
      {!isThankyou ? (
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={getValidationSchema(activeStep, steps)}
        >
          {(formProps: FormikProps<WizardModel>) => (
            <>
              <StyledModal.Header
                style={{ backgroundColor: globalTheme.palette.white }}
              >
                <WizardHeader {...formProps} onClose={closeExpressWizard} />
                <StyledModal.Close
                  id="express-wizard-close-button"
                  aria-label="Close modal"
                />
              </StyledModal.Header>
              <ModalFullScreen.Body>
                <StyledModalContent>
                  <Form onSubmit={formProps.handleSubmit}>
                    <Row>
                      <Col xs={12} lg={3}>
                        <StyledContainer>
                          <Stepper
                            activeIndex={activeStep}
                            accordionTitle={stepperTitle}
                          >
                            {steps.map((item) => (
                              <Stepper.Step key={item.label}>
                                <Stepper.Label>{item.label}</Stepper.Label>
                                <Stepper.Content>
                                  {item.content}
                                </Stepper.Content>
                              </Stepper.Step>
                            ))}
                          </Stepper>
                        </StyledContainer>
                      </Col>
                      <Col xs={12} lg={9} xl={7}>
                        {steps[activeStep as number].form(formProps)}
                      </Col>
                    </Row>
                  </Form>
                </StyledModalContent>
              </ModalFullScreen.Body>
              <ModalFooter>
                <StyledModalNav style={{ position: 'relative' }}>
                  <Row>
                    <Col
                      xs={12}
                      lg={9}
                      xl={7}
                      offsetLg={3}
                      style={{ marginBottom: 0 }}
                    >
                      <ModalFullScreen.Footer>
                        <StyledFooterItem>
                          {formProps.status && formProps.status.submitError && (
                            <Message validation="error">
                              {t('__EXPRESS_WIZARD_SUBMIT_ERROR')}
                            </Message>
                          )}
                        </StyledFooterItem>
                        <StyledFooterItem>
                          {steps[activeStep as number].buttons({
                            formikArgs: formProps,
                            onBackClick: onBack,
                            onNextClick: onNext,
                          })}
                        </StyledFooterItem>
                      </ModalFullScreen.Footer>
                    </Col>
                  </Row>
                </StyledModalNav>
              </ModalFooter>
            </>
          )}
        </Formik>
      ) : (
        <ThankYouStep values={formValues} />
      )}
    </StyledModal>
  ) : null;
};
