import { PageLoader } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { Header } from 'src/common/components/navigation/header/header';
import { extractStrapiData } from 'src/common/getStrapiData';
import { ManualResponse } from 'src/features/backoffice';
import { useGeti18nManualsQuery } from 'src/features/backoffice/strapi';
import i18n from 'src/i18n';

const Manual = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const { data, isLoading, isError } = useGeti18nManualsQuery({
    locale: i18n.language,
    filters: {
      campaignId: {
        $eq: campaignId,
      },
    },
  });

  if (isLoading) return <PageLoader />;

  if (isError) {
    console.log('🚀 ~ file: index.tsx:19 ~ Manual ~ isError:', isError);
    return <div>Error...</div>;
  }

  let manual:
    | (NonNullable<ManualResponse['data']>['attributes'] & { id: number })
    | undefined;
  if (data) {
    // eslint-disable-next-line prefer-destructuring
    manual = extractStrapiData(data)[0];
    console.log('🚀 ~ file: index.tsx:31 ~ Manual ~ manual:', manual);
  }

  return (
    <div>
      <Header logo="full" loggedIn={false} />
      <div style={{ height: '200px' }}>asd</div>
      {manual && (
        <div key={manual.id}>
          {manual.title} CPID: {manual.campaignId}
        </div>
      )}
    </div>
  );
};

export default Manual;
