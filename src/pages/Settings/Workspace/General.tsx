import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import SaveIcon from '@mui/icons-material/Save';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

// 由于MUI Grid在不同版本中的用法不同，创建简单的布局组件
const FormRow = styled('div')({
  marginBottom: 24,
  width: '100%',
});

const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5),
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const SettingsIcon2 = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  padding: theme.spacing(1),
  marginRight: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
}));

export default function WorkspaceGeneralSettings() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        工作区常规设置
      </Typography>
      <Typography color="text.secondary" variant="body1" sx={{ mt: 1, mb: 4 }}>
        管理您的工作区基本信息、偏好设置和安全选项
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <SectionContainer>
        <SectionHeader>
          <SettingsIcon2>
            <BusinessIcon />
          </SettingsIcon2>
          <Typography variant="h6" fontWeight="medium">
            工作区信息
          </Typography>
        </SectionHeader>

        <Box sx={{ pl: { xs: 0, sm: 6 } }}>
          <FormRow>
            <Typography variant="subtitle2" gutterBottom>
              工作区名称
            </Typography>
            <TextField
              fullWidth
              placeholder="输入您的工作区名称"
              defaultValue="我的团队"
              variant="outlined"
              size="medium"
            />
          </FormRow>

          <FormRow>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              工作区网址 <LinkIcon fontSize="small" sx={{ ml: 1, color: 'text.secondary' }} />
            </Typography>
            <TextField
              fullWidth
              placeholder="输入URL标识符"
              defaultValue="myteam"
              variant="outlined"
              size="medium"
              InputProps={{
                startAdornment: (
                  <Typography color="text.secondary" sx={{ mr: 1 }}>
                    finda.com/
                  </Typography>
                ),
              }}
              helperText="自定义您的工作区URL，用于团队访问"
            />
          </FormRow>

          <FormRow>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              工作区描述{' '}
              <DescriptionIcon fontSize="small" sx={{ ml: 1, color: 'text.secondary' }} />
            </Typography>
            <TextField
              fullWidth
              placeholder="描述您的工作区用途"
              defaultValue="这是我们团队的工作区"
              multiline
              rows={3}
              variant="outlined"
              size="medium"
            />
          </FormRow>
        </Box>
      </SectionContainer>

      <Divider sx={{ my: 4 }} />

      <SectionContainer>
        <SectionHeader>
          <SettingsIcon2>
            <SettingsIcon />
          </SettingsIcon2>
          <Typography variant="h6" fontWeight="medium">
            偏好设置
          </Typography>
        </SectionHeader>

        <Box sx={{ pl: { xs: 0, sm: 6 } }}>
          <Stack spacing={2}>
            <FormControlLabel
              control={<Switch defaultChecked color="primary" />}
              label="显示团队成员在线状态"
            />
            <FormControlLabel
              control={<Switch defaultChecked color="primary" />}
              label="允许所有团队成员邀请新成员"
            />
            <FormControlLabel control={<Switch color="primary" />} label="仅管理员可以创建新项目" />
            <FormControlLabel
              control={<Switch defaultChecked color="primary" />}
              label="允许团队成员评论"
            />
          </Stack>
        </Box>
      </SectionContainer>

      <Divider sx={{ my: 4 }} />

      <SectionContainer>
        <SectionHeader>
          <SettingsIcon2>
            <SecurityIcon />
          </SettingsIcon2>
          <Typography variant="h6" fontWeight="medium">
            安全设置
          </Typography>
        </SectionHeader>

        <Box sx={{ pl: { xs: 0, sm: 6 } }}>
          <Stack spacing={2}>
            <FormControlLabel
              control={<Switch color="primary" />}
              label={
                <Box>
                  <Typography>要求双因素验证</Typography>
                  <Typography variant="caption" color="text.secondary">
                    增强账户安全性，要求所有用户开启双因素认证
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={<Switch color="primary" />}
              label={
                <Box>
                  <Typography>IP地址限制</Typography>
                  <Typography variant="caption" color="text.secondary">
                    限制只能从特定IP地址范围访问工作区
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={<Switch defaultChecked color="primary" />}
              label={
                <Box>
                  <Typography>敏感操作通知</Typography>
                  <Typography variant="caption" color="text.secondary">
                    当有敏感操作执行时，通知管理员
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
    </Box>
  );
}
