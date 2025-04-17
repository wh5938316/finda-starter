import { ArrowDownward, ArrowUpward, Delete } from '@mui/icons-material';
import { Box, IconButton, Paper } from '@mui/material';
import type { ArrayFieldTemplateItemType } from '@rjsf/utils';

const ArrayFieldItemTemplate = ({
  children,
  onDropIndexClick,
  index,
  hasRemove,
  hasMoveUp,
  hasMoveDown,
  onReorderClick,
}: ArrayFieldTemplateItemType) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        position: 'relative',
        p: 2,
        mb: 1,
        '&:hover .array-item-toolbar': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ pr: 5 }}>{children}</Box>
      <Box
        className="array-item-toolbar"
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          gap: 0.5,
          opacity: 0,
          transition: 'opacity 0.2s',
        }}
      >
        {hasMoveUp && (
          <IconButton
            size="small"
            onClick={onReorderClick(index, index - 1)}
            title="上移"
            color="primary"
          >
            <ArrowUpward fontSize="small" />
          </IconButton>
        )}
        {hasMoveDown && (
          <IconButton
            size="small"
            onClick={onReorderClick(index, index + 1)}
            title="下移"
            color="primary"
          >
            <ArrowDownward fontSize="small" />
          </IconButton>
        )}
        {hasRemove && (
          <IconButton size="small" onClick={onDropIndexClick(index)} title="删除" color="error">
            <Delete fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};

export default ArrayFieldItemTemplate;
