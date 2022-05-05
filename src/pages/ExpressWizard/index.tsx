import {
  Button,
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
import { closeWizard } from "src/features/express/expressSlice";
import {
  WhatStep,
  WhatStepValidationSchema,
  WhereStep,
  WhereStepValidationSchema,
} from "./steps";
import { WizardHeader } from "./wizardHeader";
import { WizardModel } from "./wizardModel";
import defaultValues from "./wizardInitialValues";
import { WaterButton } from "./waterButton";
import { WhereWebStep } from "./steps/whereWeb";


export const ExpressWizardContainer = () => {
  const { t } = useTranslation();
  const formRef = useRef<FormikProps<{}>>(null);

  const dispatch = useAppDispatch();
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { isWizardOpen, steps: draftSteps } = useAppSelector(
    (state) => state.express
  );

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
    setStep(activeStep - 1);
  };

  //Form actions
  const handleSubmit = (
    values: WizardModel,
    { setSubmitting }: FormikHelpers<WizardModel>
  ) => {
    alert("Submitted");
    console.log("Triggered submit", values);
    setSubmitting(false);
  };

  const steps = [
    {
      label: t("__EXPRESS_WIZARD_STEP_WHAT_LABEL"),
      content: t("__EXPRESS_WIZARD_STEP_WHAT_DESCRIPTION"),
      form: (props: any) => <WhatStep {...props} />,
      validationSchema: WhatStepValidationSchema,
      buttons: (
        <WaterButton isPill isPrimary onClick={onNext}>
          {t("__EXPRESS_WIZARD_NEXT_BUTTON_LABEL")}
        </WaterButton>
      ),
    },
    {
      label: t("__EXPRESS_WIZARD_STEP_WHERE_LABEL"),
      content: t("__EXPRESS_WIZARD_STEP_WHERE_DESCRIPTION"),
      form: (props: any) => <WhereWebStep {...props} />,
      validationSchema: WhereStepValidationSchema,
      buttons: (
        <>
          <WaterButton isPill isPrimary onClick={onBack}>
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
      form: (props: any) => <WhatStep {...props} />,
      validationSchema: WhatStepValidationSchema,
      buttons: (
        <>
          <WaterButton isPill isPrimary onClick={onBack}>
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
      form: (props: any) => <WhatStep {...props} />,
      validationSchema: WhatStepValidationSchema,
      buttons: (
        <>
          <WaterButton isPill isPrimary onClick={onBack}>
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
      form: (props: any) => <WhatStep {...props} />,
      validationSchema: WhatStepValidationSchema,
      buttons: (
        <>
          <WaterButton isPill isPrimary onClick={onBack}>
            {t("__EXPRESS_WIZARD_BACK_BUTTON_LABEL")}
          </WaterButton>
          <WaterButton isPill isPrimary onClick={onBack}>
            {t("__EXPRESS_WIZARD_CONFIRM_BUTTON_LABEL")}
          </WaterButton>
        </>
      ),
    },
  ];

  return isWizardOpen ? (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={steps[activeStep].validationSchema}
    >
      {(formProps) => (
        <ModalFullScreen
          title={t("__EXPRESS_WIZARD_TITLE")}
          onClose={() => dispatch(closeWizard())}
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
              <Row>
                {/**--- Stepper ---*/}
                <Col xs={12} sm={12} md={12} lg={3}>
                  <ContainerCard
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
                  </ContainerCard>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <ContainerCard>
                    {activeStep === steps.length ? (
                      <>Inserire qui pagina di completamento</>
                    ) : (
                      steps[activeStep].form(formProps)
                    )}
                  </ContainerCard>
                </Col>
              </Row>
            </Form>
          </ModalFullScreen.Body>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6} offset={3}>
              <ModalFullScreen.Footer>
                {steps.map(
                  (item, index) =>
                    index === activeStep && (
                      <ModalFullScreen.FooterItem>
                        {item.buttons}
                      </ModalFullScreen.FooterItem>
                    )
                )}
                <ModalFullScreen.FooterItem>
                  <Button
                    type="submit"
                    disabled={
                      Object.keys(formProps.errors).length > 0 ||
                      formProps.isSubmitting
                    }
                    onClick={() => formRef.current?.handleSubmit()}
                  >
                    Test submit
                  </Button>
                </ModalFullScreen.FooterItem>
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
