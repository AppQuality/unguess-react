import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { stringify } from 'qs';
import {
  GetCategoriesApiResponse,
  GetCategoriesByIdApiArg,
  GetCategoriesByIdApiResponse,
  GetManualsApiArg,
  GetManualsApiResponse,
  GetTemplatesByIdApiResponse,
} from '.';

interface GetFullServicesByIdArgs {
  id: string;
  populate?: string[] | object;
  locale?: string;
  filters?: object;
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

    getFullTemplatesById: builder.query<
      GetTemplatesByIdApiResponse,
      GetFullServicesByIdArgs
    >({
      query: (queryArg) => {
        let url = `/templates/${queryArg.id}`;
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
  id: string;
  label: string;
  icon: string;
}

export const {
  useGeti18nCategoriesQuery,
  useGetFullCategoriesByIdQuery,
  useGeti18nManualsQuery,
  useGetFullTemplatesByIdQuery,
} = strapiSlice;
