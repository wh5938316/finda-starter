import type {
  Field,
  FormContextType,
  GlobalUISchemaOptions,
  RJSFSchema,
  StrictRJSFSchema,
  UIOptionsType,
} from '@rjsf/utils';

import type widgets from '../widgets';

// 获取 widgets 的键类型
type WidgetType = keyof typeof widgets;

type MakeUIType<Type, T = unknown, FT extends Record<string, unknown> = Record<string, unknown>> = {
  [Property in keyof Type as `ui:${string & Property}`]: Type[Property];
} & FT & {
    'ui:order'?: (keyof T)[];
    'ui:widget'?:
      | WidgetType
      | 'checkbox'
      | 'checkboxes'
      | 'radio'
      | 'select'
      | 'text'
      | 'textarea'
      | 'date-picker'
      | 'switch';
    'ui:help'?: string;
    'ui:placeholder'?: string;
  };

// 首先定义一个辅助类型来处理数组字段的UI配置
type ArrayFieldUISchema<
  T,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
> = {
  'ui:options'?: {
    orderable?: boolean;
    addable?: boolean;
    removable?: boolean;
    inline?: boolean;
    rows?: number;
  };
  items?: T extends Array<infer Item>
    ? UISchemaType<Item, S, F> & MakeUIType<UIOptionsType<Item, S, F>, Item>
    : never;
} & MakeUIType<UIOptionsType<T, S, F>, T>;

// 主要的UISchema类型构建
type UISchemaType<
  T,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
> = T extends object
  ? {
      [K in keyof T]?: T[K] extends Array<unknown>
        ? ArrayFieldUISchema<T[K], S, F>
        : T[K] extends object
          ? UISchemaType<T[K], S, F> & MakeUIType<UIOptionsType<T[K], S, F>, T[K]>
          : MakeUIType<UIOptionsType<T[K], S, F>, T[K]>;
    }
  : MakeUIType<UIOptionsType<T, S, F>, T>;

export type MyUiSchema<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
  FormType = Record<string, unknown>,
> = UISchemaType<FormType, S, F> & {
  'ui:globalOptions'?: GlobalUISchemaOptions;
  'ui:rootFieldId'?: string;
  'ui:field'?: Field<T, S, F> | string;
  'ui:fieldReplacesAnyOrOneOf'?: boolean;
  'ui:options'?: {
    inline?: boolean;
    rows?: number;
    orderable?: boolean;
    addable?: boolean;
    removable?: boolean;
  };
};
