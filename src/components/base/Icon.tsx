import * as React from 'react';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {IconProps} from '@appTypes/propsType.type';

export function Icon(props: IconProps) {
  return <MaterialIcon {...props} />;
}
