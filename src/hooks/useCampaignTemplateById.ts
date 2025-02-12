import { extractStrapiData } from 'src/common/getStrapiData';
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
      express: {
        populate: '*',
      },
      why: {
        populate: {
          reasons: {
            populate: '*',
          },
          advantages: {
            populate: '*',
          },
        },
      },
      how: {
        populate: {
          timeline: {
            populate: '*',
          },
        },
      },
      what: {
        populate: '*',
      },
      output_image: {
        populate: '*',
      },
      campaign_type: {
        populate: '*',
      },
      locale: {
        populate: '*',
      },
    },
  });

  const priceIconData =
    data?.data?.attributes?.Price?.tag_price?.icon?.data?.attributes;

  const templateData = {
    price: {
      ...data?.data?.attributes?.Price?.tag_price,
      icon: priceIconData?.url ? `${STRAPI_URL}${priceIconData.url}` : '',
    },
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
    express: data?.data?.attributes?.express,
    why: data?.data?.attributes?.why,
    how: data?.data?.attributes?.how,
    what: data?.data?.attributes?.what,
    campaignType: data?.data?.attributes?.campaign_type || '',
    ...(data?.data?.attributes?.output_image && {
      outputImage: `${STRAPI_URL}${
        extractStrapiData(data?.data?.attributes?.output_image).url
      }`,
    }),
  };
  return {
    data: templateData,
    isLoading,
    isError,
  };
};

export { useCampaignTemplateById };
