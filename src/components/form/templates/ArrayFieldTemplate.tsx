import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import type { ArrayFieldTemplateProps } from '@rjsf/utils';

const ArrayFieldTemplate = ({
  title,
  items,
  canAdd,
  onAddClick,
  required,
}: ArrayFieldTemplateProps) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      {(title || canAdd) && (
        <CardHeader
          title={
            title && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" component="h3">
                  {title}
                  {required && (
                    <Box component="span" sx={{ ml: 0.5, color: 'error.main' }}>
                      *
                    </Box>
                  )}
                </Typography>
              </Box>
            )
          }
          action={
            canAdd && (
              <Button variant="contained" size="small" startIcon={<Add />} onClick={onAddClick}>
                添加
              </Button>
            )
          }
          sx={{
            p: 2,
            px: 4,
            bgcolor: 'grey.50',
            borderBottom: (theme) => `4px solid ${theme.palette.primary.main}`,
          }}
        />
      )}
      <Divider />
      <CardContent sx={{ p: 0 }}>
        {items.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              暂无内容，点击上方添加按钮新增
            </Typography>
          </Box>
        ) : (
          <Box>
            {items.map((item) => (
              <Box
                key={item.key}
                sx={{
                  position: 'relative',
                  p: 2,
                  '&:hover .remove-btn': {
                    opacity: 1,
                  },
                }}
              >
                <Box sx={{ pr: 6 }}>{item.children}</Box>
                {item.hasRemove && (
                  <IconButton
                    className="remove-btn"
                    size="small"
                    onClick={item.onDropIndexClick(item.index)}
                    sx={{
                      position: 'absolute',
                      right: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      opacity: 0,
                      transition: 'opacity 0.2s',
                    }}
                    title="删除"
                    color="error"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ArrayFieldTemplate;
