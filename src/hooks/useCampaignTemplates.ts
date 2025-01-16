import { STRAPI_URL } from 'src/constants';
import { useGetTemplatesQuery } from 'src/features/backoffice';

const useCampaignTemplates = () => {
  const { data, isLoading, isError } = useGetTemplatesQuery({
    // @ts-ignore
    populate: {
      icon: '*',
      Price: '*',
      output: {
        populate: '*',
      },
      express: '*',
    },
    sort: 'sort_order',
  });

  return {
    data: (data?.data || [])
      .filter((item) => item?.attributes?.express?.data)
      .map((item) => {
        const iconUrl = item.attributes?.icon?.data?.attributes?.url;

        const output = item.attributes?.output?.map((o) => {
          const oUrl = o.Icon?.data?.attributes?.url;
          return {
            text: o.Text,
            iconUrl: oUrl ? `${STRAPI_URL}${oUrl}` : '',
          };
        });

        return {
          ...item.attributes,
          icon: iconUrl ? `${STRAPI_URL}${iconUrl}` : '',
          output: output || [],
          expressId: Number(item.attributes?.express?.data?.id || '0'),
        };
      }),
    isLoading,
    isError,
  };
};

export { useCampaignTemplates };
