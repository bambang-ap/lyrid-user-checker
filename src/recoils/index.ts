import {atom} from 'recoil';

import {MenuList} from '@appTypes/navigators.type';

export const atomMenu = atom<MenuList>({
  key: 'atomMenu',
  default: MenuList.Chats,
});

export const atomMessageSearch = atom({
  key: 'atomMessageSearch',
  default: {isSearching: false, searchText: '', currentIndex: -1},
});
