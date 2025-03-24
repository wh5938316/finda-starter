const muiImport = [
  {
    type: "ImportDeclaration",
    specifiers: [
      {
        type: "ImportDefaultSpecifier",
        local: { "type": "Identifier", "name": "SvgIcon" }
      },
    ],
    source: { type: "StringLiteral", value: "@mui/material/SvgIcon" }
  }
];

const muiTypeImport = [
  {
    type: 'ImportDeclaration',
    specifiers: [
      {
        type: 'ImportSpecifier',
        importKind: 'type',
        local: { type: 'Identifier', name: 'SvgIconProps' },
        imported: { type: 'Identifier', name: 'SvgIconProps' }
      }
    ],
    source: { type: 'StringLiteral', value: '@mui/material/SvgIcon' }
  }
];

const props = [
  {
    "type": "Identifier",
    "name": "props",
    "typeAnnotation": {
      "type": "TSTypeAnnotation",
      "typeAnnotation": {
        "type": "TSTypeReference",
        "typeName": { "type": "Identifier", "name": "SvgIconProps" },
        "typeParameters": null
      }
    }
  }
]

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
${variables.imports};
${muiImport};
${muiTypeImport};

${variables.interfaces};

const ${variables.componentName} = (${props}) => (
  ${svgIconWrapper}
);

${variables.exports};
`
}