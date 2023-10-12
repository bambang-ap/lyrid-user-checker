import React from 'react';

import {Text as Txt} from 'react-native-paper';

import {TextProps} from '@appTypes/propsType.type';
import {classNames} from '@utils';

export function Text({children, twClass}: TextProps) {
  return <Txt tw={classNames('text-black', twClass)}>{children}</Txt>;
}
