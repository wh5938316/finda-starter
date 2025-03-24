export const defaultTemplate = (variables, { tpl }) => {
  const svgIconWrapper = {
    type: 'JSXElement',
    openingElement: {
      type: 'JSXOpeningElement',
      name: { type: 'JSXIdentifier', name: 'SvgIcon' },
      attributes: [
        {
          type: 'JSXSpreadAttribute',
          argument: { type: 'Identifier', name: 'props' }
        }
      ],
      selfClosing: false
    },
    closingElement: {
      type: 'JSXClosingElement',
      name: { type: 'JSXIdentifier', name: 'SvgIcon' }
    },
    children: [variables.jsx] // 将原来的 JSX 内容作为子元素
  };

  return tpl`
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const ${variables.componentName} = (props: SvgIconProps) => {
  return (
    ${svgIconWrapper}
  );
}
 
${variables.exports};
`;
};
