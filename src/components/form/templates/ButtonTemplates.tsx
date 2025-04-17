import { Add, ArrowDownward, ArrowUpward, Delete } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import type { IconButtonProps } from '@rjsf/utils';

interface CustomButtonProps extends IconButtonProps {
  uiSchema?: Record<string, unknown>;
}

const ButtonTemplates = {
  SubmitButton: ({ uiSchema = {}, ...props }: CustomButtonProps) => {
    const submitOptions = uiSchema?.['ui:submitButtonOptions'] || {};
    const { submitText, props: submitProps = {} } = submitOptions;
    return (
      <Button type="submit" variant="contained" color="primary" {...submitProps}>
        {submitText || props.children || '提交'}
      </Button>
    );
  },
  AddButton: ({ ...props }: CustomButtonProps) => {
    return (
      <Button
        type="button"
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<Add fontSize="small" />}
        {...props}
      >
        {props.children || '添加'}
      </Button>
    );
  },
  RemoveButton: ({ ...props }: CustomButtonProps) => {
    return (
      <Button
        type="button"
        variant="outlined"
        color="error"
        size="small"
        startIcon={<Delete fontSize="small" />}
        {...props}
      >
        {props.children || '删除'}
      </Button>
    );
  },
  MoveDownButton: ({ ...props }: CustomButtonProps) => {
    return (
      <IconButton type="button" color="primary" size="small" {...props}>
        <ArrowDownward fontSize="small" />
      </IconButton>
    );
  },
  MoveUpButton: ({ ...props }: CustomButtonProps) => {
    return (
      <IconButton type="button" color="primary" size="small" {...props}>
        <ArrowUpward fontSize="small" />
      </IconButton>
    );
  },
};

export default ButtonTemplates;
