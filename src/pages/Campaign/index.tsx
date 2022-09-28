// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from 'react-i18next';
import { Page } from 'src/features/templates/Page';
import { Grid } from '@appquality/unguess-design-system';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { CampaignPageHeader } from './pageHeader';

const Campaign = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.user);

  return (
    <Page
      title={t('__PAGE_TITLE_PRIMARY_DASHBOARD')}
      pageHeader={
        <CampaignPageHeader pageTitle={t('__PAGE_TITLE_PRIMARY_DASHBOARD')} />
      }
      route=""
    >
      <Grid>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
        laudantium ex quaerat aperiam, esse repudiandae. In, molestiae
        repudiandae, consequatur repellat similique porro ex neque doloremque
        fugiat cupiditate, ducimus accusantium quo!
      </Grid>
    </Page>
  );
};

export default Campaign;
