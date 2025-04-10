'use client';

import DefaultPropsProvider from '@mui/material/DefaultPropsProvider';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

import CheckBoxOutlineBlankIcon from './icons/CheckBoxOutlineBlankIcon';
import CheckIcon from './icons/CheckIcon';
import CloseIcon from './icons/CloseIcon';
import ExpandMoreIcon from './icons/ExpandMoreIcon';
import RemoveIcon from './icons/RemoveIcon';
import UnfoldMoreIcon from './icons/UnfoldMoreIcon';

// 解决嵌套组件定义问题，将组件提取为顶层组件
const SelectIconComponent = ({
  ref: reference,
  ...properties
}: SvgIconProps & { ref?: React.RefObject<SVGSVGElement | null> }) => (
  <UnfoldMoreIcon fontSize="small" {...properties} ref={reference} />
);

interface MuiProviderProperties {
  children: React.ReactNode;
}

export default function MuiProvider(properties: MuiProviderProperties) {
  const { children } = properties;

  return (
    <DefaultPropsProvider
      value={{
        MuiButton: {
          disableRipple: true,
        },
        MuiButtonBase: {
          disableRipple: true,
          disableTouchRipple: true,
        },
        MuiButtonGroup: {
          disableRipple: true,
        },
        MuiChip: {
          size: 'small',
        },
        MuiIconButton: {
          disableRipple: true,
          variant: 'outlined',
        },
        MuiSvgIcon: {
          fontSize: 'small',
        },
        MuiTooltip: {
          slotProps: {
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -8],
                  },
                },
              ],
            },
          },
        },
        MuiCheckbox: {
          disableRipple: false,
          icon: <CheckBoxOutlineBlankIcon sx={{ color: 'hsla(210, 0%, 0%, 0.0)' }} />,
          checkedIcon: <CheckIcon sx={{ height: 14, width: 14 }} />,
          indeterminateIcon: <RemoveIcon sx={{ height: 14, width: 14 }} />,
        },
        MuiSelect: {
          IconComponent: SelectIconComponent,
        },
        MuiLink: {
          underline: 'none',
        },
        MuiAutocomplete: {
          slotProps: {
            paper: {
              variant: 'popper',
            },
          },
          popupIcon: <ExpandMoreIcon />,
          clearIcon: <CloseIcon />,
        },
        MuiAccordion: {
          elevation: 0,
          disableGutters: true,
        },
        MuiPaper: {
          elevation: 0,
        },
        MuiTextField: {
          slotProps: {
            // 因为 MuiTextField 的 inputLabel 默认是不会 shrink 的，所以这里设置为 true
            // 否则在定制的主题中，placeholder被隐藏
            inputLabel: {
              shrink: true,
            },
          },
        },
      }}
    >
      {children}
    </DefaultPropsProvider>
  );
}
