import React from 'react';

import {getHeaderTitle} from '@react-navigation/elements';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import {Appbar, Menu} from 'react-native-paper';

import {RootStackList, RootStackParamList} from '@appTypes/navigators.type';
import AuthScreen from '@screens/Auth';
import ListUsersScreen from '@screens/ListUsers';
import UserScreen from '@screens/User';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={RootStackList.Auth}
      screenOptions={{header: CustomNavBar}}>
      <Stack.Screen name={RootStackList.Auth} component={AuthScreen} />
      <Stack.Screen
        name={RootStackList.ListUsers}
        component={ListUsersScreen}
      />
      <Stack.Screen name={RootStackList.User} component={UserScreen} />
    </Stack.Navigator>
  );
}
function CustomNavBar(props: NativeStackHeaderProps) {
  const {navigation, route, options, back} = props;

  const [visible, setVisible] = React.useState(false);

  const title = getHeaderTitle(options, route.name);
  const isAuth = route.name === RootStackList.Auth;

  function openMenu() {
    setVisible(true);
  }
  function closeMenu() {
    setVisible(false);
  }

  if (isAuth) return null;

  return (
    <Appbar.Header mode="small" tw="bg-slate-200 rounded-b-3xl">
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {!back && (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
          <Menu.Item
            onPress={() => {
              console.log('Option 1 was pressed');
            }}
            title="Option 1"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 2 was pressed');
            }}
            title="Option 2"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 3 was pressed');
            }}
            title="Option 3"
            disabled
          />
        </Menu>
      )}
    </Appbar.Header>
  );
}
