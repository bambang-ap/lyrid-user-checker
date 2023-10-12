import React from 'react';
import {View} from 'react-native';

import {getHeaderTitle} from '@react-navigation/elements';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import {Appbar} from 'react-native-paper';

import {RootStackList, RootStackParamList} from '@appTypes/navigators.type';
import AuthScreen from '@screens/Auth';
import ListUsersScreen from '@screens/ListUsers';
import UserScreen from '@screens/User';
import {twColor} from '@utils';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={RootStackList.Auth}
      screenOptions={{header: CustomNavBar}}>
      <Stack.Screen
        options={{header: noop}}
        name={RootStackList.Auth}
        component={AuthScreen}
      />
      <Stack.Screen name={RootStackList.Users} component={ListUsersScreen} />
      <Stack.Screen name={RootStackList.User} component={UserScreen} />
    </Stack.Navigator>
  );
}
function CustomNavBar(props: NativeStackHeaderProps) {
  const {navigation, route, options, back} = props;

  const {headerRight: HRight} = options;

  const title = getHeaderTitle(options, route.name);

  const canGoBack = !!back;

  return (
    <Appbar.Header mode="center-aligned" tw="bg-slate-200 rounded-b-3xl">
      {canGoBack && (
        <Appbar.BackAction color={twColor.black} onPress={navigation.goBack} />
      )}
      <Appbar.Content color={twColor.black} title={title} />
      {!!HRight && (
        <View tw="mr-2">
          {/* @ts-ignore */}
          <HRight canGoBack={canGoBack} />
        </View>
      )}
    </Appbar.Header>
  );
}
