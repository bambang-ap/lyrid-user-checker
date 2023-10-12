import React from 'react';

import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';

import AppScreen from '@appComp/AppScreen';
import {TLogin} from '@appTypes/app.zod';
import {RootStackList} from '@appTypes/navigators.type';
import {Input, Text} from '@components';
import {withLoader} from '@hoc/withLoader';
import {useLogin} from '@query';
import {prompt, StackAction, useStackNavigation} from '@utils';

export default withLoader(function AuthScreen({mutateOpts}) {
  const {navigation} = useStackNavigation();
  const {mutateAsync} = useLogin(mutateOpts);
  const {control, handleSubmit} = useForm<TLogin>();

  const signIn = handleSubmit(async form => {
    try {
      const resp = await mutateAsync(form);
      if (resp.data.token)
        navigation.dispatch(StackAction('replace', RootStackList.Users));
    } catch (err) {
      // @ts-ignore
      prompt(err?.response.data?.error);
    }
  });

  return (
    <AppScreen twClass="flex-1 bg-white gap-y-2 justify-center">
      <Text twClass="text-center text-2xl font-semibold mb-4">
        Welcome to User Checker
      </Text>
      <Input
        twClass="my-2"
        control={control}
        fieldName="email"
        onSubmit={signIn}
      />
      <Input secure control={control} fieldName="password" onSubmit={signIn} />
      <Button onPress={signIn} mode="contained">
        Sign In
      </Button>
    </AppScreen>
  );
}, false);
