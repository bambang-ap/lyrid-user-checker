import React, {useState} from 'react';
import {Modal, View, ActivityIndicator} from 'react-native';

import {MutateOpts} from '@appTypes/propsType.type';
import {mutateCallback} from '@utils';

type WrappedProps<T extends {}> = Omit<T, keyof CtrlProps<T>> & T;

export type CtrlProps<T extends {} = {}> = T & {
  show: NoopVoid;
  hide: NoopVoid;
  mutateOpts?: MutateOpts;
};

export function withLoader<T extends {}>(
  Comp: (ctrlProps: CtrlProps<T>) => JSX.Element,
  withDefault = true,
) {
  return function Decorated(props: WrappedProps<T>) {
    const [visible, setVisible] = useState(false);

    const mutateOpts = mutateCallback({show, hide}, withDefault);

    function show() {
      setVisible(true);
    }

    function hide() {
      setVisible(false);
    }

    return (
      <>
        <Comp show={show} hide={hide} mutateOpts={mutateOpts} {...props} />
        <Modal visible={visible} transparent>
          <View tw="bg-black-opacity flex-1 items-center justify-center">
            <View className="bg-white rounded-3xl p-8">
              <ActivityIndicator size="large" />
            </View>
          </View>
        </Modal>
      </>
    );
  };
}

withLoader(function ({}) {
  return <></>;
});
