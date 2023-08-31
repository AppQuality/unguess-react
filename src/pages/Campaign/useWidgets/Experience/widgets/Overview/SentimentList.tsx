import { useTranslation } from 'react-i18next';

export const SentimentList = ({
  campaignId,
  isPreview,
}: {
  campaignId: number;
  isPreview?: boolean;
}) => {
  const { t } = useTranslation();
  return <>dolor sic amet.</>;
};
