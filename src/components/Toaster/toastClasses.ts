import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_generateUtilityClasses as generateUtilityClasses,
} from '@mui/utils';

export interface ToastClasses {
  /** 应用于根元素 */
  root: string;
  /** 应用于内容元素 */
  content: string;
  /** 应用于消息元素 */
  message: string;
  /** 应用于描述元素 */
  description: string;
  /** 应用于关闭按钮 */
  closeButton: string;
  /** 应用于信息类型Toast */
  typeInfo: string;
  /** 应用于成功类型Toast */
  typeSuccess: string;
  /** 应用于警告类型Toast */
  typeWarning: string;
  /** 应用于错误类型Toast */
  typeError: string;
  /** 应用于默认类型Toast */
  typeDefault: string;
  /** 应用于新创建的Toast */
  new: string;
  /** 应用于正在删除的Toast */
  deleting: string;
}

export type ToastClassKey = keyof ToastClasses;

// 生成类名前缀为'MuiToast'的工具类
export function getToastUtilityClass(slot: string) {
  return generateUtilityClass('MuiToast', slot);
}

// 根据ToastClasses接口生成所有类名
export const toastClasses: ToastClasses = generateUtilityClasses('MuiToast', [
  'root',
  'content',
  'message',
  'description',
  'closeButton',
  'typeInfo',
  'typeSuccess',
  'typeWarning',
  'typeError',
  'typeDefault',
  'new',
  'deleting',
]);
