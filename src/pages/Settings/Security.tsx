import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DevicesIcon from '@mui/icons-material/Devices';
import HistoryIcon from '@mui/icons-material/History';
import LockIcon from '@mui/icons-material/Lock';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SaveIcon from '@mui/icons-material/Save';
import SecurityIcon from '@mui/icons-material/Security';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router';

// 样式组件
const FormRow = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
  width: '100%',
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5),
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const SettingsIcon = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  padding: theme.spacing(1),
  marginRight: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
}));

interface DeviceCardProps {
  current?: boolean;
}

const DeviceCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'current',
})<DeviceCardProps>(({ theme, current }) => ({
  padding: theme.spacing(2.5),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  borderLeft: current ? `4px solid ${theme.palette.primary.main}` : 'none',
  backgroundColor: alpha(theme.palette.background.paper, 0.6),
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
}));

export default function SecuritySettings() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // 这个函数将来会导航到设备管理页面
  const handleGoToDevicesPage = () => {
    alert('未来将导航到设备管理页面');
    console.log('导航到设备管理页面');
    // 实际项目中会使用路由导航，例如：
    // navigate('/settings/security/devices')
    // 或者
    // history.push('/settings/security/devices')
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        安全设置
      </Typography>
      <Typography color="text.secondary" variant="body1" sx={{ mt: 1, mb: 4 }}>
        管理您的密码、两步验证以及登录活动，保障账户安全
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <SectionContainer>
        <SectionHeader>
          <SettingsIcon>
            <LockIcon />
          </SettingsIcon>
          <Typography variant="h6" fontWeight="medium">
            账户安全
          </Typography>
        </SectionHeader>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3, pl: { xs: 0, sm: 6 } }}>
          定期更新密码并启用两步验证，可以有效防止未授权访问
        </Typography>

        <Box sx={{ pl: { xs: 0, sm: 6 } }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>
              修改密码
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              强密码应包含字母、数字和特殊符号的组合，且长度不少于8位
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <FormRow>
                  <Typography variant="subtitle2" gutterBottom>
                    当前密码
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="输入您的当前密码"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    size="medium"
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
                </FormRow>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormRow>
                  <Typography variant="subtitle2" gutterBottom>
                    新密码
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="设置新密码"
                    type={showNewPassword ? 'text' : 'password'}
                    variant="outlined"
                    size="medium"
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
                </FormRow>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormRow>
                  <Typography variant="subtitle2" gutterBottom>
                    确认新密码
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="再次输入新密码"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    size="medium"
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
                </FormRow>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  sx={{
                    mt: 1,
                    px: 3,
                    py: 1,
                    boxShadow: 1,
                  }}
                >
                  更新密码
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>
              两步验证
            </Typography>

            <FormControlLabel
              control={<Switch color="primary" />}
              label={
                <Box>
                  <Typography>启用两步验证</Typography>
                  <Typography variant="caption" color="text.secondary">
                    启用后，每次登录时除了密码外，还需要输入手机短信验证码
                  </Typography>
                </Box>
              }
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
              <SettingsIcon sx={{ width: 36, height: 36, mt: 1 }}>
                <PhoneAndroidIcon />
              </SettingsIcon>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  绑定手机号码
                </Typography>
                <TextField
                  fullWidth
                  placeholder="请输入接收验证码的手机号码"
                  variant="outlined"
                  size="medium"
                  defaultValue="+86 13812345678"
                  sx={{ mb: 2, maxWidth: 400 }}
                />
                <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
                  发送验证码
                </Button>
                <Button variant="contained" color="primary">
                  验证手机号码
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </SectionContainer>

      <Divider sx={{ my: 4 }} />

      <SectionContainer>
        <SectionHeader>
          <SettingsIcon>
            <DevicesIcon />
          </SettingsIcon>
          <Typography variant="h6" fontWeight="medium">
            设备管理
          </Typography>
        </SectionHeader>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3, pl: { xs: 0, sm: 6 } }}>
          查看和管理当前已登录的设备，及时发现异常登录活动
        </Typography>

        <Box sx={{ pl: { xs: 0, sm: 6 } }}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    当前登录设备
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    共有 3 台设备已登录到您的账户
                  </Typography>
                </Box>
                <Link to="/settings/security/recent-devices">
                  <Button variant="outlined" endIcon={<ArrowForwardIcon />}>
                    管理设备
                  </Button>
                </Link>
              </Box>

              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: alpha('#000', 0.02),
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DevicesIcon sx={{ color: 'primary.main', mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2">当前设备 (Windows 10 • Chrome)</Typography>
                    <Typography variant="caption" color="text.secondary">
                      北京, 中国 • 刚刚活跃
                    </Typography>
                  </Box>
                </Box>
                <Chip label="活跃中" color="success" />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </SectionContainer>
    </Box>
  );
}
