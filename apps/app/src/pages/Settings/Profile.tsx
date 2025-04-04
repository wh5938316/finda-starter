import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveIcon from '@mui/icons-material/Save';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function ProfileSettings() {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        个人资料
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <IconButton
                  sx={{
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                  size="small"
                >
                  <CameraAltIcon fontSize="small" />
                </IconButton>
              }
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  border: '4px solid #fff',
                  boxShadow: 1,
                }}
                alt="用户头像"
                src="/placeholder-avatar.jpg"
              />
            </Badge>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
                基本信息
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth label="姓名" defaultValue="张三" variant="outlined" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth label="用户名" defaultValue="zhangsan" variant="outlined" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="邮箱"
                    defaultValue="zhangsan@example.com"
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="个人简介"
                    defaultValue="这是我的个人简介..."
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" startIcon={<SaveIcon />} sx={{ px: 3 }}>
                保存修改
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
