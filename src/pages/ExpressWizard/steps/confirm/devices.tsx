import { Span } from "@appquality/unguess-design-system";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { WizardModel } from "../../wizardModel";

export const Devices = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();

  const { values } = props;

  const items = [];

  values.withSmartphone &&
    items.push(t("__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_SMARTPHONE"));
  values.withTablet &&
    items.push(t("__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_TABLET"));
  values.withDesktop &&
    items.push(t("__EXPRESS_WIZARD_STEP_WHERE_DEVICE_TYPE_DESKTOP"));

  return (
    <>
      {t("__EXPRESS_WIZARD_STEP_RECAP_WHERE_CONTENT_TEXT_DEVICES")}{" "}
      <Span isBold>{items.join(", ")}</Span>.
    </>
  );
};
