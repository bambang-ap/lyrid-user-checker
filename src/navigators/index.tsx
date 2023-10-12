import * as React from 'react';
import {View} from 'react-native';
import {} from 'tailwindcss';

import {getHeaderTitle} from '@react-navigation/elements';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import {useForm} from 'react-hook-form';
import {Appbar, Button, Menu, Text} from 'react-native-paper';

import {RootStackParamList} from '@appTypes/navigators.type';
import {Input} from '@components';
import {useStackNavigation} from '@utils/navigators';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: CustomNavigationBar,
        contentStyle: {padding: 20},
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
function CustomNavigationBar(props: NativeStackHeaderProps) {
  const {navigation, route, options, back} = props;

  const [visible, setVisible] = React.useState(false);

  const title = getHeaderTitle(options, route.name);

  function openMenu() {
    setVisible(true);
  }
  function closeMenu() {
    setVisible(false);
  }

  return (
    <Appbar.Header>
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

function HomeScreen() {
  const {navigation} = useStackNavigation();

  return (
    <View className={className}>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Details')}>
        Go to details
      </Button>
    </View>
  );
}

function DetailsScreen() {
  const {control} = useForm();
  return (
    <View className={className}>
      <Text>Details Screen</Text>
      <Input control={control} fieldName="jsdfksjfd" />
    </View>
  );
}

const className = '';
