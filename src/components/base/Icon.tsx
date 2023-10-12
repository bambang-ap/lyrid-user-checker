import * as React from 'react';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {IconProps} from '@appTypes/propsType.type';
import {twColor} from '@utils';

export function Icon(props: IconProps) {
  return <MaterialIcon size={24} color={twColor.black} {...props} />;
}
