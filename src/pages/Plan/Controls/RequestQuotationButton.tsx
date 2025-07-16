import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useRequestQuotation } from 'src/features/modules/useRequestQuotation';

const RequestQuotationButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();
  const { isRequestQuoteCTADisabled } = useRequestQuotation();

  return (
    <Button
      isAccent
      isPrimary
      type="button"
      size="small"
      disabled={isRequestQuoteCTADisabled()}
      onClick={onClick}
    >
      {t('__PLAN_REQUEST_QUOTATION_CTA')}
    </Button>
  );
};

export { RequestQuotationButton };
