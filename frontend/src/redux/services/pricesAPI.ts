import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_API_URL } from 'config';
import { IPrice } from 'interfaces/IPrice';

export const pricesApi = createApi({
  reducerPath: 'pricesApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_API_URL
  }),
  endpoints: (builder) => ({
    getPrices: builder.query<IPrice[], null>({
      query: () => 'prices'
    }),
    getPriceById: builder.query<IPrice, { id: string }>({
      query: ({ id }) => `prices/${id}`
    })
  })
});

export const { useGetPricesQuery, useGetPriceByIdQuery } = pricesApi;
