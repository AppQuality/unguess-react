import { Button } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';

export const BookACall = () => {
  const { t } = useTranslation();

  return (
    <BasicWidget>
      <>
        <BasicWidget.Description
          header="header"
          content="content"
          footer="footer"
        />
        <BasicWidget.Footer>
          <Button size="small">{t('Book a call')}</Button>
        </BasicWidget.Footer>
      </>
    </BasicWidget>
  );
};
