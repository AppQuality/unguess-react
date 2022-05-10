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
  Radio,
  Label,
  MediaInput,
  Hint,
} from "@appquality/unguess-design-system";
import { CardDivider } from "../cardDivider";
import { Field, Fieldset } from "@zendeskgarden/react-forms";
import { ReactComponent as SmartphoneIcon } from "src/assets/icons/device-smartphone.svg";
import { ReactComponent as SmartphoneIconActive } from "src/assets/icons/device-smartphone-active.svg";
import { ReactComponent as TabletIcon } from "src/assets/icons/device-tablet.svg";
import { ReactComponent as TabletIconActive } from "src/assets/icons/device-tablet-active.svg";
import { ReactComponent as LinkIcon } from "src/assets/icons/link-stroke.svg";
import { FormikProps } from "formik";
import { WizardModel } from "../wizardModel";
import { useTranslation, Trans } from "react-i18next";
import styled from "styled-components";
import { OutOfScopeSection } from "./where/outOfScope";
import { useEffect, useState } from "react";

const StyledRow = styled(Row)`
  margin-top: ${({ theme }) => theme.space.md};
`;

const PrimarySpan = styled(Span)`
  color: ${({ theme }) => theme.colors.primaryHue};
`;

const InnerField = styled(Field)`
  margin-top: ${({ theme }) => theme.space.sm};
  margin-left: ${({ theme }) => theme.space.base * 6}px;
`;

export const WhereAppStep = (props: FormikProps<WizardModel>) => {
  const { errors, values, setFieldValue, handleChange } = props;
  const initialRadioValue = values.isIOS ? "ios" : (values.isAndroid ? "android" : "none");
  const [radioValue, setRadioValue] = useState(initialRadioValue);

  //Reset web step
  if(values.customBrowser) setFieldValue("customBrowser", false);
  if(values.withDesktop) setFieldValue("withDesktop", false);

  useEffect(() => {
    if (radioValue === "ios") {
      setFieldValue("isIOS", true);
      setFieldValue("isAndroid", false);
    } else if (radioValue === "android") {
      setFieldValue("isIOS", false);
      setFieldValue("isAndroid", true);
    }
  }, [radioValue, setFieldValue]);

  const { t } = useTranslation();

  return (
    <>
      <Row>
        <Col>
          <XXL style={{color: theme.palette.grey[800]}}>
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
        <Col size={12}>
          {(errors.withSmartphone || errors.withTablet) && (
            <Message validation="error" style={{ marginTop: theme.space.xs }}>
              {t("__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_ERROR")}
            </Message>
          )}
        </Col>
      </StyledRow>

      {/** --- Operating System --- */}
      <StyledRow style={{ marginTop: theme.space.lg }}>
        <Col>
          <XL isBold style={{ color: theme.palette.grey[800] }}>
            {t("__EXPRESS_WIZARD_STEP_APP_WHERE_OS_TITLE")}
          </XL>
        </Col>
      </StyledRow>
      <StyledRow>
        <Col>
          <Fieldset>
            <Fieldset.Legend>
              {t("__EXPRESS_WIZARD_STEP_APP_WHERE_OS_LABEL")}
            </Fieldset.Legend>
            <Field>
              <Radio
                name="device-platform"
                value="ios"
                checked={radioValue === "ios"}
                onChange={(e) => {
                  setRadioValue(e.target.value);
                  setFieldValue("isIOS", e.target.value === "ios");
                  handleChange(e);
                }}
              >
                <Label isRegular>
                  {t("__EXPRESS_WIZARD_STEP_APP_WHERE_OS_IOS_LABEL")}
                </Label>
              </Radio>
            </Field>
            {/** iOS Link */}
            {values.isIOS && (
              <InnerField>
                <Label>
                  {t("__EXPRESS_WIZARD_STEP_WHERE_IOS_LINK_LABEL")}
                  <Span style={{ color: theme.colors.dangerHue }}>*</Span>
                </Label>
                <Hint>
                  {t("__EXPRESS_WIZARD_STEP_WHERE_IOS_LINK_DESCRIPTION")}
                </Hint>
                <MediaInput
                  start={<LinkIcon />}
                  type={"url"}
                  placeholder="https://www.example.com"
                  {...props.getFieldProps("iOSLink")}
                  {...(errors.iOSLink && { validation: "error" })}
                />

                <Message {...(errors.iOSLink && { validation: "error" })}>
                  {errors.iOSLink
                    ? t("__EXPRESS_WIZARD_STEP_WHERE_IOS_LINK_ERROR")
                    : t("__EXPRESS_WIZARD_STEP_WHERE_IOS_LINK_INFO")}
                </Message>
              </InnerField>
            )}
            <Field style={{ marginTop: theme.space.base * 4 + "px" }}>
              <Radio
                name="device-platform"
                value="android"
                checked={radioValue === "android"}
                onChange={(e) => {
                  setRadioValue(e.target.value);
                  setFieldValue("isAndroid", e.target.value === "android");
                  handleChange(e);
                }}
              >
                <Label isRegular>
                  {t("__EXPRESS_WIZARD_STEP_APP_WHERE_OS_ANDROID_LABEL")}
                </Label>
              </Radio>
            </Field>
            {/** iOS Link */}
            {values.isAndroid && (
              <InnerField>
                <Label>
                  {t("__EXPRESS_WIZARD_STEP_WHERE_ANDROID_LINK_LABEL")}
                  <Span style={{ color: theme.colors.dangerHue }}>*</Span>
                </Label>
                <Hint>
                  {t("__EXPRESS_WIZARD_STEP_WHERE_ANDROID_LINK_DESCRIPTION")}
                </Hint>
                <MediaInput
                  start={<LinkIcon />}
                  type={"url"}
                  placeholder="https://www.example.com"
                  {...props.getFieldProps("androidLink")}
                  {...(errors.androidLink && { validation: "error" })}
                />

                <Message {...(errors.androidLink && { validation: "error" })}>
                  {errors.androidLink
                    ? t("__EXPRESS_WIZARD_STEP_WHERE_ANDROID_LINK_ERROR")
                    : t("__EXPRESS_WIZARD_STEP_WHERE_ANDROID_LINK_INFO")}
                </Message>
              </InnerField>
            )}
          </Fieldset>
        </Col>
      </StyledRow>

      {/** --- Out of scope --- */}
      <OutOfScopeSection {...props} />
    </>
  );
};
