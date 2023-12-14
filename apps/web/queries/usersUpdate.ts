import { apiClient as defaultApiClient, ApiClientOptions } from '@rckit/api-client';

export interface UserUpdateParams {
  _id?: string;
  id?: string;
}

export interface UserUpdateData {
  info?: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
}

export interface UserUpdateResponse {
  // items: UserListItem[];
  // limit: number;
  // skip: number;
  // total: number;
}

export async function fetchUserUpdate(
  params?: UserUpdateParams,
  data?: UserUpdateData,
  { apiClient = defaultApiClient }: ApiClientOptions = {},
) {
  // const { limit, skip } = params || {};
  // TODO: change any
  const { data: resData } = await apiClient.request<any, any>({
    method: 'post',
    url: '/api/users/update',
    params,
    data,
  });
  // console.log({data})
  // TODO: check data
  // console.log({ data });
  return resData;
}
