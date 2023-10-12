import {PropsWithChildren} from 'react';

import {IconProps as PropsIcon} from 'react-native-vector-icons/Icon';

export type IconProps = Pick<PropsIcon, 'onPress'> & {
  /**
   * find icon name on https://static.enapter.com/rn/icons/material-community.html
   */
  name: string;
  tw?: string;
};

export type AppScreenProps = PropsWithChildren<{twClass?: string}>;

export type MessagesRef = {
  scrollToIndex?: (index: number) => void;
};

export type InputProps = {
  placeholder?: string;
  autoFocus?: boolean;
  multiline?: boolean;
  label?: string;
};

export type PromptOptions = {
  onConfirm: NoopVoid;
  onCancel?: NoopVoid;
  cancelText?: string;
  confirmText?: string;
};
