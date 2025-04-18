import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DownloadIcon from '@mui/icons-material/Download';
import LanguageIcon from '@mui/icons-material/Language';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonIcon from '@mui/icons-material/Person';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import SaveIcon from '@mui/icons-material/Save';
import TranslateIcon from '@mui/icons-material/Translate';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, styled, useColorScheme } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';

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

// 主题选择器组件
interface ThemeOptionProps {
  selected: boolean;
  onClick: () => void;
  sx?: any;
  children: React.ReactNode;
}

const ThemeOption = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<ThemeOptionProps>(({ theme, selected }) => ({
  width: 120,
  height: 80,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  border: `2px solid ${selected ? theme.palette.primary.main : alpha(theme.palette.divider, 0.1)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.7),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: selected ? theme.palette.primary.main : theme.palette.divider,
    boxShadow: 1,
  },
}));

export default function ProfileSettings() {
  const { mode, setMode } = useColorScheme();
  const [fontScale, setFontScale] = useState(1);
  const [compactMode, setCompactMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [weekStart, setWeekStart] = useState('monday');
  const [timeFormat, setTimeFormat] = useState('24hour');
  const [preferredLang, setPreferredLang] = useState('zh_CN');
  const [accountType, setAccountType] = useState('personal');

  const handleThemeChange = (newTheme: 'system' | 'light' | 'dark') => {
    setMode(newTheme);
  };

  const handleFontScaleChange = (_event: Event, newValue: number | number[]) => {
    setFontScale(newValue as number);
  };

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
              <Box sx={{ mt: 1 }}>
                <Button variant="outlined" size="small" startIcon={<AllInclusiveIcon />} fullWidth>
                  升级会员
                </Button>
              </Box>
            </Paper>
          </Box>

          <Box sx={{ mt: 3, width: '100%' }}>
            <Typography variant="subtitle2" gutterBottom>
              账户操作
            </Typography>
            <Stack spacing={2}>
              <Button variant="outlined" startIcon={<DownloadIcon />} fullWidth size="small">
                导出个人数据
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<LockOpenIcon />}
                fullWidth
                size="small"
              >
                锁定账户
              </Button>
            </Stack>
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
                      主要电子邮箱
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
                      备用电子邮箱
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="您的备用邮箱"
                      defaultValue=""
                      variant="outlined"
                      size="medium"
                      type="email"
                      helperText="用于账户恢复和重要通知"
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
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormRow>
                    <Typography variant="subtitle2" gutterBottom>
                      工作电话
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="您的工作电话"
                      defaultValue=""
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
                <Grid size={{ xs: 12 }}>
                  <FormRow>
                    <Typography variant="subtitle2" gutterBottom>
                      职位
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="您的职位"
                      defaultValue="产品设计师"
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
                <AccountCircleIcon />
              </SettingsIcon>
              <Typography variant="h6" fontWeight="medium">
                账户设置
              </Typography>
            </SectionHeader>

            <Box sx={{ pl: { xs: 0, sm: 6 } }}>
              <FormRow>
                <Typography variant="subtitle2" gutterBottom>
                  账户类型
                </Typography>
                <Stack spacing={2}>
                  <RadioGroup
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    sx={{ mb: 2 }}
                  >
                    <FormControlLabel
                      value="personal"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography>个人账户</Typography>
                          <Typography variant="caption" color="text.secondary">
                            适合个人使用，含基本功能
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="professional"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography>专业账户</Typography>
                          <Typography variant="caption" color="text.secondary">
                            适合专业人士，含高级功能和优先支持
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="enterprise"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography>企业账户</Typography>
                          <Typography variant="caption" color="text.secondary">
                            适合团队使用，含团队协作功能和管理控制台
                          </Typography>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </Stack>
              </FormRow>

              <FormRow>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <PrivacyTipIcon fontSize="small" sx={{ mr: 1 }} /> 隐私设置
                </Typography>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={<Switch defaultChecked color="primary" />}
                    label={
                      <Box>
                        <Typography>公开个人资料</Typography>
                        <Typography variant="caption" color="text.secondary">
                          允许其他用户查看您的个人资料信息
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked color="primary" />}
                    label={
                      <Box>
                        <Typography>显示在线状态</Typography>
                        <Typography variant="caption" color="text.secondary">
                          允许其他用户看到您的在线状态
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Switch color="primary" />}
                    label={
                      <Box>
                        <Typography>隐藏联系方式</Typography>
                        <Typography variant="caption" color="text.secondary">
                          对其他用户隐藏您的联系方式
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Switch color="primary" />}
                    label={
                      <Box>
                        <Typography>活动追踪</Typography>
                        <Typography variant="caption" color="text.secondary">
                          允许收集使用数据以改进产品体验
                        </Typography>
                      </Box>
                    }
                  />
                </Stack>
              </FormRow>
            </Box>
          </SectionContainer>

          <Divider sx={{ my: 4 }} />

          <SectionContainer>
            <SectionHeader>
              <SettingsIcon>
                <ColorLensIcon />
              </SettingsIcon>
              <Typography variant="h6" fontWeight="medium">
                界面与个性化
              </Typography>
            </SectionHeader>

            <Box sx={{ pl: { xs: 0, sm: 6 } }}>
              <FormRow>
                <Typography variant="subtitle2" gutterBottom>
                  主题
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <ThemeOption
                    selected={mode === 'light'}
                    onClick={() => handleThemeChange('light')}
                  >
                    <WbSunnyIcon />
                    <Typography variant="caption">浅色</Typography>
                  </ThemeOption>
                  <ThemeOption
                    selected={mode === 'dark'}
                    onClick={() => handleThemeChange('dark')}
                    sx={{
                      bgcolor: alpha('#000', 0.8),
                      color: 'white',
                    }}
                  >
                    <DarkModeIcon />
                    <Typography variant="caption">深色</Typography>
                  </ThemeOption>
                  <ThemeOption
                    selected={mode === 'system'}
                    onClick={() => handleThemeChange('system')}
                  >
                    <Box sx={{ display: 'flex' }}>
                      <WbSunnyIcon fontSize="small" />
                      <DarkModeIcon fontSize="small" />
                    </Box>
                    <Typography variant="caption">跟随系统</Typography>
                  </ThemeOption>
                </Box>
              </FormRow>

              <FormRow>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle2">文字大小</Typography>
                  <Typography variant="caption">{Math.round(fontScale * 100)}%</Typography>
                </Box>
                <Slider
                  value={fontScale}
                  onChange={handleFontScaleChange}
                  min={0.8}
                  max={1.4}
                  step={0.1}
                  marks={[
                    {
                      value: 0.8,
                      label: 'A',
                    },
                    {
                      value: 1,
                      label: 'A',
                    },
                    {
                      value: 1.4,
                      label: 'A',
                    },
                  ]}
                  sx={{ mb: 2 }}
                />
              </FormRow>

              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={compactMode}
                      onChange={(e) => setCompactMode(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography>紧凑视图</Typography>
                      <Typography variant="caption" color="text.secondary">
                        减少界面间距，在同一屏幕内显示更多内容
                      </Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={highContrast}
                      onChange={(e) => setHighContrast(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography>高对比度模式</Typography>
                      <Typography variant="caption" color="text.secondary">
                        增强文字和背景的对比度，提高可读性
                      </Typography>
                    </Box>
                  }
                />
              </Stack>
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
                      <Select
                        value={preferredLang}
                        onChange={(e) => setPreferredLang(e.target.value)}
                        variant="outlined"
                      >
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
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormRow>
                    <Typography variant="subtitle2" gutterBottom>
                      日期格式
                    </Typography>
                    <FormControl fullWidth size="medium">
                      <Select defaultValue="yyyy-MM-dd" variant="outlined">
                        <MenuItem value="yyyy-MM-dd">2023-04-01</MenuItem>
                        <MenuItem value="dd/MM/yyyy">01/04/2023</MenuItem>
                        <MenuItem value="MM/dd/yyyy">04/01/2023</MenuItem>
                        <MenuItem value="yyyy年MM月dd日">2023年04月01日</MenuItem>
                      </Select>
                    </FormControl>
                  </FormRow>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormRow>
                    <Typography variant="subtitle2" gutterBottom>
                      时间格式
                    </Typography>
                    <RadioGroup
                      row
                      value={timeFormat}
                      onChange={(e) => setTimeFormat(e.target.value)}
                    >
                      <FormControlLabel value="12hour" control={<Radio />} label="12小时制" />
                      <FormControlLabel value="24hour" control={<Radio />} label="24小时制" />
                    </RadioGroup>
                  </FormRow>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormRow>
                    <Typography variant="subtitle2" gutterBottom>
                      每周起始日
                    </Typography>
                    <RadioGroup
                      row
                      value={weekStart}
                      onChange={(e) => setWeekStart(e.target.value)}
                    >
                      <FormControlLabel value="monday" control={<Radio />} label="周一" />
                      <FormControlLabel value="sunday" control={<Radio />} label="周日" />
                    </RadioGroup>
                  </FormRow>
                </Grid>
              </Grid>
            </Box>
          </SectionContainer>

          <Divider sx={{ my: 4 }} />

          <SectionContainer>
            <SectionHeader>
              <SettingsIcon>
                <AccessibilityNewIcon />
              </SettingsIcon>
              <Typography variant="h6" fontWeight="medium">
                辅助功能
              </Typography>
            </SectionHeader>

            <Box sx={{ pl: { xs: 0, sm: 6 } }}>
              <Stack spacing={2}>
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label={
                    <Box>
                      <Typography>屏幕阅读器优化</Typography>
                      <Typography variant="caption" color="text.secondary">
                        增强对屏幕阅读器的支持，提供更好的可访问性
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={<Switch defaultChecked color="primary" />}
                  label={
                    <Box>
                      <Typography>动画减弱</Typography>
                      <Typography variant="caption" color="text.secondary">
                        减少界面动画效果，适合对动画敏感的用户
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label={
                    <Box>
                      <Typography>键盘导航优化</Typography>
                      <Typography variant="caption" color="text.secondary">
                        增强键盘导航体验，方便不使用鼠标的用户
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label={
                    <Box>
                      <Typography>自动播放媒体内容</Typography>
                      <Typography variant="caption" color="text.secondary">
                        控制是否自动播放视频和音频内容
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
