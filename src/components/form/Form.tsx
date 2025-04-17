// src/components/form/Form.tsx
import { Box, Button } from '@mui/material';
import type { IChangeEvent } from '@rjsf/core';
import Form from '@rjsf/core';
import type { RJSFSchema, UiSchema, ValidatorType } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import type { PropsWithChildren } from 'react';

// 导入组件
import widgets from '../widgets';
import templates from './templates';

interface AutoFormProps<T extends object> {
  onSubmit: (data: T) => void;
  schema: RJSFSchema;
  uiSchema: UiSchema<T>;
}

function AutoForm<T extends object>({
  onSubmit,
  schema,
  uiSchema,
  children,
}: PropsWithChildren<AutoFormProps<T>>) {
  const handleSubmit = ({ formData }: { formData: T }) => {
    onSubmit?.(formData);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Form<T>
        schema={schema}
        uiSchema={uiSchema}
        widgets={widgets}
        validator={validator as ValidatorType<T, RJSFSchema>}
        templates={templates}
        showErrorList={false}
        onSubmit={(data: IChangeEvent<T>) => handleSubmit({ formData: data.formData! })}
      >
        {children ?? (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              提交
            </Button>
          </Box>
        )}
      </Form>
    </Box>
  );
}

export default AutoForm;
