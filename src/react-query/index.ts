import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {getRecoil} from 'recoil-nexus';

import {TLogin, TToken, TUser, tUser, TUserJob} from '@appTypes/app.zod';
import {MutateOpts} from '@appTypes/propsType.type';
import {atomApiHost} from '@recoils';
import {createPagingResultSchema, createResultSchema} from '@utils';

export function useListUsers() {
  const host = getRecoil(atomApiHost);
  const queryKey = [host, 'list-users'];
  const {obj} = createPagingResultSchema(tUser);

  const query = useInfiniteQuery(queryKey, {
    async queryFn({pageParam = 1}) {
      const data = await axios.get<typeof obj>(
        `${host}/users?page=${pageParam}`,
      );

      return data.data;
    },
    getNextPageParam({page, total_pages}) {
      return page >= total_pages ? false : page + 1;
    },
  });

  const dataList = query.data?.pages.map(page => page.data).flat();

  return {...query, queryKey, dataList};
}

export function useUser(id?: string) {
  const host = getRecoil(atomApiHost);
  const {obj} = createResultSchema(tUser);

  return useQuery([host, 'user', id], {
    enabled: !!id,
    async queryFn() {
      const data = await axios.get<typeof obj>(`${host}/users/${id}`);

      return data.data;
    },
  });
}

export function useNewUser(mutateOpts?: MutateOpts) {
  const host = getRecoil(atomApiHost);

  return useMutation((user: TUser) => {
    const {id, email, first_name, last_name} = user;
    return axios.post<string>(`${host}/users/${id}`, {
      name: `${first_name} ${last_name}`,
      job: email,
    });
  }, mutateOpts);
}

export function useEditUser(mutateOpts?: MutateOpts) {
  const host = getRecoil(atomApiHost);

  return useMutation((user: TUser) => {
    const {id, email, first_name, last_name} = user;
    return axios.put<TUserJob>(`${host}/users/${id}`, {
      name: `${first_name} ${last_name}`,
      job: email,
    });
  }, mutateOpts);
}

export function useDeleteUser(mutateOpts?: MutateOpts) {
  const host = getRecoil(atomApiHost);

  return useMutation((id: string) => {
    return axios.delete<void>(`${host}/users/${id}`);
  }, mutateOpts);
}

export function useLogin(mutateOpts?: MutateOpts) {
  const host = getRecoil(atomApiHost);

  return useMutation((body: TLogin) => {
    return axios.post<TToken>(`${host}/login`, body);
  }, mutateOpts);
}
