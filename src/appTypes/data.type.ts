import {EUserType} from '@constants/enum.const';

type TPersonalUser = Extract<TUser, {type: EUserType.P}>;
type TUserType =
  | {
      type: EUserType.P;
    }
  | {type: EUserType.G; members: TPersonalUser[]};

export type TUser = {id: string; title: string; picture?: string} & TUserType;

export type TChat = {
  id: string;
  message: string;
  isYou: boolean;
} & (
  | {
      type: EUserType.P;
    }
  | {type: EUserType.G; sender: TPersonalUser}
);

export type TGroupChat = TChat & {sender: TPersonalUser};
