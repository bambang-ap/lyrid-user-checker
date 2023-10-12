import {Alert} from 'react-native';

import clsx from 'clsx';
import {z} from 'zod';

import {MutateOpts, PromptOptions} from '@appTypes/propsType.type';
import {CtrlProps} from '@hoc/withLoader';

export * from './navigators';
export {default as twColor} from 'tailwindcss/colors';

export const classNames = clsx;

export function createResultSchema<T extends z.ZodTypeAny>(tSchema: T) {
  const schema = z.object({
    data: tSchema,
    support: z.object({
      url: z.string(),
      text: z.string(),
    }),
  });

  return {schema, obj: {} as z.infer<typeof schema>};
}

export function createPagingResultSchema<T extends z.ZodTypeAny>(tSchema: T) {
  const resultSchema = createResultSchema(z.array(tSchema));

  const schema = resultSchema.schema.extend({
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number(),
  });

  return {schema, obj: {} as z.infer<typeof schema>};
}

export function entries<T extends object>(obj?: T) {
  if (!obj) return [];

  return Object.entries(obj) as Entries<T>;
}

export function prompt(message: string, options?: PromptOptions): void;
export function prompt(
  title: string,
  message: string,
  options?: PromptOptions,
): void;
export function prompt(
  titleOrMessage: string,
  messageOrOptions?: string | PromptOptions,
  promptOptions?: PromptOptions,
) {
  const isHasTitle = typeof messageOrOptions === 'string';
  const options = isHasTitle ? promptOptions : messageOrOptions;

  const {onConfirm, cancelText, confirmText, onCancel, noCancel} =
    options ?? {};

  Alert.alert(
    isHasTitle ? titleOrMessage : 'Alert',
    isHasTitle ? messageOrOptions : titleOrMessage,
    !onConfirm
      ? [{text: 'Ok'}]
      : [
          {text: confirmText ?? 'Yes', onPress: onConfirm},
          noCancel ? {} : {text: cancelText ?? 'No', onPress: onCancel},
        ].filter(e => !!e.text),
  );
}

export function mutateCallback(
  {hide, show}: CtrlProps,
  withDefault = true,
): any {
  return {
    ...(withDefault
      ? {
          onError() {
            prompt('Something went wrong', 'Pleas try again');
          },
        }
      : {}),
    onMutate() {
      show?.();
    },
    onSettled() {
      hide?.();
    },
  } as MutateOpts;
}
