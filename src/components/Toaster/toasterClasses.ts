import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_generateUtilityClasses as generateUtilityClasses,
} from '@mui/utils';

export interface ToasterClasses {
  /** 应用于根元素 */
  root: string;
  /** 应用于容器元素 */
  container: string;
  /** 应用于底部右侧位置的根元素 */
  positionBottomRight: string;
  /** 应用于底部左侧位置的根元素 */
  positionBottomLeft: string;
  /** 应用于顶部右侧位置的根元素 */
  positionTopRight: string;
  /** 应用于顶部左侧位置的根元素 */
  positionTopLeft: string;
  /** 应用于展开状态的根元素 */
  expanded: string;
}

export type ToasterClassKey = keyof ToasterClasses;

export function getToasterUtilityClass(slot: string): string {
  return generateUtilityClass('MuiToaster', slot);
}

const toasterClasses: ToasterClasses = generateUtilityClasses('MuiToaster', [
  'root',
  'container',
  'positionBottomRight',
  'positionBottomLeft',
  'positionTopRight',
  'positionTopLeft',
  'expanded',
]);

export default toasterClasses;
