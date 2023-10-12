import React from 'react';

import {FieldValues} from 'react-hook-form';
import {TextInput} from 'react-native-paper';

import {InputProps} from '@appTypes/propsType.type';
import {
  ControlledComponentProps,
  withReactFormController,
} from '@hoc/withReactHookForm';

function InputComponent<F extends FieldValues>(
  props: ControlledComponentProps<F, InputProps>,
) {
  const {controller, twClass, placeholder, autoFocus, multiline} = props;
  const {
    field: {value, onChange, ...field},
  } = controller;

  const label = props.label ?? field.name;

  return (
    <TextInput
      {...field}
      mode="outlined"
      label={label}
      multiline={multiline}
      autoFocus={autoFocus}
      value={value}
      onChangeText={onChange}
      tw={twClass}
      placeholder={placeholder}
    />
  );
}

export const Input = withReactFormController(InputComponent);
