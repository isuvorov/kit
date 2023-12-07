import { omitNull } from '@lsk4/algos';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient as defaultApiClient, ApiClientOptions } from '@/rckit/api/apiClient';

export interface ProductListParams {
  skip?: number;
  limit?: number;
  filter?: any;
  sort: string | Record<string, number>;
}
export interface ProductListInfinityParams extends Omit<ProductListParams, 'skip' | 'limit'> {
  pageSize?: number;
}

export interface ProductListItem {
  _id: string;
  image: string;
  title: string;
  price: {
    currency: string;
    value: number;
  };
  likes: number;
  tags?: string[];
}

export interface ProductListResponse {
  items: ProductListItem[];
  limit: number;
  skip: number;
  total: number;
}

export async function fetchProductList(
  params?: ProductListParams,
  { apiClient = defaultApiClient }: ApiClientOptions = {},
) {
  const { limit, skip, ...other } = params || {};
  // TODO: change any
  const { data } = await apiClient.request<any, any>({
    method: 'post',
    url: '/api/products/list',
    params: omitNull({ limit, skip }, Boolean),
    data: other,
  });
  // TODO: check data
  return data;
}

export function getProductListQueryKey(params?: ProductListParams) {
  return ['productList', params];
}

export function getProductListQuery(params?: ProductListParams, options?: ApiClientOptions) {
  return {
    queryKey: getProductListQueryKey(params),
    // TODO: change any
    queryFn: (queryProps: any) => fetchProductList(params, { ...queryProps, ...options }),
  };
}

/// /////////////////

// invalidateProducts(queryClient, params) {
//   queryClient.invalidateQueries(getBotQueryKey(params));
// }

export const useProductListQuery = (params?: ProductListParams, options?: ApiClientOptions) =>
  useQuery<ProductListResponse>(getProductListQuery(params, options));

export const useProductListInfinityQuery = (
  params?: ProductListInfinityParams,
  options?: ApiClientOptions,
) =>
  useInfiniteQuery<ProductListResponse>({
    ...getProductListQuery(params, options),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage: any) => firstPage.prevCursor,
  });

// const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery<PersonApiResponse>(
//   ['table-data', sorting], // adding sorting state as key causes table to reset and fetch from new beginning upon sort
//   async ({ pageParam = 0 }) => {
//     const start = pageParam * fetchSize;
//     const fetchedData = await fetchData(start, fetchSize, sorting); // pretend api call
//     return fetchedData;
//   },
//   {
//     getNextPageParam: (_lastGroup, groups) => groups.length,
//     keepPreviousData: true,
//     refetchOnWindowFocus: false,
//   },
// );
