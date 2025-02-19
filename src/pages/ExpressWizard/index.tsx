import {
  Col,
  ContainerCard,
  Grid,
  Message,
  ModalFullScreen,
  Row,
  Stepper,
} from '@appquality/unguess-design-system';
import { addBusinessDays, format } from 'date-fns';
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
import { appTheme } from 'src/app/theme';
import {
  createCrons,
  createPages,
  createTasks,
  createUseCases,
} from 'src/common/campaigns';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { extractStrapiData } from 'src/common/getStrapiData';
import { toggleChat } from 'src/common/utils';
import {
  BASE_DATE_FORMAT,
  EXPRESS_1_CAMPAIGN_TYPE_ID,
  EXPRESS_2_CAMPAIGN_TYPE_ID,
  EXPRESS_3_CAMPAIGN_TYPE_ID,
  EXPRESS_4_CAMPAIGN_TYPE_ID,
  ZAPIER_WEBHOOK_TRIGGER,
} from 'src/constants';
import {
  Campaign,
  Project,
  usePostCampaignsMutation,
  usePostProjectsMutation,
} from 'src/features/api';
import { useGeti18nExpressTypesByIdQuery } from 'src/features/backoffice/strapi';
import {
  closeDrawer,
  closeWizard,
  resetWizard,
  setExpressProject,
} from 'src/features/express/expressSlice';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import i18n from 'src/i18n';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useNavigate, useNavigationType } from 'react-router-dom';
import { isDev } from 'src/common/isDevEnvironment';
import DiscardChangesModal from './ActionModals/DiscardChangesModal';
import { getPlatform } from './getPlatform';
import {
  mapBrowsers,
  mapLanguages,
  mapProductType,
  mapTesterRequirements,
} from './mapToCampaignFields';
import { reasonItems } from './steps/express-1/what';
import { ThankYouStep } from './steps/thankYou';
import { StepItem, useExpressStep } from './steps/useSteps';
import { WizardHeader } from './wizardHeader';
import defaultValues from './wizardInitialValues';
import { WizardModel } from './wizardModel';

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

const ModalFooter = styled(ModalFullScreen.Footer)`
  background-color: ${({ theme }) => theme.palette.white};
`;

const StyledModal = styled(ModalFullScreen)`
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const ModalHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PullRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 ${({ theme }) => theme.space.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0;
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
  const navigate = useNavigate();
  const [stepperTitle, setStepperTitle] = useState('');
  const { userData } = useAppSelector((state) => state.user);
  const { project } = useAppSelector((state) => state.express);
  const projRoute = useLocalizeRoute(`projects/${project?.id}`);
  const { activeWorkspace } = useActiveWorkspace();
  const navigationType = useNavigationType();
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

  // Form actions
  const handleSubmit = async (
    values: WizardModel,
    { setSubmitting, setStatus }: FormikHelpers<WizardModel>
  ) => {
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
      const fallBackDate = format(
        addBusinessDays(new Date(), 1),
        BASE_DATE_FORMAT
      );
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
          outOfScope: values.outOfScope,
          productLink:
            values.product_type === 'mobileapp'
              ? [values.androidLink, values.iOSLink]
                  .filter((link) => link)
                  .join(',')
              : values.link,
          languages: mapLanguages([values.campaign_language || '']),
          productType: mapProductType(values.product_type || ''),
          browsers: mapBrowsers(values),
          goal: values.test_description,
          testerRequirements: mapTesterRequirements(values),
          targetSize: values.target_size,
        },
      }).unwrap();

      return cp;
    };

    const zapierHandle = async (cp: Campaign) => {
      // Post on webhook Zapier axios call
      await fetch(expressTypeData.webhook_url ?? ZAPIER_WEBHOOK_TRIGGER, {
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
          environment: isDev() ? 'staging' : 'production',
        }),
      });
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
        action: 'express_error',
        event: 'express_navigation',
        category: expressTypeMeta.slug,
      });
    }
  };

  const [showDiscardChangesModal, setShowDiscardChangesModal] = useState(false);
  const closeExpressWizard = () => {
    if (isWizardOpen) {
      if (isThankyou) {
        dispatch(closeDrawer());
        dispatch(closeWizard());
        dispatch(resetWizard());
        setStep(0);
        setThankyou(false);
        navigate(projRoute);
      } else {
        setShowDiscardChangesModal(true);
      }
    }
  };

  useEffect(() => {
    if (navigationType === 'POP') {
      dispatch(closeDrawer());
      dispatch(closeWizard());
      dispatch(resetWizard());
      setStep(0);
      setThankyou(false);
    }
  }, [navigationType]);

  useEffect(() => {
    if (isWizardOpen) {
      setStepperTitle(
        t('__EXPRESS_WIZARD_STEPPER_ACCORDION_TITLE_MOBILE')
          .replace('{current_step}', (activeStep + 1).toString())
          .replace('{total_steps}', steps.length.toString())
      );

      sendGTMEvent({
        event: 'express_navigation',
        category: expressTypeMeta.slug,
        content: `express_step_${activeStep + 1}_of_${steps.length}`,
      });
    }
  }, [isWizardOpen, activeStep]);

  useEffect(() => {
    if (isWizardOpen && isThankyou)
      sendGTMEvent({
        action: 'express_end',
        event: 'express_navigation',
        category: expressTypeMeta.slug,
        content: 'thank_you_page',
      });
  }, [isWizardOpen, isThankyou]);

  return isWizardOpen ? (
    <>
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
                  style={{ backgroundColor: appTheme.palette.white }}
                >
                  <LayoutWrapper>
                    <ModalHeaderContent>
                      <WizardHeader
                        {...formProps}
                        onClose={closeExpressWizard}
                      />
                      <StyledModal.Close
                        id="express-wizard-close-button"
                        aria-label="Close modal"
                      />
                    </ModalHeaderContent>
                  </LayoutWrapper>
                </StyledModal.Header>
                <ModalFullScreen.Body>
                  <LayoutWrapper>
                    <Form onSubmit={formProps.handleSubmit}>
                      <Grid>
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
                      </Grid>
                    </Form>
                  </LayoutWrapper>
                </ModalFullScreen.Body>
                <ModalFooter>
                  <LayoutWrapper>
                    <Grid>
                      <Row>
                        <Col
                          xs={12}
                          lg={9}
                          xl={7}
                          offsetLg={3}
                          style={{ marginBottom: 0 }}
                        >
                          <PullRight>
                            <StyledFooterItem>
                              {formProps.status &&
                                formProps.status.submitError && (
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
                          </PullRight>
                        </Col>
                      </Row>
                    </Grid>
                  </LayoutWrapper>
                </ModalFooter>
              </>
            )}
          </Formik>
        ) : (
          <ThankYouStep setThankyou={setThankyou} setStep={setStep} />
        )}
      </StyledModal>
      {showDiscardChangesModal && (
        <DiscardChangesModal
          handleCancel={() => setShowDiscardChangesModal(false)}
          onClose={() => {
            setShowDiscardChangesModal(false);
            dispatch(closeDrawer());
            dispatch(closeWizard());
            dispatch(resetWizard());
            setStep(0);
            setThankyou(false);
            if (formRef.current) {
              formRef.current?.resetForm();
            }
            toggleChat(true);
            sendGTMEvent({
              action: 'express_close',
              event: 'express_navigation',
              category: expressTypeMeta.slug,
            });
          }}
        />
      )}
    </>
  ) : null;
};
