export enum RootStackList {
  Auth = 'Auth',
  ListUsers = 'ListUsers',
  User = 'User',
}

export type RootStackParamList = {
  [RootStackList.Auth]: undefined;
  [RootStackList.ListUsers]: undefined;
  [RootStackList.User]: undefined;
};
