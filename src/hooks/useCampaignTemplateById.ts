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
      sort_order: {
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
    id,
    price: {
      price: data?.data?.attributes?.Price?.price || 0, // mandatory field
      previousPrice: data?.data?.attributes?.Price?.previous_price,
      isStrikeThrough: data?.data?.attributes?.Price?.is_strikethrough,
      ...data?.data?.attributes?.Price?.tag_price,
      icon: priceIconData?.url ? `${STRAPI_URL}${priceIconData.url}` : '',
    },
    tags: data?.data?.attributes?.output // output field is mandatory on strapi backoffice
      ? data?.data?.attributes?.output?.map((o) => {
          const oUrl = o.Icon?.data?.attributes?.url;
          return {
            label: o.Text ?? '',
            icon: oUrl ? `${STRAPI_URL}${oUrl}` : '',
            id: o.id ?? '',
          };
        })
      : [],
    requirements: data?.data?.attributes?.requirements,
    description: data?.data?.attributes?.description || '',
    title: data?.data?.attributes?.title || '',
    slug: data?.data?.attributes?.template_slug || '',
    sortOrder: data?.data?.attributes?.sort_order || 0,
    express: data?.data?.attributes?.express,
    why: data?.data?.attributes?.why,
    ...(data?.data?.attributes?.how && {
      how: {
        timeline: data?.data?.attributes?.how?.timeline || [], // mandatory field
      },
    }),
    ...(data?.data?.attributes?.what && {
      what: {
        description: data?.data?.attributes?.what?.description || '', // mandatory field
        goalText: data?.data?.attributes?.what?.goal_text,
      },
    }),
    campaignType: data?.data?.attributes?.campaign_type || '',
    ...(data?.data?.attributes?.output_image?.data && {
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
