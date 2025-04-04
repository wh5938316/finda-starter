import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function SecuritySettings() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        安全设置
      </Typography>

      <Stack spacing={4}>
        {/* 修改密码 */}
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
          >
            <LockIcon sx={{ mr: 1 }} />
            修改密码
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="当前密码"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="切换密码可见性"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="新密码"
                type={showNewPassword ? 'text' : 'password'}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="切换密码可见性"
                        onClick={handleClickShowNewPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="确认新密码"
                type={showConfirmPassword ? 'text' : 'password'}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="切换密码可见性"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button variant="contained" color="primary">
                更新密码
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* 两步验证 */}
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
          >
            <SecurityIcon sx={{ mr: 1 }} />
            两步验证
          </Typography>

          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              sx={{
                ml: 0,
              }}
              control={<Switch color="primary" />}
              label="启用两步验证"
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              启用两步验证后，每次登录时除了密码外，还需要输入手机短信验证码。
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="手机号码"
            placeholder="请输入接收验证码的手机号码"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Button variant="outlined" color="primary">
            验证手机号码
          </Button>
        </Box>

        <Divider />

        {/* 登录活动 */}
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
          >
            登录活动
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            这些设备目前已登录到您的账户。您可以随时注销不需要的设备。
          </Typography>

          <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="subtitle2" color="primary.main">
              当前设备
            </Typography>
            <Typography variant="body2">Windows 10 • Chrome • 北京, 中国</Typography>
            <Typography variant="caption" color="text.secondary">
              最后活动: 刚刚
            </Typography>
          </Box>

          <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle2">iPhone 12</Typography>
            <Typography variant="body2">iOS 15 • Safari • 北京, 中国</Typography>
            <Typography variant="caption" color="text.secondary">
              最后活动: 昨天 15:30
            </Typography>
            <Button size="small" color="error" sx={{ mt: 1 }}>
              注销此设备
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
