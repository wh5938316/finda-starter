import type { Components, Theme } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { toastClasses } from 'material-ui-toaster';

import { blue, green, orange, red } from '../themePrimitives';

const thirdPartCustomizations: Components<Theme> = {
  MuiToast: {
    styleOverrides: {
      root: ({ theme }) => ({
        // 自定义成功类型样式
        [`&.${toastClasses.typeSuccess} .${toastClasses.content}`]: {
          borderColor: green[100],
          [`& .${toastClasses.closeButton}`]: {
            borderColor: green[100],
          },
        },
        [`&.${toastClasses.typeInfo} .${toastClasses.content}`]: {
          color: theme.palette.info.main,
          borderColor: blue[100],
          [`& .${toastClasses.closeButton}`]: {
            borderColor: blue[100],
          },
        },
        [`&.${toastClasses.typeWarning} .${toastClasses.content}`]: {
          borderColor: orange[100],
          [`& .${toastClasses.closeButton}`]: {
            borderColor: orange[100],
          },
        },
        [`&.${toastClasses.typeError} .${toastClasses.content}`]: {
          borderColor: red[100],
          [`& .${toastClasses.closeButton}`]: {
            borderColor: red[100],
          },
        },
        // 添加边框
        '& .MuiToast-content': {
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius + 2,
        },
      }),
      content: ({ theme }) => ({
        border: '1px solid',
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.divider,
        boxShadow: '0 4px 12px rgba(0,0,0,.1)',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,.1)',
        },
      }),
      closeButton: ({ theme }) => ({
        left: -10,
        top: -10,
        width: 20,
        height: 20,
        color: 'inherit',
        borderRadius: '50%',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid',
        borderColor: theme.palette.divider,
        [`& .${svgIconClasses.root}`]: {
          fontSize: 12,
          fill: 'currentColor',
        },
        '&:hover': {
          backgroundColor: theme.palette.background.paper,
        },
      }),
    },
  },
  // 自定义 Toaster 组件样式
  MuiToaster: {
    styleOverrides: {
      root: () => ({
        // 增加间距
        '&.MuiToaster-positionBottomRight': {
          bottom: 32,
          right: 32,
        },
      }),
    },
  },
};

export { thirdPartCustomizations };
