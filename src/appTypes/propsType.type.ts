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
  onSubmit?: NoopVoid;
  secure?: boolean;
};

export type IconProps = Pick<PropsIcon, 'onPress'> & {
  /**
   * find icon name on https://fonts.google.com/icons?selected=Material+Icons+Outlined:hourglass_empty:&icon.query=sign
   */
  name: string;
  tw?: string;
};
