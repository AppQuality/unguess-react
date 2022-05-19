import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServicesApiResponse } from "./_types";

export const strapiSlice = createApi({
    reducerPath: "strapi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_STRAPI_URL,
        prepareHeaders: (headers) => {
            if (process.env.REACT_APP_STRAPI_TOKEN) {
                const token = process.env.REACT_APP_STRAPI_TOKEN;
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getServices: builder.query<getServicesApiResponse, void>({
            query: () => `services`,
        }),
    }),
});

export const { useGetServicesQuery } = strapiSlice
