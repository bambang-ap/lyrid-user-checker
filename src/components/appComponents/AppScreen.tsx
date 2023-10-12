import React from 'react';
import {View} from 'react-native';

import {AppScreenProps} from '@appTypes/propsType.type';
import {classNames} from '@utils';

export default function AppScreen({children, twClass}: AppScreenProps) {
  return (
    <View tw={classNames('bg-white flex-1 px-4 py-2', twClass)}>
      {children}
    </View>
  );
}
