import {PropsWithChildren} from 'react';

import {UseMutationOptions} from '@tanstack/react-query';
import {IconProps as PropsIcon} from 'react-native-vector-icons/Icon';

import {TUser} from '@appTypes/app.zod';

export type MutateOpts = UseMutationOptions<any, any, any>;

// @components
export type PromptOptions = {
  onConfirm: NoopVoid;
  onCancel?: NoopVoid;
  cancelText?: string;
  confirmText?: string;
  noCancel?: boolean;
};

export type UserCardProps = TUser & {onPress?: NoopVoid};

export type AppScreenProps = PropsWithChildren<{twClass?: string}>;

// @baseComponents
export type TextProps = PropsWithChildren & {
  twClass?: string;
};

export type InputProps = {
  placeholder?: string;
  autoFocus?: boolean;
  multiline?: boolean;
  label?: string;
};

export type IconProps = Pick<PropsIcon, 'onPress'> & {
  /**
   * find icon name on https://static.enapter.com/rn/icons/material-community.html
   */
  name: string;
  tw?: string;
};
