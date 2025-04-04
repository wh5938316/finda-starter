import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TranslateIcon from '@mui/icons-material/Translate';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import React from 'react';

// 表单行组件
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

export default function ProfileSettings() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        个人资料
      </Typography>
      <Typography color="text.secondary" variant="body1" sx={{ mt: 1, mb: 4 }}>
        管理您的个人信息、偏好设置和账户选项
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Box sx={{ position: 'relative', mb: 3 }}>
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
                    boxShadow: 2,
                  }}
                  size="small"
                >
                  <CameraAltIcon fontSize="small" />
                </IconButton>
              }
            >
              <Avatar
                sx={{
                  width: 140,
                  height: 140,
                  border: '4px solid #fff',
                  boxShadow: 2,
                }}
                alt="用户头像"
                src="/placeholder-avatar.jpg"
              />
            </Badge>
          </Box>

          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            张三
          </Typography>
          <Typography color="text.secondary" variant="body2" gutterBottom>
            zhangsan@example.com
          </Typography>
          <Typography
            variant="caption"
            sx={{
              bgcolor: alpha('#000', 0.05),
              px: 2,
              py: 0.5,
              borderRadius: 10,
              mt: 1,
            }}
          >
            个人账户
          </Typography>

          <Box sx={{ mt: 4, width: '100%' }}>
            <Typography variant="subtitle2" gutterBottom>
              账户状态
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mt: 1,
                bgcolor: alpha('#000', 0.02),
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">存储空间</Typography>
                <Typography variant="body2" fontWeight="medium">
                  2.5GB / 10GB
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 6,
                  bgcolor: alpha('#000', 0.09),
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ height: '100%', width: '25%', bgcolor: 'primary.main' }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">会员等级</Typography>
                <Typography variant="body2" color="primary" fontWeight="medium">
                  标准会员
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <SectionContainer>
            <SectionHeader>
              <SettingsIcon>
                <PersonIcon />
              </SettingsIcon>
              <Typography variant="h6" fontWeight="medium">
                基本信息
              </Typography>
            </SectionHeader>

            <Box sx={{ pl: { xs: 0, sm: 6 } }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormRow>
                    <Typography variant="subtitle2" gutterBottom>
                      姓名
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="您的真实姓名"
                      defaultValue="张三"
                      variant="outlined"
                      size="medium"
                    />
                  </FormRow>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormRow>
                    <Typography variant="subtitle2" gutterBottom>
                      用户名
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="您的用户名"
                      defaultValue="zhangsan"
                      variant="outlined"
                      size="medium"
                      helperText="此用户名将显示在您的个人主页"
                    />
                  </FormRow>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormRow>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      个人简介{' '}
                      <TranslateIcon fontSize="small" sx={{ ml: 1, color: 'text.secondary' }} />
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="简单介绍一下自己"
                      defaultValue="这是我的个人简介，我是一名产品设计师，擅长UI/UX设计和产品规划..."
                      multiline
                      rows={4}
                      variant="outlined"
                      size="medium"
                    />
                  </FormRow>
                </Grid>
              </Grid>
            </Box>
          </SectionContainer>

          <Divider sx={{ my: 4 }} />

          <SectionContainer>
            <SectionHeader>
              <SettingsIcon>
                <ContactMailIcon />
              </SettingsIcon>
              <Typography variant="h6" fontWeight="medium">
                联系方式
              </Typography>
            </SectionHeader>

            <Box sx={{ pl: { xs: 0, sm: 6 } }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormRow>
                    <Typography variant="subtitle2" gutterBottom>
                      电子邮箱
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="您的主要邮箱"
                      defaultValue="zhangsan@example.com"
                      variant="outlined"
                      size="medium"
                      type="email"
                    />
                  </FormRow>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormRow>
                    <Typography variant="subtitle2" gutterBottom>
                      手机号码
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="您的联系电话"
                      defaultValue="+86 13812345678"
                      variant="outlined"
                      size="medium"
                    />
                  </FormRow>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormRow>
                    <Typography variant="subtitle2" gutterBottom>
                      公司/组织
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="您所属的组织"
                      defaultValue="科技有限公司"
                      variant="outlined"
                      size="medium"
                    />
                  </FormRow>
                </Grid>
              </Grid>
            </Box>
          </SectionContainer>

          <Divider sx={{ my: 4 }} />

          <SectionContainer>
            <SectionHeader>
              <SettingsIcon>
                <LanguageIcon />
              </SettingsIcon>
              <Typography variant="h6" fontWeight="medium">
                语言与区域
              </Typography>
            </SectionHeader>

            <Box sx={{ pl: { xs: 0, sm: 6 } }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormRow>
                    <Typography variant="subtitle2" gutterBottom>
                      界面语言
                    </Typography>
                    <FormControl fullWidth size="medium">
                      <Select defaultValue="zh_CN" variant="outlined">
                        <MenuItem value="zh_CN">简体中文</MenuItem>
                        <MenuItem value="zh_TW">繁體中文</MenuItem>
                        <MenuItem value="en_US">English (US)</MenuItem>
                        <MenuItem value="ja_JP">日本語</MenuItem>
                        <MenuItem value="ko_KR">한국어</MenuItem>
                      </Select>
                    </FormControl>
                  </FormRow>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormRow>
                    <Typography variant="subtitle2" gutterBottom>
                      时区
                    </Typography>
                    <FormControl fullWidth size="medium">
                      <Select defaultValue="Asia/Shanghai" variant="outlined">
                        <MenuItem value="Asia/Shanghai">(GMT+08:00) 北京, 上海, 香港</MenuItem>
                        <MenuItem value="Asia/Tokyo">(GMT+09:00) 东京</MenuItem>
                        <MenuItem value="America/New_York">(GMT-05:00) 纽约</MenuItem>
                        <MenuItem value="Europe/London">(GMT+00:00) 伦敦</MenuItem>
                        <MenuItem value="Europe/Paris">(GMT+01:00) 巴黎, 柏林</MenuItem>
                      </Select>
                    </FormControl>
                  </FormRow>
                </Grid>
              </Grid>
            </Box>
          </SectionContainer>

          <Divider sx={{ my: 4 }} />

          <SectionContainer>
            <SectionHeader>
              <SettingsIcon>
                <NotificationsIcon />
              </SettingsIcon>
              <Typography variant="h6" fontWeight="medium">
                通知设置
              </Typography>
            </SectionHeader>

            <Box sx={{ pl: { xs: 0, sm: 6 } }}>
              <Stack spacing={2}>
                <FormControlLabel
                  control={<Switch defaultChecked color="primary" />}
                  label={
                    <Box>
                      <Typography>电子邮件通知</Typography>
                      <Typography variant="caption" color="text.secondary">
                        接收项目更新、团队邀请等电子邮件通知
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={<Switch defaultChecked color="primary" />}
                  label={
                    <Box>
                      <Typography>浏览器通知</Typography>
                      <Typography variant="caption" color="text.secondary">
                        在您的浏览器中显示通知提醒
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label={
                    <Box>
                      <Typography>营销邮件</Typography>
                      <Typography variant="caption" color="text.secondary">
                        接收新功能、优惠活动等营销信息
                      </Typography>
                    </Box>
                  }
                />
              </Stack>
            </Box>
          </SectionContainer>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              size="large"
              sx={{
                px: 4,
                py: 1,
                boxShadow: 2,
              }}
            >
              保存所有更改
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
