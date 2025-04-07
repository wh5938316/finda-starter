import AssignmentIcon from '@mui/icons-material/Assignment';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import CommentIcon from '@mui/icons-material/Comment';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import MailIcon from '@mui/icons-material/Mail';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SaveIcon from '@mui/icons-material/Save';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SecurityIcon from '@mui/icons-material/Security';
import TimerIcon from '@mui/icons-material/Timer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import React, { ChangeEvent, useState } from 'react';

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

const NotificationItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 0),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const NotificationItemContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const SettingsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: alpha('#f5f5f5', 0.5),
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

// 通知频率标记
const freqMarks = [
  {
    value: 0,
    label: '立即',
  },
  {
    value: 1,
    label: '每小时',
  },
  {
    value: 2,
    label: '每天',
  },
  {
    value: 3,
    label: '每周',
  },
];

// 通知重要性标签
const importanceLabels = {
  all: '所有通知',
  important: '仅重要通知',
  none: '无通知',
};

// 定义类型
type NotificationChannel = 'email' | 'app' | 'browser' | 'mobile';
type ImportanceLevel = 'all' | 'important' | 'none';

const NotificationSettings = () => {
  // 通知渠道状态
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [appEnabled, setAppEnabled] = useState(true);
  const [browserEnabled, setBrowserEnabled] = useState(true);
  const [mobileEnabled, setMobileEnabled] = useState(true);

  // 通知类型状态
  const [notifyTypes, setNotifyTypes] = useState({
    tasks: true,
    team: true,
    comments: true,
    security: true,
    system: true,
    calendar: false,
  });

  // 勿扰模式状态
  const [dndEnabled, setDndEnabled] = useState(false);
  const [dndStartTime, setDndStartTime] = useState('22:00');
  const [dndEndTime, setDndEndTime] = useState('08:00');
  const [dndWeekend, setDndWeekend] = useState(true);

  // 通知频率和设置
  const [digestFrequency, setDigestFrequency] = useState(1);
  const [notifySound, setNotifySound] = useState(true);

  // 渠道重要性设置 - 保留状态但不在UI中使用
  const [emailImportance, setEmailImportance] = useState('important');
  const [appImportance, setAppImportance] = useState('all');
  const [browserImportance, setBrowserImportance] = useState('important');
  const [mobileImportance, setMobileImportance] = useState('all');

  // 修改通知类型处理函数
  const handleNotifyTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNotifyTypes({
      ...notifyTypes,
      [event.target.name]: event.target.checked,
    });
  };

  // 通知频率处理函数
  const handleDigestFrequencyChange = (_event: Event, newValue: number | number[]) => {
    setDigestFrequency(newValue as number);
  };

  // 通知重要性处理函数
  const handleImportanceChange = (channel: NotificationChannel, value: ImportanceLevel) => {
    switch (channel) {
      case 'email':
        setEmailImportance(value);
        break;
      case 'app':
        setAppImportance(value);
        break;
      case 'browser':
        setBrowserImportance(value);
        break;
      case 'mobile':
        setMobileImportance(value);
        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        通知设置
      </Typography>
      <Typography color="text.secondary" variant="body1" sx={{ mt: 1, mb: 4 }}>
        自定义您接收通知的方式和时间，保持信息流畅同时减少干扰
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <SectionContainer>
        <SectionHeader>
          <SettingsIcon>
            <NotificationsIcon />
          </SettingsIcon>
          <Typography variant="h6" fontWeight="medium">
            通知渠道
          </Typography>
        </SectionHeader>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3, pl: { xs: 0, sm: 6 } }}>
          选择您希望通过哪些方式接收通知
        </Typography>

        <Box sx={{ pl: { xs: 0, sm: 6 } }}>
          <SettingsContainer>
            <NotificationItem>
              <NotificationItemContent>
                <SettingsIcon sx={{ width: 40, height: 40 }}>
                  <MailIcon />
                </SettingsIcon>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    电子邮件通知
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    接收任务更新、团队邀请等电子邮件通知
                  </Typography>
                </Box>
              </NotificationItemContent>
              <Switch
                checked={emailEnabled}
                onChange={(e) => setEmailEnabled(e.target.checked)}
                color="primary"
              />
            </NotificationItem>

            <NotificationItem>
              <NotificationItemContent>
                <SettingsIcon sx={{ width: 40, height: 40 }}>
                  <MessageIcon />
                </SettingsIcon>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    应用内通知
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    在应用内接收实时通知和更新
                  </Typography>
                </Box>
              </NotificationItemContent>
              <Switch
                checked={appEnabled}
                onChange={(e) => setAppEnabled(e.target.checked)}
                color="primary"
              />
            </NotificationItem>

            <NotificationItem>
              <NotificationItemContent>
                <SettingsIcon sx={{ width: 40, height: 40 }}>
                  <BrowserUpdatedIcon />
                </SettingsIcon>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    浏览器通知
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    在您的浏览器中显示桌面推送通知，即使您未打开应用
                  </Typography>
                </Box>
              </NotificationItemContent>
              <Switch
                checked={browserEnabled}
                onChange={(e) => setBrowserEnabled(e.target.checked)}
                color="primary"
              />
            </NotificationItem>

            <NotificationItem sx={{ pb: 0 }}>
              <NotificationItemContent>
                <SettingsIcon sx={{ width: 40, height: 40 }}>
                  <PhoneAndroidIcon />
                </SettingsIcon>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    移动设备通知
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    在您的移动设备上接收推送通知
                  </Typography>
                </Box>
              </NotificationItemContent>
              <Switch
                checked={mobileEnabled}
                onChange={(e) => setMobileEnabled(e.target.checked)}
                color="primary"
              />
            </NotificationItem>
          </SettingsContainer>
        </Box>
      </SectionContainer>

      <Divider sx={{ my: 4 }} />

      <SectionContainer>
        <SectionHeader>
          <SettingsIcon>
            <AssignmentIcon />
          </SettingsIcon>
          <Typography variant="h6" fontWeight="medium">
            通知类型
          </Typography>
        </SectionHeader>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3, pl: { xs: 0, sm: 6 } }}>
          选择您想要接收哪些类型的通知
        </Typography>

        <Box sx={{ pl: { xs: 0, sm: 6 } }}>
          <SettingsContainer>
            <NotificationItem>
              <NotificationItemContent>
                <SettingsIcon sx={{ width: 40, height: 40 }}>
                  <AssignmentIcon />
                </SettingsIcon>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    任务提醒
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    任务分配、截止日期提醒和状态更新
                  </Typography>
                </Box>
              </NotificationItemContent>
              <Checkbox
                checked={notifyTypes.tasks}
                onChange={handleNotifyTypeChange}
                name="tasks"
                color="primary"
              />
            </NotificationItem>

            <NotificationItem>
              <NotificationItemContent>
                <SettingsIcon sx={{ width: 40, height: 40 }}>
                  <GroupsIcon />
                </SettingsIcon>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    团队更新
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    新成员加入、团队公告和成员变动
                  </Typography>
                </Box>
              </NotificationItemContent>
              <Checkbox
                checked={notifyTypes.team}
                onChange={handleNotifyTypeChange}
                name="team"
                color="primary"
              />
            </NotificationItem>

            <NotificationItem>
              <NotificationItemContent>
                <SettingsIcon sx={{ width: 40, height: 40 }}>
                  <CommentIcon />
                </SettingsIcon>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    评论与回复
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    您参与的讨论的新评论和回复
                  </Typography>
                </Box>
              </NotificationItemContent>
              <Checkbox
                checked={notifyTypes.comments}
                onChange={handleNotifyTypeChange}
                name="comments"
                color="primary"
              />
            </NotificationItem>

            <NotificationItem>
              <NotificationItemContent>
                <SettingsIcon sx={{ width: 40, height: 40 }}>
                  <SecurityIcon />
                </SettingsIcon>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    安全警报
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    重要的安全相关通知和未知登录提醒
                  </Typography>
                </Box>
              </NotificationItemContent>
              <Checkbox
                checked={notifyTypes.security}
                onChange={handleNotifyTypeChange}
                name="security"
                color="primary"
              />
            </NotificationItem>

            <NotificationItem>
              <NotificationItemContent>
                <SettingsIcon sx={{ width: 40, height: 40 }}>
                  <BrowserUpdatedIcon />
                </SettingsIcon>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    系统通知
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    新功能、系统维护和重要更新
                  </Typography>
                </Box>
              </NotificationItemContent>
              <Checkbox
                checked={notifyTypes.system}
                onChange={handleNotifyTypeChange}
                name="system"
                color="primary"
              />
            </NotificationItem>

            <NotificationItem sx={{ pb: 0 }}>
              <NotificationItemContent>
                <SettingsIcon sx={{ width: 40, height: 40 }}>
                  <EventIcon />
                </SettingsIcon>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    日历提醒
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    会议、活动和日程安排提醒
                  </Typography>
                </Box>
              </NotificationItemContent>
              <Checkbox
                checked={notifyTypes.calendar}
                onChange={handleNotifyTypeChange}
                name="calendar"
                color="primary"
              />
            </NotificationItem>
          </SettingsContainer>
        </Box>
      </SectionContainer>

      <Divider sx={{ my: 4 }} />

      <SectionContainer>
        <SectionHeader>
          <SettingsIcon>
            <DoNotDisturbIcon />
          </SettingsIcon>
          <Typography variant="h6" fontWeight="medium">
            勿扰模式
          </Typography>
        </SectionHeader>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3, pl: { xs: 0, sm: 6 } }}>
          设置一段时间，在该时间段内您不会收到任何通知
        </Typography>

        <Box sx={{ pl: { xs: 0, sm: 6 } }}>
          <SettingsContainer>
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={dndEnabled}
                    onChange={(e) => setDndEnabled(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      启用勿扰模式
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      在指定时间段内暂停所有通知
                    </Typography>
                  </Box>
                }
              />
            </Box>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormRow>
                  <Typography variant="subtitle2" gutterBottom>
                    开始时间
                  </Typography>
                  <TextField
                    fullWidth
                    type="time"
                    value={dndStartTime}
                    onChange={(e) => setDndStartTime(e.target.value)}
                    disabled={!dndEnabled}
                    size="medium"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormRow>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormRow>
                  <Typography variant="subtitle2" gutterBottom>
                    结束时间
                  </Typography>
                  <TextField
                    fullWidth
                    type="time"
                    value={dndEndTime}
                    onChange={(e) => setDndEndTime(e.target.value)}
                    disabled={!dndEnabled}
                    size="medium"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormRow>
              </Grid>
            </Grid>

            <FormControlLabel
              control={
                <Checkbox
                  checked={dndWeekend}
                  onChange={(e) => setDndWeekend(e.target.checked)}
                  disabled={!dndEnabled}
                  color="primary"
                />
              }
              label="在周末全天启用勿扰模式"
            />
          </SettingsContainer>
        </Box>
      </SectionContainer>

      <Divider sx={{ my: 4 }} />

      <SectionContainer>
        <SectionHeader>
          <SettingsIcon>
            <ScheduleIcon />
          </SettingsIcon>
          <Typography variant="h6" fontWeight="medium">
            通知摘要与频率
          </Typography>
        </SectionHeader>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3, pl: { xs: 0, sm: 6 } }}>
          调整接收通知的频率和方式
        </Typography>

        <Box sx={{ pl: { xs: 0, sm: 6 } }}>
          <SettingsContainer>
            <FormRow>
              <Typography variant="subtitle2" gutterBottom>
                通知摘要频率
              </Typography>
              <Box sx={{ pl: 2, pr: 2 }}>
                <Slider
                  value={digestFrequency}
                  onChange={handleDigestFrequencyChange}
                  step={1}
                  min={0}
                  max={3}
                  marks={freqMarks}
                  valueLabelDisplay="off"
                />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                选择您希望如何接收非紧急通知的频率。重要通知将始终立即发送。
              </Typography>
            </FormRow>

            <Box sx={{ mt: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifySound}
                    onChange={(e) => setNotifySound(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      启用通知声音
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      收到通知时播放提示音
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </SettingsContainer>
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
    </Box>
  );
};

export const Component = NotificationSettings;
