import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {getRecoil} from 'recoil-nexus';

import {tUser} from '@appTypes/app.zod';
import {API_HOST} from '@constants';
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

export function useMutateNewChat() {
  return useMutation((message: string) => {
    return axios.post<string>(`${API_HOST}/chats/${message}`);
  });
}
