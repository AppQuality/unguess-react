import { STRAPI_URL } from 'src/constants';
import { useGetFullTemplatesByIdQuery } from 'src/features/backoffice/strapi';

const useCampaignTemplateById = (id: string) => {
  const { data, isLoading, isError } = useGetFullTemplatesByIdQuery({
    id,
    populate: {
      icon: '*',
      Price: {
        populate: {
          tag_price: {
            populate: '*',
          },
        },
      },
      output: {
        populate: '*',
      },
      requirements: {
        populate: '*',
      },
    },
  });
  console.log('data', data);
  const templateData = {
    price: data?.data?.attributes?.Price?.tag_price || {},
    tags: data?.data?.attributes?.output?.map((o) => {
      const oUrl = o.Icon?.data?.attributes?.url;
      return {
        label: o.Text ?? '',
        icon: oUrl ? `${STRAPI_URL}${oUrl}` : '',
        id: o.id ?? '',
      };
    }),
    requirements: data?.data?.attributes?.requirements,
    description: data?.data?.attributes?.description || '',
    title: data?.data?.attributes?.title || '',
    slug: data?.data?.attributes?.template_slug || '',
  };
  return {
    data: templateData,
    isLoading,
    isError,
  };
};

export { useCampaignTemplateById };
