import {
  Button,
  Card,
  Col,
  ModalFullScreen,
  Row,
  Stepper,
  theme,
} from "@appquality/unguess-design-system";
import {
  Form,
  Formik,
  FormikProps,
  FormikValues,
  useFormikContext,
} from "formik";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { closeWizard } from "src/features/express/expressSlice";
import styled from "styled-components";
import {
  WhatStep,
  WhatStepValidationSchema,
  WhereStep,
  WhereStepValidationSchema,
} from "./steps";
import { WizardHeader } from "./wizardHeader";

const StyledButton = styled(Button)``;

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primaryHue: theme.palette.teal[600],
  },
};

export const ExpressWizardContainer = () => {
  const { t } = useTranslation();
  const formRef = useRef<FormikProps<{}>>(null);

  const dispatch = useAppDispatch();
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { isOpen } = useAppSelector((state) => state.express);

  const [activeStep, setStep] = useState(0);

  const onNext = () => {
    formRef.current &&
      formRef.current?.validateForm().then(() => {
        if (formRef.current?.isValid) {
          alert("validated");
          setStep(activeStep + 1);
        }
      });
  };
  const onBack = () => {
    setStep(activeStep - 1);
  };

  //Form actions
  const handleSubmit = (values: any) => {
    console.log("Triggered submit", values);
  };

  const steps = [
    {
      label: "Cosa",
      content: "Il prodotto del test",
      form: (props: any) => <WhatStep {...props} />,
      validationSchema: WhatStepValidationSchema,
      buttons: (
        <StyledButton theme={customTheme} isPill isPrimary onClick={onNext}>
          Next
        </StyledButton>
      ),
    },
    {
      label: "Dove",
      content: "I dispositivi di test",
      form: (props: any) => <WhereStep />,
      validationSchema: WhereStepValidationSchema,
      buttons: (
        <>
          <StyledButton theme={customTheme} isPill isPrimary onClick={onBack}>
            Back
          </StyledButton>
          <StyledButton theme={customTheme} isPill isPrimary onClick={onNext}>
            Next
          </StyledButton>
        </>
      ),
    },
    {
      label: "Chi",
      content: "Gli utenti del test",
      form: (props: any) => <WhatStep {...props} />,
      validationSchema: WhatStepValidationSchema,
      buttons: (
        <>
          <StyledButton theme={customTheme} isPill isPrimary onClick={onBack}>
            Back
          </StyledButton>
          <StyledButton theme={customTheme} isPill isPrimary onClick={onNext}>
            Next
          </StyledButton>
        </>
      ),
    },
    {
      label: "Quando",
      content: "Le tempistiche del test",
      form: (props: any) => <WhatStep {...props} />,
      validationSchema: WhatStepValidationSchema,
      buttons: (
        <>
          <StyledButton theme={customTheme} isPill isPrimary onClick={onBack}>
            Back
          </StyledButton>
          <StyledButton theme={customTheme} isPill isPrimary onClick={onNext}>
            Next
          </StyledButton>
        </>
      ),
    },
    {
      label: "Recap e Lancio",
      content: "Tutto pronto!",
      form: (props: any) => <WhatStep {...props} />,
      validationSchema: WhatStepValidationSchema,
      buttons: (
        <StyledButton theme={customTheme} isPill isPrimary onClick={onBack}>
          Back
        </StyledButton>
      ),
    },
  ];

  return isOpen ? (
    <Formik
      innerRef={formRef}
      initialValues={{ url: "", email: "", name: "" }}
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
            <Row>
              {/**--- Stepper ---*/}
              <Col xs={12} sm={12} md={12} lg={3}>
                <Card
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
                </Card>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                <Card>
                  <Form onSubmit={formProps.handleSubmit}>
                    {activeStep === steps.length ? (
                      <>Inserire qui pagina di completamento</>
                    ) : (
                      steps[activeStep].form(formProps)
                    )}
                  </Form>
                </Card>
              </Col>
            </Row>
          </ModalFullScreen.Body>
          <ModalFullScreen.Footer>
            {steps.map(
              (item, index) =>
                index === activeStep && (
                  <ModalFullScreen.FooterItem>
                    {item.buttons}
                  </ModalFullScreen.FooterItem>
                )
            )}
          </ModalFullScreen.Footer>
        </ModalFullScreen>
      )}
    </Formik>
  ) : (
    <></>
  );
};
