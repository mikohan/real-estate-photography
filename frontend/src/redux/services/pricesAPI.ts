import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPrice } from 'interfaces/IPrice';

export const pricesApi = createApi({
  reducerPath: 'pricesApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/'
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
console.log(process.env.BACKEND_API_URL);

export const { useGetPricesQuery, useGetPriceByIdQuery } = pricesApi;
