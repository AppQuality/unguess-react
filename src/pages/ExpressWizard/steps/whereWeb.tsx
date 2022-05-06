import {
  XL,
  XXL,
  MD,
  Span,
  theme,
  Message,
  Row,
  Col,
  CheckboxCard,
  Checkbox,
  Label,
  Hint,
  Toggle,
  MediaInput,
  Paragraph,
  Input,
  Textarea,
} from "@appquality/unguess-design-system";
import { FormikProps } from "formik";
import * as Yup from "yup";
import { Field } from "@zendeskgarden/react-forms";
import { useTranslation, Trans } from "react-i18next";
import { CardDivider } from "../cardDivider";
import { WizardModel } from "../wizardModel";
import { ReactComponent as SmartphoneIcon } from "src/assets/icons/device-smartphone.svg";
import { ReactComponent as SmartphoneIconActive } from "src/assets/icons/device-smartphone-active.svg";
import { ReactComponent as TabletIcon } from "src/assets/icons/device-tablet.svg";
import { ReactComponent as TabletIconActive } from "src/assets/icons/device-tablet-active.svg";
import { ReactComponent as LaptopIcon } from "src/assets/icons/device-laptop.svg";
import { ReactComponent as LaptopIconActive } from "src/assets/icons/device-laptop-active.svg";
import { ReactComponent as LinkIcon } from "src/assets/icons/link-stroke.svg";
import styled from "styled-components";
import { Notes, NotesTitle } from "../notesCard";
import { useEffect } from "react";

const StyledRow = styled(Row)`
  margin-top: ${({ theme }) => theme.space.md};
`;

const PrimarySpan = styled(Span)`
  color: ${({ theme }) => theme.colors.primaryHue};
`;

const SpacedField = styled(Field)`
  margin-top: ${({ theme }) => theme.space.sm};
`;

export const WhereWebStep = ({
  errors,
  touched,
  validateField,
  validateForm,
  handleChange,
  values,
  setFieldValue,
  ...props
}: FormikProps<WizardModel>) => {
  const { t } = useTranslation();

  useEffect(() => {
    const atLeastOneChecked =
      values.withChrome ||
      values.withFirefox ||
      values.withSafari ||
      values.withEdge;
    setFieldValue("customBrowserFilled", atLeastOneChecked);
  }, [
    setFieldValue,
    values.withChrome,
    values.withEdge,
    values.withFirefox,
    values.withSafari,
  ]);

  return (
    <>
      <Row>
        <Col>
          <XXL>
            <Trans i18nKey="__EXPRESS_WIZARD_STEP_WHERE_TITLE">
              <PrimarySpan isBold>Where</PrimarySpan>
              do we test?
            </Trans>
          </XXL>
          <MD>
            <Trans i18nKey="__EXPRESS_WIZARD_STEP_WHERE_SUBTITLE">
              Choose what kind of <Span isBold>devices</Span> do you want to
              test on
            </Trans>
          </MD>
        </Col>
      </Row>

      <CardDivider />

      {/** --- Device Type Checkboxes --- */}
      <StyledRow>
        <Col>
          <Field>
            <CheckboxCard
              label={t("__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_SMARTPHONE")}
              icon={<SmartphoneIcon />}
              iconActive={<SmartphoneIconActive />}
              name="withSmartphone"
              defaultChecked={values.withSmartphone}
              onToggle={(isChecked) => {
                setFieldValue("withSmartphone", isChecked);
              }}
            />
          </Field>
        </Col>
        <Col>
          <Field>
            <CheckboxCard
              label={t("__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_TABLET")}
              icon={<TabletIcon />}
              iconActive={<TabletIconActive />}
              name="withTablet"
              defaultChecked={values.withTablet}
              onToggle={(isChecked) => {
                setFieldValue("withTablet", isChecked);
              }}
            />
          </Field>
        </Col>
        <Col>
          <Field>
            <CheckboxCard
              label={t("__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_DESKTOP")}
              icon={<LaptopIcon />}
              iconActive={<LaptopIconActive />}
              name="withDesktop"
              defaultChecked={values.withDesktop}
              onToggle={(isChecked) => {
                setFieldValue("withDesktop", isChecked);
              }}
            />
          </Field>
        </Col>
        <Col size={12}>
          {(errors.withSmartphone ||
            errors.withTablet ||
            errors.withDesktop) && (
            <Message validation="error" style={{ marginTop: theme.space.xs }}>
              {t("__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_ERROR")}
            </Message>
          )}
        </Col>
      </StyledRow>

      {/** --- Website Url --- */}
      <StyledRow>
        <Col>
          <Field>
            <Label>
              {t("__EXPRESS_WIZARD_STEP_WHERE_LINK_LABEL")}
              <Span style={{ color: theme.colors.dangerHue }}>*</Span>
            </Label>
            <Hint>{t("__EXPRESS_WIZARD_STEP_WHERE_LINK_DESCRIPTION")}</Hint>
            <MediaInput
              start={<LinkIcon />}
              type={"url"}
              placeholder="https://www.example.com"
              {...props.getFieldProps("link")}
              {...(errors.link && { validation: "error" })}
            />

            <Message {...(errors.link && { validation: "error" })}>
              {errors.link
                ? t("__EXPRESS_WIZARD_STEP_WHERE_LINK_ERROR")
                : t("__EXPRESS_WIZARD_STEP_WHERE_LINK_INFO")}
            </Message>
          </Field>
        </Col>
      </StyledRow>

      {/** --- Browsers --- */}
      <StyledRow style={{ marginTop: theme.space.lg }}>
        {/** LG: 32px */}
        <Col>
          <MD style={{ color: theme.palette.grey[800] }}>
            {t("__EXPRESS_WIZARD_STEP_WHERE_BROWSER_TITLE")}
          </MD>
        </Col>
        <Col size={2} textAlign={"end"}>
          <Field>
            <Toggle
              {...props.getFieldProps("customBrowser")}
              checked={values.customBrowser}
            >
              <Label hidden>
                {t("__EXPRESS_WIZARD_STEP_WHERE_BROWSER_TITLE")}
              </Label>
            </Toggle>
          </Field>
        </Col>
        <Col size={12}>
          <CardDivider style={{ marginTop: theme.space.xs }} />
        </Col>
        <Col size={12}>
          <Notes>
            {!values.customBrowser ? (
              <>
                <NotesTitle>
                  {t("__EXPRESS_WIZARD_STEP_WHERE_DEFAULT_BROWSER_TITLE")}
                </NotesTitle>
                <Paragraph>
                  {t("__EXPRESS_WIZARD_STEP_WHERE_DEFAULT_BROWSER_DESCRIPTION")}
                </Paragraph>
              </>
            ) : (
              <>
                <Field>
                  <Label>
                    {t("__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_LABEL")}
                    <Span style={{ color: theme.colors.dangerHue }}>*</Span>
                  </Label>
                  <Input
                    type="hidden"
                    {...props.getFieldProps("customBrowserFilled")}
                  />
                </Field>
                <SpacedField>
                  <Checkbox {...props.getFieldProps("withChrome")}>
                    <Label style={{ color: theme.colors.primaryHue }}>
                      {t("__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_CHROME")}
                    </Label>
                  </Checkbox>
                </SpacedField>
                <SpacedField>
                  <Checkbox {...props.getFieldProps("withEdge")}>
                    <Label style={{ color: theme.colors.primaryHue }}>
                      {t("__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_EDGE")}
                    </Label>
                  </Checkbox>
                </SpacedField>
                <SpacedField>
                  <Checkbox {...props.getFieldProps("withSafari")}>
                    <Label style={{ color: theme.colors.primaryHue }}>
                      {t("__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_SAFARI")}
                    </Label>
                  </Checkbox>
                </SpacedField>
                <SpacedField>
                  <Checkbox {...props.getFieldProps("withFirefox")}>
                    <Label style={{ color: theme.colors.primaryHue }}>
                      {t("__EXPRESS_WIZARD_STEP_WHERE_CUSTOM_BROWSER_FIREFOX")}
                    </Label>
                  </Checkbox>
                </SpacedField>
              </>
            )}
          </Notes>
        </Col>
      </StyledRow>

      {/** --- Out of scope --- */}
      <StyledRow style={{ marginTop: theme.space.lg }}>
        <Col>
          <XL isBold style={{ color: theme.palette.grey[800] }}>
            {t("__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_TITLE")}
          </XL>
          <MD>{t("__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_DESCRIPTION")}</MD>
        </Col>
      </StyledRow>
      <StyledRow style={{ marginTop: theme.space.sm }}>
        <Col>
          <MD style={{ color: theme.palette.grey[800] }}>
            {t("__EXPRESS_WIZARD_STEP_WHERE_BROWSER_TOGGLE_LABEL")}
          </MD>
        </Col>
        <Col size={2} textAlign={"end"}>
          <Field>
            <Toggle
              {...props.getFieldProps("hasOutOfScope")}
              checked={values.hasOutOfScope}
            >
              <Label hidden>
                {t("__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_TITLE")}
              </Label>
            </Toggle>
          </Field>
        </Col>
        <Col size={12}>
          <CardDivider style={{ marginTop: theme.space.xs }} />
        </Col>
        {values.hasOutOfScope && (
          <>
            <Col size={12}>
              <Notes>
                <Field>
                  <Label>
                    {t("__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_LABEL")}
                    <Span style={{ color: theme.colors.dangerHue }}>*</Span>
                  </Label>
                  <Textarea
                    rows={5}
                    placeholder={t(
                      "__EXPRESS_WIZARD_STEP_WHERE_OUT_OF_SCOPE_PLACEHOLDER"
                    )}
                    isResizable
                    {...props.getFieldProps("outOfScope")}
                  />
                </Field>
              </Notes>
            </Col>
          </>
        )}
      </StyledRow>
    </>
  );
};

export const WhereWebStepValidationSchema = Yup.object().shape(
  {
    link: Yup.string().url().required(),
    withSmartphone: Yup.bool().when(["withTablet", "withDesktop"], {
      is: (withTablet: boolean, withDesktop: boolean) =>
        !withTablet && !withDesktop,
      then: Yup.bool().oneOf([true], "Device type is required"),
    }),
    withTablet: Yup.bool().when(["withSmartphone", "withDesktop"], {
      is: (withSmartphone: boolean, withDesktop: boolean) =>
        !withSmartphone && !withDesktop,
      then: Yup.bool().oneOf([true], "Device type is required"),
    }),
    withDesktop: Yup.bool().when(["withSmartphone", "withTablet"], {
      is: (withSmartphone: boolean, withTablet: boolean) => {
        return !withSmartphone && !withTablet;
      },
      then: Yup.bool().oneOf([true], "Device type is required"),
    }),
    customBrowser: Yup.bool(),
    customBrowserFilled: Yup.bool().when("customBrowser", {
      is: true,
      then: Yup.bool().oneOf([true], "Custom Browser is required"),
    }),
  },
  [
    ["withTablet", "withDesktop"],
    ["withSmartphone", "withDesktop"],
    ["withSmartphone", "withTablet"],
  ]
);
