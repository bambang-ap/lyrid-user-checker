import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import axios from 'axios';

import {TChat, TUser} from '@appTypes/data.type';
import {API_HOST} from '@constants';

export function useListUsers() {
  return useQuery(['list-users'], () =>
    axios.get<ApiResponse<TUser[]>>(`${API_HOST}/users`),
  );
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
