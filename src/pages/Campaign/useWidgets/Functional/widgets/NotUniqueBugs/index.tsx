import { Span } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';
import { WidgetLoader } from '../widgetLoader';

const primaryTextColor = {
  color: appTheme.components.text.primaryColor,
};

export const NotUniqueBugs = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const isLoading = true; // Simulating loading state

  return (
    <BasicWidget className="unique-bugs-widget">
      <BasicWidget.Header tooltipContent="tooltipContent">
        Title
      </BasicWidget.Header>
      {isLoading ? (
        <WidgetLoader />
      ) : (
        <>
          {campaignId}
          <BasicWidget.Description
            header={t('__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_REPORTED_BY')}
            content={<Span style={primaryTextColor}>description</Span>}
            footer={<>footer</>}
          />
        </>
      )}

      <BasicWidget.Footer>Footer</BasicWidget.Footer>
    </BasicWidget>
  );
};
