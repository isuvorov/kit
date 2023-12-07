import { omitNull } from '@lsk4/algos';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient as defaultApiClient, ApiClientOptions } from '@/rckit/api/apiClient';

export interface UserListParams {
  skip?: number;
  limit?: number;
  filter?: any;
  search?: string;
  sort?: {
    id: string;
    desc: boolean;
  }[];
}
export interface UserListInfinityParams extends Omit<UserListParams, 'skip'> {
  pageSize?: number;
}

export interface UserListItem {
  companyId: string;
  email: string;
  id: string;
  password: string;
  role: string;
}

export interface UserListResponse {
  items: UserListItem[];
  total: number;
}

export async function fetchUserList(
  params?: UserListParams,
  { apiClient = defaultApiClient }: ApiClientOptions = {},
) {
  const { limit, skip, ...other } = params || {};
  // TODO: change any
  const { data } = await apiClient.request<any, any>({
    method: 'post',
    url: '/api/users/list',
    params: omitNull({ limit, skip }, Boolean),
    data: other,
  });
  // console.log({data})
  // TODO: check data
  // console.log({ data });
  return data;
}

export function getUserListQueryKey(params?: UserListParams) {
  return ['userList', params];
}

export function getUserListQuery(params?: UserListParams, options?: ApiClientOptions) {
  return {
    queryKey: getUserListQueryKey(params),
    // TODO: change any
    queryFn: (queryProps: any) =>
      fetchUserList({ ...params, skip: queryProps.pageParam * (params?.limit || 0) }, options),
  };
}

export const useUserListQuery = (params?: UserListParams, options?: ApiClientOptions) =>
  useQuery<UserListResponse>(getUserListQuery(params, options));

export const useUserListInfinityQuery = (
  params?: UserListInfinityParams,
  options?: ApiClientOptions,
) =>
  useInfiniteQuery<UserListResponse>({
    ...getUserListQuery(params, options),
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, _, lastPageParam: any) => {
      if (lastPage.total <= (lastPageParam + 1) * (params?.limit || 0)) {
        return undefined;
      }

      return lastPageParam + 1;
    },
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
