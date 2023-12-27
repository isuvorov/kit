import { apiClient as defaultApiClient, ApiClientOptions } from '@rckit/api-client';
import { useQuery } from '@tanstack/react-query';

export interface UserFindOneParams {
  _id?: string;
  id?: string;
}
// export interface UserFindOneInfinityParams extends Omit<UserFindOneParams, 'skip' | 'limit'> {
//   pageSize?: number;
// }

export interface UserFindOneResponse {
  id: string;
  info?: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
  email?: string;
  role?: string;
  companyId?: string;
  // avatar?: string;
}

export async function fetchUserFindOne(
  params?: UserFindOneParams,
  { apiClient = defaultApiClient }: ApiClientOptions = {},
) {
  // console.log({ params });
  // TODO: change any
  const { data } = await apiClient.request<any, any>({
    method: 'get',
    url: '/api/users/findOne',
    params,
  });
  // console.log({ data });
  // console.log({data})
  // TODO: check data
  // console.log({ data });
  return data;
}

export function getUserFindOneQueryKey(params?: UserFindOneParams) {
  return ['userFindOne', params];
}

export function getUserFindOneQuery(params?: UserFindOneParams, options?: ApiClientOptions) {
  return {
    queryKey: getUserFindOneQueryKey(params),
    // TODO: change any
    queryFn: (queryProps: any) => fetchUserFindOne(params, { ...queryProps, ...options }),
  };
}

export const useUserFindOneQuery = (params?: UserFindOneParams, options?: ApiClientOptions) =>
  useQuery<UserFindOneResponse>(getUserFindOneQuery(params, options));
