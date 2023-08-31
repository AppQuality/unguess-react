import { useTranslation } from 'react-i18next';

export const SentimentChart = ({
  campaignId,
  isPreview,
}: {
  campaignId: number;
  isPreview?: boolean;
}) => {
  const { t } = useTranslation();
  return <>Lorem ipsum</>;
};
