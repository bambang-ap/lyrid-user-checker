import {useInfiniteQuery, useMutation} from '@tanstack/react-query';
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
      const data = await axios.get<ApiResponse<typeof obj>>(
        `${host}/users?page=${pageParam}`,
      );

      return data.data.data;
    },
    getNextPageParam({page, total_pages}) {
      return page < total_pages;
    },
  });

  const dataList = query.data?.pages
    .map((page, index) =>
      page.data.map(chat => {
        /**
         * NOTE:
         * Prevent duplication of id, so keyExtractor will not encounter same key
         * Of course in production data this is unnecessary
         */
        return {...chat, id: `PAGE${index}-${chat.id}`};
      }),
    )
    .flat();

  return {...query, queryKey, dataList};
}

export function useUser(id: string) {
  const host = getRecoil(atomApiHost);
  const {obj} = createResultSchema(tUser);

  return useInfiniteQuery([host, 'user', id], {
    async queryFn() {
      const data = await axios.get<ApiResponse<typeof obj>>(
        `${host}/users/${id}`,
      );

      return data.data.data;
    },
  });
}

export function useListChats() {
  const queryKey = ['list-chats'];
  const query = useInfiniteQuery({
    queryKey,
    async queryFn({pageParam = 1}) {
      const chats = await axios.get<ApiResponsePagination<TChat>>(
        `${API_HOST}/chats/${pageParam}`,
      );

      return chats;
    },
    getNextPageParam: (lastPage, allPages) => {
      const [a, b] = [
        allPages.reduce(
          (count, page) => count + page?.data?.data?.data?.length,
          0,
        ),
        lastPage?.data?.data?.totalCount,
      ] as const;

      return a < b;
    },
  });

  const dataList = query.data?.pages
    .map((page, index) =>
      page?.data?.data?.data.map(chat => {
        /**
         * NOTE:
         * Prevent duplication of id, so keyExtractor will not encounter same key
         * Of course in production data this is unnecessary
         */
        return {...chat, id: `PAGE${index}-${chat.id}`};
      }),
    )
    .flat();

  return {...query, queryKey, dataList};
}

export function useMutateNewChat() {
  return useMutation((message: string) => {
    return axios.post<ApiResponse>(`${API_HOST}/chats/${message}`);
  });
}
