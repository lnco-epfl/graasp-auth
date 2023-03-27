import { configureQueryClient } from '@graasp/query-client';

import { API_HOST, DOMAIN } from './constants';
import notifier from './notifier';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
} = configureQueryClient({
  API_HOST,
  // avoid refetching when same data are closely fetched
  defaultQueryOptions: {
    keepPreviousData: true,
    staleTime: 1000, // ms
    cacheTime: 1000,
  },
  notifier,
  DOMAIN,
});

export {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
};