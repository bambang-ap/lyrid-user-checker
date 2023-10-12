export enum RootStackList {
  Auth = 'Auth',
  Users = 'ListUsers',
  User = 'User',
}

export type RootStackParamList = {
  [RootStackList.Auth]: undefined;
  [RootStackList.Users]: undefined;
  [RootStackList.User]: undefined | {id: string};
};
