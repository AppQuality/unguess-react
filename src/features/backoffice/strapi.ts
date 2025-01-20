import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { stringify } from 'qs';
import {
  GetCategoriesApiResponse,
  GetCategoriesByIdApiArg,
  GetCategoriesByIdApiResponse,
  GetExpressesApiArg,
  GetExpressesApiResponse,
  GetExpressTypesByIdApiArg,
  GetExpressTypesByIdApiResponse,
  GetManualsApiArg,
  GetManualsApiResponse,
  GetServicesApiArg,
  GetServicesApiResponse,
  GetServicesByIdApiResponse,
} from '.';

interface GetFullServicesByIdArgs {
  id: string;
  populate?: string[] | object;
  locale?: string;
  filters?: object;
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
  filters?: object;
}

interface Geti18nCategoryArgs extends GetCategoriesByIdApiArg {
  locale?: string;
  populate?: string[] | object;
  filters?: object;
}

interface Geti18nExpressesApiArgs extends GetExpressesApiArg {
  locale?: string;
  filters?: object;
}

interface Geti18nExpressTypesByIdApiArgs extends GetExpressTypesByIdApiArg {
  locale?: string;
  filters?: object;
  populate?: string[] | object;
}

interface Geti18nManualsApiArgs extends Omit<GetManualsApiArg, 'populate'> {
  locale?: string;
  filters?: object;
  populate?: string | object;
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

    paramsSerializer: (params) => stringify(params, { encodeValuesOnly: true }),
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
          ...(queryArg.filters && { filters: queryArg.filters }),
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
          ...(queryArg.filters && { filters: queryArg.filters }),
        };
        const params = stringify(args, { encodeValuesOnly: true });
        params ? (url += `?${params}`) : null;
        return { url };
      },
    }),
    getFullCategoriesById: builder.query<
      GetCategoriesByIdApiResponse,
      Geti18nCategoryArgs
    >({
      query: (queryArg) => {
        let url = `/categories/${queryArg.id}`;
        const args: Geti18nCategoriesArgs = {
          ...(queryArg.locale && { locale: queryArg.locale }),
          ...(queryArg.populate && { populate: queryArg.populate }),
          ...(queryArg.filters && { filters: queryArg.filters }),
        };
        const params = stringify(args, { encodeValuesOnly: true });
        params ? (url += `?${params}`) : null;
        return { url };
      },
    }),
    geti18nExpressTypes: builder.query<
      GetExpressesApiResponse,
      Geti18nExpressesApiArgs
    >({
      query: (queryArg) => {
        let url = '/express-types/';
        const args = {
          ...(queryArg.locale && { locale: queryArg.locale }),
          ...(queryArg.filters && { populate: queryArg.filters }),
        };
        const params = stringify(args, { encodeValuesOnly: true });
        params ? (url += `?${params}`) : null;
        return { url };
      },
    }),
    geti18nExpressTypesById: builder.query<
      GetExpressTypesByIdApiResponse,
      Geti18nExpressTypesByIdApiArgs
    >({
      query: (queryArg) => {
        let url = `/express-types/${queryArg.id}`;
        const args: Geti18nCategoriesArgs = {
          ...(queryArg.locale && { locale: queryArg.locale }),
          ...(queryArg.populate && { populate: queryArg.populate }),
          ...(queryArg.filters && { filters: queryArg.filters }),
        };
        const params = stringify(args, { encodeValuesOnly: true });
        params ? (url += `?${params}`) : null;
        return { url };
      },
    }),

    geti18nManuals: builder.query<GetManualsApiResponse, Geti18nManualsApiArgs>(
      {
        query: (queryArg) => {
          let url = '/manuals/';
          const args = {
            ...(queryArg.locale && { locale: queryArg.locale }),
            ...(queryArg.filters && { filters: queryArg.filters }),
            ...(queryArg.populate && { populate: queryArg.populate }),
          };
          const params = stringify(args, { encodeValuesOnly: true });
          params ? (url += `?${params}`) : null;
          return { url };
        },
      }
    ),
  }),
});

export interface StrapiIcon {
  data?: {
    id?: string;
    attributes?: {
      name?: string;
      alternativeText?: string;
      caption?: string;
      width?: number;
      height?: number;
      formats?: any;
      hash?: string;
      ext?: string;
      mime?: string;
      size?: number;
      url?: string;
    };
  };
}

export interface TagItem {
  id: number;
  label: string;
  icon: StrapiIcon;
}

export const {
  useGetFullServicesByIdQuery,
  useGeti18nServicesQuery,
  useGeti18nServicesFeaturedQuery,
  useGeti18nCategoriesQuery,
  useGetFullCategoriesByIdQuery,
  useGeti18nExpressTypesQuery,
  useGeti18nExpressTypesByIdQuery,
  useGeti18nManualsQuery,
} = strapiSlice;
