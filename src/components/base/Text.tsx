import React, {PropsWithChildren} from 'react';

import {Text as Txt} from 'react-native-paper';

export function Text({children}: PropsWithChildren) {
  return <Txt tw="text-black">{children}</Txt>;
}
