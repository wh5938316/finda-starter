import { Box, Card, CardContent, Typography } from '@mui/material';
import type { ObjectFieldTemplateProps } from '@rjsf/utils';

const ObjectFieldTemplate = ({
  title,
  description,
  properties,
  required,
}: ObjectFieldTemplateProps) => {
  return (
    <Box>
      {title && (
        <Box sx={{ mb: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6">
            {title}
            {required && (
              <Box component="span" sx={{ ml: 0.5, color: 'error.main' }}>
                *
              </Box>
            )}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {description}
            </Typography>
          )}
        </Box>
      )}
      <Card variant="outlined">
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {properties.map((prop) => prop.content)}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ObjectFieldTemplate;
