import React from 'react';

import {Button} from 'react-native-paper';
import {useSetRecoilState} from 'recoil';

import AppScreen from '@appComp/AppScreen';
import {RootStackList} from '@appTypes/navigators.type';
import {API_HOST, API_HOST_REAL} from '@constants';
import {atomApiHost} from '@recoils';
import {StackAction, useStackNavigation} from '@utils';

export default function AuthScreen() {
  const setHost = useSetRecoilState(atomApiHost);

  const {navigation} = useStackNavigation();

  function navigate(host: string) {
    setHost(host);
    navigation.dispatch(StackAction('replace', RootStackList.ListUsers));
  }

  return (
    <AppScreen twClass="flex-1 gap-y-2 justify-center">
      <Button mode="contained" onPress={() => navigate(API_HOST)}>
        Reqres.in (Dummy data as test requirement)
      </Button>
      <Button mode="contained" onPress={() => navigate(API_HOST_REAL)}>
        Real Data
      </Button>
    </AppScreen>
  );
}
