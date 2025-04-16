import { FormatListNumbered } from '@mui/icons-material';
import { MenuButton, useRichTextEditorContext } from 'mui-tiptap';
import * as React from 'react';

export default function MenuButtonSteps() {
  const editor = useRichTextEditorContext();

  if (!editor) {
    return null;
  }

  return (
    <MenuButton
      tooltipLabel="添加步骤列表"
      tooltipShortcutKeys={['Shift', 'Alt', 'S']}
      IconComponent={FormatListNumbered}
      selected={editor.isActive('steps')}
      onClick={() => {
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'stepsContainer',
            content: [
              {
                type: 'stepItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: '描述你的第一个步骤...',
                      },
                    ],
                  },
                ],
              },
            ],
          })
          .run();
      }}
      disabled={!editor.isEditable}
    />
  );
}
