import { Modal, LG, XL, Skeleton } from '@appquality/unguess-design-system';
import { Trans } from 'react-i18next';
import { appTheme } from 'src/app/theme';

export const PaymentLoader = () => (
  <Modal
    role="dialog"
    style={{
      backgroundColor: 'transparent',
      boxShadow: 'none',
      marginTop: '-100px',
    }}
  >
    <Trans
      i18nKey="PAYING_PLAN_MODAL_TITLE"
      components={{
        LG: <LG color="white" />,
        XL: (
          <XL
            color="white"
            isBold
            style={{ marginBottom: appTheme.space.xs }}
          />
        ),
      }}
    />
    <Skeleton
      width="100%"
      height="8px"
      style={{
        marginTop: appTheme.space.lg,
        backgroundColor: appTheme.palette.teal[500],
        borderRadius: appTheme.borderRadii.lg,
      }}
    />
  </Modal>
);
