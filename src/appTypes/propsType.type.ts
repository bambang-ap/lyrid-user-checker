import {PropsWithChildren} from 'react';

import {FontAwesome5IconProps} from 'react-native-vector-icons/FontAwesome5';

import {TChat, TUser} from './data.type';

export type IconProps = Pick<FontAwesome5IconProps, 'onPress'> & {
  /**
   * find icon name on https://fontawesome.com/v5/search
   */
  name: string;
  className?: string;
};

export type AppScreenProps = PropsWithChildren<{className?: string}>;

export type UserBubblesProps = {users: TUser[]};

export type UserImageProps = TUser & {sizeClassName?: string};

export type ChatBubbleProps = TChat;

export type MessagesRef = {
  scrollToIndex?: (index: number) => void;
};

export type InputProps = {
  placeholder?: string;
  autoFocus?: boolean;
  multiline?: boolean;
  label?: string;
};
