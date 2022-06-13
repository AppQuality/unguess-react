import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { stringify } from 'qs';
import {
  GetServicesApiResponse,
  GetServicesByIdApiResponse,
  GetCategoriesApiResponse,
  GetServicesApiArg,
} from '.';

interface GetFullServicesByIdArgs {
  id: string;
  populate?: string[] | object;
  locale?: string;
}

interface GetServicesApiArgs extends GetServicesApiArg {
  locale?: string;
}

interface Geti18nServicesFeaturedArgs extends GetServicesApiArg {
  filters?: object;
  locale?: string;
}

interface Geti18nCategoriesArgs {
  locale?: string;
  populate?: string[] | object;
}

export const strapiSlice = createApi({
  reducerPath: 'strapi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_STRAPI_API_URL,
    prepareHeaders: (headers) => {
      if (process.env.REACT_APP_STRAPI_API_TOKEN) {
        const token = process.env.REACT_APP_STRAPI_API_TOKEN;
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    geti18nServices: builder.query<GetServicesApiResponse, GetServicesApiArgs>({
      query: (queryArg) => ({
        url: `/services`,
        params: {
          sort: queryArg.sort,
          pagination: queryArg.pagination,
          fields: queryArg.fields,
          populate: queryArg.populate,
          locale: queryArg.locale,
        },
      }),
    }),
    getFullServicesById: builder.query<
      GetServicesByIdApiResponse,
      GetFullServicesByIdArgs
    >({
      query: (queryArg) => {
        let url = `/services/${queryArg.id}`;
        const args: GetFullServicesByIdArgs = {
          id: queryArg.id,
          ...(queryArg.locale && { locale: queryArg.locale }),
          ...(queryArg.populate && { populate: queryArg.populate }),
        };
        const params = stringify(args, { encodeValuesOnly: true });
        params ? (url += `?${params}`) : null;
        return { url };
      },
    }),
    geti18nServicesFeatured: builder.query<
      GetServicesApiResponse,
      Geti18nServicesFeaturedArgs
    >({
      query: (queryArg) => {
        let url = `/services`;
        const args: Geti18nServicesFeaturedArgs = {
          ...(queryArg.filters && { filters: queryArg.filters }),
          ...(queryArg.locale && { locale: queryArg.locale }),
          ...(queryArg.populate && { populate: queryArg.populate }),
          ...(queryArg.pagination && { pagination: queryArg.pagination }),
        };
        const params = stringify(args, { encodeValuesOnly: true });
        params ? (url += `?${params}`) : null;
        return { url };
      },
    }),
    geti18nCategories: builder.query<
      GetCategoriesApiResponse,
      Geti18nCategoriesArgs
    >({
      query: (queryArg) => {
        let url = `/categories`;
        const args: Geti18nCategoriesArgs = {
          ...(queryArg.locale && { locale: queryArg.locale }),
          ...(queryArg.populate && { populate: queryArg.populate }),
        };
        const params = stringify(args, { encodeValuesOnly: true });
        params ? (url += `?${params}`) : null;
        return { url };
      },
    }),
  }),
});

export const {
  useGetFullServicesByIdQuery,
  useGeti18nServicesQuery,
  useGeti18nServicesFeaturedQuery,
  useGeti18nCategoriesQuery,
} = strapiSlice;
