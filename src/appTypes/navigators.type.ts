import {TUser} from './data.type';

export enum RootStackList {
  Chats = 'Chats',
  Chat = 'Chat',
  UserInfo = 'UserInfo',
}

export enum MenuList {
  Chats = 'Chats',
  Status = 'Status',
  Calls = 'Calls',
}

export type RootStackParamList = {
  [RootStackList.Chats]: undefined;
  [RootStackList.Chat]: TUser;
  [RootStackList.UserInfo]: TUser;
};
