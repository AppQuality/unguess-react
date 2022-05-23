import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetServicesByIdApiResponse } from ".";
import { stringify } from "qs";
interface GetFullServicesByIdArgs {
  id: string;
  populate?: string[] | object;
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
      query: (queryArg) => {
        let url = `/services/${queryArg.id}`;
        if (queryArg.populate) {
          const params = stringify(
            { populate: queryArg.populate },
            {
              encodeValuesOnly: true,
            }
          );
          url += `?${params}`;
        }
        return { url: url };
      },
    }),
  }),
});

export const { useGetFullServicesByIdQuery } = strapiSlice;
