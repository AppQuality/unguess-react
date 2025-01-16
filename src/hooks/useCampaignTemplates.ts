import { extractStrapiData } from 'src/common/getStrapiData';
import { STRAPI_URL } from 'src/constants';
import { useGetTemplatesQuery } from 'src/features/backoffice';

const useCampaignTemplates = () => {
  const { data, isLoading, isError } = useGetTemplatesQuery({
    populate: ['icon', 'output'],
  });

  return {
    data: (data?.data || []).map((item) => {
      const icon = extractStrapiData(item.attributes?.icon);

      const output = item.attributes?.output?.map((o) => {
        const strapiData = extractStrapiData(o);
        const result = 'a';
        return result;
      });

      return {
        ...item,
        iconUrl: icon?.url ? `${STRAPI_URL}${icon.url}` : '',
      };
    }),
    isLoading,
    isError,
  };
};

export { useCampaignTemplates };
