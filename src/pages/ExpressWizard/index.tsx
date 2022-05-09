import {
  Col,
  ContainerCard,
  ModalFullScreen,
  Row,
  Stepper,
  theme,
} from "@appquality/unguess-design-system";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { closeWizard, resetWizard } from "src/features/express/expressSlice";
import {
  WhatStep,
  WhatStepValidationSchema,
  WhereWebStep,
  WhereStepValidationSchema,
  WhereAppStep,
  WhoStep,
  WhoStepValidationSchema,
  WhenStep,
  WhenStepValidationSchema,
  ConfirmationStep,
  ConfirmationValidationSchema,
  ThankYouStep,
} from "./steps";
import { WizardHeader } from "./wizardHeader";
import { WizardModel } from "./wizardModel";
import defaultValues from "./wizardInitialValues";
import { WaterButton } from "./waterButton";
import * as Yup from "yup";
import styled from "styled-components";
import { WizardSubmit } from "./wizardSubmit";
import {
  Project,
  usePostCampaignsMutation,
  usePostProjectsMutation,
} from "src/features/api";
import {
  EXPRESS_CAMPAIGN_TYPE_ID,
  BASE_DATE_FORMAT,
  ZAPIER_WEBHOOK_TRIGGER,
} from "src/constants";
import format from "date-fns/format";

const axios = require("axios").default;

interface StepItem {
  label: string;
  content: string;
  form: (props: FormikProps<WizardModel>) => JSX.Element;
  validationSchema: Yup.ObjectSchema<any>;
  buttons: (props: FormikProps<WizardModel>) => JSX.Element;
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
    return steps[step].validationSchema;
  } else {
    return Yup.object();
  }
};

export const ExpressWizardContainer = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const formRef = useRef<FormikProps<{}>>(null);
  const { project } = useAppSelector((state) => state.express);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { isWizardOpen, steps: draftSteps } = useAppSelector(
    (state) => state.express
  );

  const [createCampaign] = usePostCampaignsMutation();
  const [createProject] = usePostProjectsMutation();

  const [activeStep, setStep] = useState(0);

  //Reduce draftSteps to array of data
  const draft: WizardModel = Object.values(draftSteps).reduce(
    (filtered: {}, step) => {
      return {
        ...filtered,
        ...step.data,
      };
    },
    {}
  );

  const initialValues = {
    ...defaultValues,
    ...draft,
  };

  const onNext = () => {
    formRef.current &&
      formRef.current?.validateForm().then(() => {
        if (formRef.current?.isValid) {
          setStep(activeStep + 1);
        }
      });
  };
  const onBack = () => {
    if (activeStep > 0) {
      setStep(activeStep - 1);
    } else {
      alert("You are on the first step, you can't go back more.");
    }
  };

  //Form actions
  const handleSubmit = async (
    values: WizardModel,
    { setSubmitting }: FormikHelpers<WizardModel>
  ) => {
    //Create project if it doesn't exist
    let customProject: Project;
    if (project && project.id === -1 && activeWorkspace && activeWorkspace.id) {
      await createProject({
        body: {
          name: project.name,
          customer_id: activeWorkspace.id,
        },
      })
        .unwrap()
        .then((payload) => {
          console.log("Project created", payload);
          customProject = payload;
        })
        .catch((error) => console.error("rejected", error));
    }

    const fallBackDate = format(new Date(), BASE_DATE_FORMAT);
    //Create the campaign
    await createCampaign({
      body: {
        title: values.campaign_name || "Express campaign",
        description: "Express campaign created by the user",
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
        test_type_id: 1, //TODO: check if this field is needed
        project_id: customProject ? customProject.id : (project?.id || -1),
        pm_id: activeWorkspace?.csm.id || -1,
      },
    })
      .unwrap()
      .then(async (payload) => {
        console.log("Campaign created", payload);

        //Post on webhook Zapier axios call
        await axios
          .post(ZAPIER_WEBHOOK_TRIGGER, values)
          .then(function (response: any) {
            console.log(response);
            onNext();
            setSubmitting(false);
          })
          .catch(function (error: any) {
            console.log(error);
          });
      })
      .catch((error) => console.error("rejected", error));
  };

  const steps: Array<StepItem> = [
    {
      label: t("__EXPRESS_WIZARD_STEP_WHAT_LABEL"),
      content: t("__EXPRESS_WIZARD_STEP_WHAT_DESCRIPTION"),
      form: (props: FormikProps<WizardModel>) => <WhatStep {...props} />,
      validationSchema: WhatStepValidationSchema,
      buttons: (props: FormikProps<WizardModel>) => (
        <WaterButton isPill isPrimary onClick={onNext}>
          {t("__EXPRESS_WIZARD_NEXT_BUTTON_LABEL")}
        </WaterButton>
      ),
    },
    {
      label: t("__EXPRESS_WIZARD_STEP_WHERE_LABEL"),
      content: t("__EXPRESS_WIZARD_STEP_WHERE_DESCRIPTION"),
      form: (props: FormikProps<WizardModel>) =>
        props.values.product_type === "webapp" ? (
          <WhereWebStep {...props} />
        ) : (
          <WhereAppStep {...props} />
        ),
      validationSchema: WhereStepValidationSchema,
      buttons: (props: FormikProps<WizardModel>) => (
        <>
          <WaterButton isPill isBasic onClick={onBack}>
            {t("__EXPRESS_WIZARD_BACK_BUTTON_LABEL")}
          </WaterButton>
          <WaterButton isPill isPrimary onClick={onNext}>
            {t("__EXPRESS_WIZARD_NEXT_BUTTON_LABEL")}
          </WaterButton>
        </>
      ),
    },
    {
      label: t("__EXPRESS_WIZARD_STEP_WHO_LABEL"),
      content: t("__EXPRESS_WIZARD_STEP_WHO_DESCRIPTION"),
      form: (props: FormikProps<WizardModel>) => <WhoStep {...props} />,
      validationSchema: WhoStepValidationSchema,
      buttons: (props: FormikProps<WizardModel>) => (
        <>
          <WaterButton isPill isBasic onClick={onBack}>
            {t("__EXPRESS_WIZARD_BACK_BUTTON_LABEL")}
          </WaterButton>
          <WaterButton isPill isPrimary onClick={onNext}>
            {t("__EXPRESS_WIZARD_NEXT_BUTTON_LABEL")}
          </WaterButton>
        </>
      ),
    },
    {
      label: t("__EXPRESS_WIZARD_STEP_WHEN_LABEL"),
      content: t("__EXPRESS_WIZARD_STEP_WHEN_DESCRIPTION"),
      form: (props: FormikProps<WizardModel>) => <WhenStep {...props} />,
      validationSchema: WhenStepValidationSchema,
      buttons: (props: FormikProps<WizardModel>) => (
        <>
          <WaterButton isPill isBasic onClick={onBack}>
            {t("__EXPRESS_WIZARD_BACK_BUTTON_LABEL")}
          </WaterButton>
          <WaterButton isPill isPrimary onClick={onNext}>
            {t("__EXPRESS_WIZARD_NEXT_BUTTON_LABEL")}
          </WaterButton>
        </>
      ),
    },
    {
      label: t("__EXPRESS_WIZARD_STEP_CONFIRM_LABEL"),
      content: t("__EXPRESS_WIZARD_STEP_CONFIRM_DESCRIPTION"),
      form: (props: FormikProps<WizardModel>) => (
        <ConfirmationStep {...props} />
      ),
      validationSchema: ConfirmationValidationSchema,
      buttons: (props: FormikProps<WizardModel>) => (
        <>
          <WaterButton isPill isBasic onClick={onBack}>
            {t("__EXPRESS_WIZARD_BACK_BUTTON_LABEL")}
          </WaterButton>
          <WizardSubmit {...props} />
        </>
      ),
    },
  ];

  return isWizardOpen ? (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={getValidationSchema(activeStep, steps)}
    >
      {(formProps) => (
        <ModalFullScreen
          onClose={() => {
            dispatch(closeWizard());
            dispatch(resetWizard());
          }}
        >
          <ModalFullScreen.Header>
            <WizardHeader
              workspace={activeWorkspace}
              title={t("__EXPRESS_WIZARD_TITLE")}
            />
            <ModalFullScreen.Close aria-label="Close modal" />
          </ModalFullScreen.Header>

          <ModalFullScreen.Body>
            <Form onSubmit={formProps.handleSubmit}>
              {activeStep === steps.length ? (
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={6} offsetXl={3}>
                    <ThankYouStep />
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col xs={12} sm={12} md={12} lg={3} xl={3}>
                    <StyledContainer
                      style={{
                        padding: theme.space.xxl,
                        paddingBottom: theme.space.xl,
                      }}
                    >
                      <Stepper activeIndex={activeStep}>
                        {steps.map((item, index) => (
                          <Stepper.Step key={index}>
                            <Stepper.Label>{item.label}</Stepper.Label>
                            <Stepper.Content>{item.content}</Stepper.Content>
                          </Stepper.Step>
                        ))}
                      </Stepper>
                    </StyledContainer>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={9} xl={6}>
                    <ContainerCard>
                      {steps[activeStep].form(formProps)}
                    </ContainerCard>
                  </Col>
                </Row>
              )}
            </Form>
          </ModalFullScreen.Body>
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col xs={12} sm={12} md={12} lg={9} xl={6} offsetLg={3}>
              <ModalFullScreen.Footer>
                {steps.map(
                  (item, index) =>
                    index === activeStep && (
                      <ModalFullScreen.FooterItem>
                        {item.buttons(formProps)}
                      </ModalFullScreen.FooterItem>
                    )
                )}
              </ModalFullScreen.Footer>
            </Col>
          </Row>
        </ModalFullScreen>
      )}
    </Formik>
  ) : (
    <></>
  );
};
