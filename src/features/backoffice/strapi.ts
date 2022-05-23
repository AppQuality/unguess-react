import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetServicesByIdApiResponse } from ".";

interface GetFullServicesByIdArgs {
    id: string;
    populate?: string[];
}

export const strapiSlice = createApi({
  reducerPath: "strapi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_STRAPI_API_URL,
    prepareHeaders: (headers) => {
      if (process.env.REACT_APP_STRAPI_API_TOKEN) {
        const token = process.env.REACT_APP_STRAPI_API_TOKEN;
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFullServicesById: builder.query<
      GetServicesByIdApiResponse,
      GetFullServicesByIdArgs
    >({
      query: (queryArg) => ({ url: `/services/${queryArg.id}` }),
    }),
  }),
});


export const { useGetFullServicesByIdQuery } = strapiSlice;