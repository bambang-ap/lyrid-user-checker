import React, {useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';

import {useForm} from 'react-hook-form';
import {FAB} from 'react-native-paper';

import AppScreen from '@appComp/AppScreen';
import {TUser} from '@appTypes/app.zod';
import {RootStackList} from '@appTypes/navigators.type';
import {Icon, Input} from '@components';
import {ESubmitType} from '@constants/enum.const';
import {withLoader} from '@hoc/withLoader';
import {useDeleteUser, useEditUser, useNewUser, useUser} from '@query';
import {prompt, useStackNavigation} from '@utils';

type FormType = {
  type: ESubmitType;
  user?: TUser;
};

export default withLoader(function UserScreen({mutateOpts}) {
  const [isEditing, setIsEditing] = useState(false);
  const {navigation, route} = useStackNavigation<RootStackList.User>();
  const {id} = route.params ?? {};

  const {data} = useUser(id);
  const {mutateAsync: addUser} = useNewUser(mutateOpts);
  const {mutateAsync: editUser} = useEditUser(mutateOpts);
  const {mutateAsync: deleteUser} = useDeleteUser(mutateOpts);
  const {control, watch, reset, handleSubmit} = useForm<FormType>({
    defaultValues: {type: ESubmitType.Add},
  });

  const dataForm = watch();

  const {type, user} = dataForm;
  const {avatar} = user ?? {};

  const isEdit = type === ESubmitType.Edit;
  const isDisabled = isEdit && !isEditing;
  const labelSave = isEdit ? 'Save' : 'Submit';
  const iconSave = isEdit
    ? 'content-save-edit-outline'
    : 'content-save-outline';

  const onSave = handleSubmit(async value => {
    if (isEdit) {
      await editUser(value.user!);
      setIsEditing(false);
      prompt('Success edit user');
    } else {
      await addUser(value.user!);
      prompt('Success add user');
    }
  });

  useEffect(() => {
    if (id) reset(prev => ({...prev, type: ESubmitType.Edit}));
  }, [id, reset]);

  useEffect(() => {
    if (data) reset(prev => ({...prev, user: data.data}));
  }, [data, reset]);

  useEffect(() => {
    function resetEdit() {
      setIsEditing(false);
      reset(prev => ({...prev, user: data?.data}));
    }

    function removeUser() {
      prompt('Delete this user?', {
        async onConfirm() {
          await deleteUser(id!);
          prompt('Success remove user', {
            noCancel: true,
            confirmText: 'Ok',
            onConfirm: navigation.goBack,
          });
        },
      });
    }

    if (isEdit) {
      navigation.setOptions({
        headerRight: () =>
          isEditing ? (
            <TouchableOpacity onPress={resetEdit}>
              <Icon name="close" />
            </TouchableOpacity>
          ) : (
            <View tw="flex-row">
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Icon name="circle-edit-outline" />
              </TouchableOpacity>
              <TouchableOpacity tw="ml-4" onPress={removeUser}>
                <Icon name="trash-can-outline" />
              </TouchableOpacity>
            </View>
          ),
      });
    }
  }, [data?.data, deleteUser, id, isEdit, isEditing, navigation, reset]);

  return (
    <AppScreen>
      <FAB
        icon={iconSave}
        label={labelSave}
        onPress={onSave}
        tw="absolute bottom-4 right-4 z-10"
        visible={isEdit ? isEditing : true}
      />

      <ScrollView>
        <View className="items-center mb-4">
          {avatar && (
            <Image tw="w-32 h-32 rounded-full" source={{uri: avatar}} />
          )}
        </View>
        <Input
          disabled={isDisabled}
          control={control}
          label="Email"
          fieldName="user.email"
          twClass="mb-2"
        />
        <Input
          disabled={isDisabled}
          control={control}
          label="First Name"
          fieldName="user.first_name"
          twClass="mb-2"
        />
        <Input
          disabled={isDisabled}
          control={control}
          label="Last Name"
          fieldName="user.last_name"
        />
      </ScrollView>
    </AppScreen>
  );
});
