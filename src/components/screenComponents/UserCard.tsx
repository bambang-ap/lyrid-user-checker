import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import {UserCardProps} from '@appTypes/propsType.type';
import {Text} from '@components';

export function UserCard(props: UserCardProps) {
  const {onPress, email, avatar, first_name, last_name} = props;

  const name = `${first_name} ${last_name}`;

  return (
    <TouchableOpacity
      onPress={onPress}
      tw="h-20 my-1 p-4 flex-row items-center bg-gray-500 rounded-2xl justify-between">
      <Image tw="w-10 h-10 rounded-full" source={{uri: avatar}} />
      <View className="flex-1 ml-4">
        <Text twClass="text-white">{name}</Text>
        <Text twClass="text-white">{email}</Text>
      </View>
    </TouchableOpacity>
  );
}
