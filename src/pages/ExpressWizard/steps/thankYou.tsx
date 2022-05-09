import {
  ContainerCard,
  Row,
  Col,
  XXL,
  MD,
  theme,
} from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "src/app/hooks";
import { closeDrawer, closeWizard } from "src/features/express/expressSlice";
import { WaterButton } from "../waterButton";
import { ReactComponent as SuccessIcon } from "src/assets/wizard-success.svg";

export const ThankYouStep = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <ContainerCard>
      <Row style={{ marginBottom: theme.space.xs }}> 
        <Col size={12} textAlign={"center"}>
          <SuccessIcon />
        </Col>
      </Row>
      <Row style={{ marginTop: theme.space.md }}>
        <Col size={12} textAlign={"center"}>
          <XXL isBold style={{ color: theme.colors.primaryHue }}>
            {t("__EXPRESS_WIZARD_STEP_THANK_YOU_TITLE")}
          </XXL>
          <MD style={{ color: theme.palette.grey[600] }}>
            {t("__EXPRESS_WIZARD_STEP_THANK_YOU_SUBTITLE")}
          </MD>
        </Col>
      </Row>
      <Row style={{ marginTop: theme.space.xl }}>
        <Col size={12} textAlign={"center"}>
          <WaterButton
            isPill
            isPrimary
            onClick={() => {
              dispatch(closeDrawer());
              dispatch(closeWizard());
            }}
          >
            {t("__EXPRESS_WIZARD_STEP_THANK_YOU_BUTTON")}
          </WaterButton>
        </Col>
      </Row>
    </ContainerCard>
  );
};
