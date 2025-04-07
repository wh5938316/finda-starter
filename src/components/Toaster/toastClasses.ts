import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_generateUtilityClasses as generateUtilityClasses,
} from '@mui/utils';

export interface ToastClasses {
  /** 应用于根元素 */
  root: string;
  /** 应用于消息内容容器 */
  content: string;
  /** 应用于消息文本 */
  message: string;
  /** 应用于描述文本 */
  description: string;
  /** 应用于关闭按钮 */
  closeButton: string;
  /** 应用于成功类型通知 */
  typeSuccess: string;
  /** 应用于错误类型通知 */
  typeError: string;
  /** 应用于警告类型通知 */
  typeWarning: string;
  /** 应用于信息类型通知 */
  typeInfo: string;
  /** 应用于默认类型通知 */
  typeDefault: string;
  /** 应用于新添加的通知 */
  new: string;
  /** 应用于正在删除的通知 */
  deleting: string;
}

export type ToastClassKey = keyof ToastClasses;

export function getToastUtilityClass(slot: string): string {
  return generateUtilityClass('MuiToast', slot);
}

const toastClasses: ToastClasses = generateUtilityClasses('MuiToast', [
  'root',
  'content',
  'message',
  'description',
  'closeButton',
  'typeSuccess',
  'typeError',
  'typeWarning',
  'typeInfo',
  'typeDefault',
  'new',
  'deleting',
]);

export default toastClasses;
