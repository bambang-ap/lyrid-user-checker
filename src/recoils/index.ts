import {atom} from 'recoil';

import {API_HOST} from '@constants';

export const atomApiHost = atom<string>({
  key: 'atomApiHost',
  default: API_HOST,
});
