import React from 'react';

import {FlashList} from '@shopify/flash-list';

import {useListUsers} from '@query';

export default function ListUsersScreen() {
  const {dataList, hasNextPage, fetchNextPage} = useListUsers();

  return (
    <FlashList
      data={dataList}
      renderItem={() => {
        return null;
      }}
    />
  );
}
