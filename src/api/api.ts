import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IObjectsResponse,
  RequestSearchParams,
  IObjectResponse,
} from '../types';

const BASE_URL = 'https://beers-api.vercel.app/api/beers';

export const API = createApi({
  reducerPath: 'stapi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getObjects: build.query<IObjectsResponse, RequestSearchParams>({
      query: ({
        searchString,
        pageNumber,
      }: {
        searchString: string;
        pageNumber: number;
      }) => {
        const params = {
          page: pageNumber,
          search: searchString,
        };
        return {
          url: '',
          params,
        };
      },
    }),
    getObject: build.query<IObjectResponse, string>({
      query: (id: string) => `/${id}`,
    }),
  }),
});

export const { useGetObjectsQuery, useGetObjectQuery } = API;
