import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    endpoints: (builder) => ({}),
});
