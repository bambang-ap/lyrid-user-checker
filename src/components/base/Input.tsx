import React from 'react';

import {FieldValues} from 'react-hook-form';
import {TextInput} from 'react-native-paper';

import {InputProps} from '@appTypes/propsType.type';
import {
  ControlledComponentProps,
  withReactFormController,
} from '@hoc/withReactHookForm';
import {classNames, twColor} from '@utils';

import {Text} from './Text';

function InputComponent<F extends FieldValues>(
  props: ControlledComponentProps<F, InputProps>,
) {
  const {
    controller,
    onSubmit,
    disabled,
    twClass,
    placeholder,
    autoFocus,
    multiline,
    secure,
  } = props;
  const {
    field: {value, onChange, ...field},
  } = controller;

  const label = props.label ?? field.name;

  return (
    <TextInput
      {...field}
      mode="outlined"
      label={<Text>{label.ucwords()}</Text>}
      multiline={multiline}
      autoFocus={autoFocus}
      value={value}
      onChangeText={onChange}
      tw={classNames('bg-white text-black', twClass)}
      textColor={twColor.black}
      disabled={disabled}
      placeholder={placeholder}
      underlineColor={twColor.transparent}
      onSubmitEditing={onSubmit}
      secureTextEntry={secure}
    />
  );
}

export const Input = withReactFormController(InputComponent);
