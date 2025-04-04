import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ApiIcon from '@mui/icons-material/Api';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudIcon from '@mui/icons-material/Cloud';
import CodeIcon from '@mui/icons-material/Code';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InfoIcon from '@mui/icons-material/Info';
import LaptopIcon from '@mui/icons-material/Laptop';
import LaunchIcon from '@mui/icons-material/Launch';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import StorageIcon from '@mui/icons-material/Storage';
import WebIcon from '@mui/icons-material/Web';
import {
  Avatar,
  Badge,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  StepConnector,
  TextField,
  Tooltip,
  stepConnectorClasses,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';

// 自定义步骤连接器样式 - 简化
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

// 自定义步骤图标样式 - 简化
const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.main,
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.primary.main,
  }),
}));

// 项目类型卡片样式 - 简化
const ProjectTypeCard = styled(Paper)(({ theme }) => ({
  cursor: 'pointer',
  height: '100%',
  borderRadius: 8,
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}));

// 自定义步骤图标
const ColorlibStepIcon = (props: any) => {
  const { active, completed, className, icon } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SearchIcon />,
    2: <PersonAddIcon />,
    3: <CodeIcon />,
    4: <FileUploadIcon />,
    5: <CheckCircleIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <CheckCircleIcon /> : icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
};

// 项目类型数据
const projectTypes = [
  {
    name: '网站开发',
    icon: <WebIcon />,
    description: '创建响应式网站、企业官网、电商网站等',
    color: '#616161',
  },
  {
    name: '移动应用',
    icon: <PhoneAndroidIcon />,
    description: 'iOS和Android原生或混合应用开发',
    color: '#616161',
  },
  {
    name: '小程序',
    icon: <DevicesOtherIcon />,
    description: '微信、支付宝等平台小程序开发',
    color: '#616161',
  },
  {
    name: '桌面软件',
    icon: <LaptopIcon />,
    description: 'Windows、MacOS、Linux跨平台应用',
    color: '#616161',
  },
  {
    name: 'API服务',
    icon: <CloudIcon />,
    description: 'RESTful API、微服务、集成接口开发',
    color: '#616161',
  },
];

// 步骤内容定义
const steps = [
  {
    label: '选择项目类型',
    description: '选择您要创建的项目类型',
    content: (handleSelectType: (type: string) => void) => (
      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom fontWeight="500">
          请选择您要创建的项目类型
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
          选择合适的项目类型可以帮助我们为您提供最适合的模板和工具支持。
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {projectTypes.map((type, index) => (
            <Grid key={type.name} size={{ xs: 12, md: 6 }}>
              <ProjectTypeCard
                onClick={() => handleSelectType(type.name)}
                sx={{
                  borderLeft: `4px solid ${type.color}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: '#f5f5f5',
                      color: type.color,
                      mr: 2,
                    }}
                  >
                    {type.icon}
                  </Avatar>
                  <Typography variant="subtitle1" component="div" fontWeight="500">
                    {type.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {type.description}
                </Typography>
                {index < 2 && (
                  <Chip
                    size="small"
                    icon={<StarIcon />}
                    label="推荐"
                    sx={{
                      mt: 1,
                      bgcolor: '#f5f5f5',
                      color: type.color,
                    }}
                  />
                )}
              </ProjectTypeCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    ),
  },
  {
    label: '设置项目基本信息',
    description: '填写项目的基本信息',
    content: (
      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom fontWeight="500">
          填写项目基本信息
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
          完善您的项目基本信息，帮助团队成员更好地了解项目目标和范围。
        </Typography>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="项目名称"
            variant="outlined"
            placeholder="输入项目名称"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon color="primary" />
                </InputAdornment>
              ),
            }}
            helperText="请输入具有描述性的项目名称"
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="项目描述"
            variant="outlined"
            placeholder="简要描述您的项目目标和功能"
            multiline
            rows={3}
            helperText="简洁明了地描述项目的主要目标和功能特点"
          />
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          项目规模与周期
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>项目周期</InputLabel>
              <Select
                label="项目周期"
                defaultValue=""
                startAdornment={<AccessTimeIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value="short">
                  <Chip size="small" label="短期" sx={{ mr: 1 }} />
                  <Typography>1-3个月</Typography>
                </MenuItem>
                <MenuItem value="medium">
                  <Chip size="small" label="中期" sx={{ mr: 1 }} />
                  <Typography>3-6个月</Typography>
                </MenuItem>
                <MenuItem value="long">
                  <Chip size="small" label="长期" sx={{ mr: 1 }} />
                  <Typography>6个月以上</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>团队规模</InputLabel>
              <Select
                label="团队规模"
                defaultValue=""
                startAdornment={<PeopleIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value="small">
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: 'grey.100',
                      color: 'text.primary',
                      fontSize: '0.875rem',
                      mr: 1,
                    }}
                  >
                    S
                  </Avatar>
                  <Typography>小型 (1-3人)</Typography>
                </MenuItem>
                <MenuItem value="medium">
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: 'grey.100',
                      color: 'text.primary',
                      fontSize: '0.875rem',
                      mr: 1,
                    }}
                  >
                    M
                  </Avatar>
                  <Typography>中型 (4-10人)</Typography>
                </MenuItem>
                <MenuItem value="large">
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: 'grey.100',
                      color: 'text.primary',
                      fontSize: '0.875rem',
                      mr: 1,
                    }}
                  >
                    L
                  </Avatar>
                  <Typography>大型 (10人以上)</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>预算范围</InputLabel>
              <Select
                label="预算范围"
                defaultValue=""
                startAdornment={<AttachMoneyIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value="low">5万以下</MenuItem>
                <MenuItem value="medium">5-20万</MenuItem>
                <MenuItem value="high">20-50万</MenuItem>
                <MenuItem value="very-high">50万以上</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    ),
  },
  {
    label: '选择技术栈',
    description: '选择项目所需的技术栈',
    content: (
      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom fontWeight="500">
          选择您的项目技术栈
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
          为您的项目选择合适的技术栈，帮助我们为您提供更具针对性的开发支持。
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: '#f9f9f9',
            mb: 3,
            border: '1px solid #e0e0e0',
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <WebIcon fontSize="small" sx={{ mr: 1 }} />
              前端技术
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ '& > *': { my: 0.5 } }}>
              {['React', 'Vue', 'Angular', 'Next.js', 'Tailwind CSS', 'Material UI', 'Svelte'].map(
                (tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    clickable
                    variant="outlined"
                    sx={{
                      borderRadius: '4px',
                    }}
                  />
                ),
              )}
            </Stack>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <CloudIcon fontSize="small" sx={{ mr: 1 }} />
              后端技术
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ '& > *': { my: 0.5 } }}>
              {['Node.js', 'Java', 'Python', 'Go', 'C#/.NET', 'PHP', 'Ruby'].map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  clickable
                  variant="outlined"
                  sx={{
                    borderRadius: '4px',
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <StorageIcon fontSize="small" sx={{ mr: 1 }} />
              数据库
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ '& > *': { my: 0.5 } }}>
              {['MySQL', 'MongoDB', 'PostgreSQL', 'Redis', 'SQLite', 'Firebase', 'DynamoDB'].map(
                (tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    clickable
                    variant="outlined"
                    sx={{
                      borderRadius: '4px',
                    }}
                  />
                ),
              )}
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
              开发工具与环境
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ '& > *': { my: 0.5 } }}>
              {[
                'Docker',
                'Kubernetes',
                'Git',
                'GitHub Actions',
                'Jenkins',
                'VS Code',
                'WebStorm',
              ].map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  clickable
                  variant="outlined"
                  sx={{
                    borderRadius: '4px',
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Paper>

        <Typography variant="body2">
          提示：您可以根据需要选择多种技术组合，我们会为您提供相应的集成方案。
        </Typography>
      </Box>
    ),
  },
  {
    label: '上传或连接资源',
    description: '上传项目所需资源或连接已有资源',
    content: (
      <Box sx={{ my: 2 }}>
        <Typography variant="h6" gutterBottom fontWeight="500">
          上传项目资源或连接已有资源
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
          您可以从我们的模板库中选择，或者上传自己的项目资源文件。
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="搜索已有项目模板"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="输入关键词搜索项目模板"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <AutoAwesomeIcon sx={{ mr: 1 }} />
              推荐模板
            </Typography>

            <Grid container spacing={2}>
              {[
                {
                  name: '标准Web应用',
                  icon: <WebIcon />,
                  description: '包含前后端分离架构的完整Web应用',
                },
                {
                  name: 'API服务框架',
                  icon: <ApiIcon />,
                  description: 'RESTful API服务框架，支持身份验证和文档',
                },
                {
                  name: '电商网站模板',
                  icon: <ShoppingCartIcon />,
                  description: '包含商品、购物车和支付流程的电商网站',
                },
                {
                  name: '社交应用模板',
                  icon: <PeopleIcon />,
                  description: '用户社交互动功能，包含消息和通知系统',
                },
              ].map((template, index) => (
                <Grid key={template.name} size={{ xs: 12, sm: 6 }}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: '100%',
                      cursor: 'pointer',
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box sx={{ p: 2 }}>{template.icon}</Box>
                    </Box>
                    <Box sx={{ flex: '1 0 auto', p: 2 }}>
                      <Typography component="div" variant="subtitle1" fontWeight="500">
                        {template.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {template.description}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {index === 2 && <Chip size="small" label="热门" sx={{ mr: 0.5 }} />}
                        {(index === 0 || index === 3) && <Chip size="small" label="推荐" />}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 3 }}>
              <Chip label="或者" variant="outlined" />
            </Divider>

            <Paper
              variant="outlined"
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderStyle: 'dashed',
                borderRadius: 2,
                borderColor: '#e0e0e0',
                backgroundColor: '#fafafa',
              }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  mb: 2,
                  bgcolor: '#f5f5f5',
                }}
              >
                <FileUploadIcon sx={{ fontSize: 30 }} />
              </Avatar>
              <Typography variant="h6" gutterBottom>
                上传项目资源
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mb: 3, maxWidth: 500 }}
              >
                支持上传 ZIP, RAR, PDF, DOC, PPT 等格式文件。您也可以拖放文件到此区域进行上传。
              </Typography>
              <Button variant="contained" startIcon={<FileUploadIcon />} size="large">
                选择文件上传
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    ),
  },
  {
    label: '完成',
    description: '项目创建完成',
    content: (
      <Box sx={{ my: 3, textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 3,
            bgcolor: 'success.main',
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 50, color: 'white' }} />
        </Avatar>

        <Typography variant="h5" gutterBottom fontWeight="500">
          恭喜！项目创建成功
        </Typography>

        <Typography variant="body1" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
          您的项目已经成功创建。您现在可以开始进行开发工作，或者邀请团队成员参与协作。
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<LaunchIcon />} sx={{ px: 3 }}>
            进入项目管理
          </Button>

          <Button variant="outlined" startIcon={<PeopleIcon />} sx={{ px: 3 }}>
            邀请团队成员
          </Button>
        </Box>

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 2,
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            maxWidth: 600,
            mx: 'auto',
            border: '1px solid #e0e0e0',
          }}
        >
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon sx={{ mr: 1, fontSize: 20 }} />
            项目创建成功后，您可以在项目管理页面查看详情，并进一步配置项目设置。
          </Typography>
        </Paper>
      </Box>
    ),
  },
];

const ProjectCreationPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [projectType, setProjectType] = React.useState('');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setProjectType('');
  };

  // 选择项目类型
  const handleSelectProjectType = (type: string) => {
    setProjectType(type);
    setTimeout(() => {
      handleNext();
    }, 100);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid #e0e0e0',
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight="500">
            创建新项目
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            按照以下步骤创建您的新项目
          </Typography>
        </Box>

        {/* 水平步骤指示器 */}
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<ColorlibConnector />}
          sx={{ mb: 4 }}
        >
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* 步骤内容 */}
        <Box sx={{ mt: 2, minHeight: 300 }}>
          {activeStep === steps.length ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                所有步骤已完成
              </Typography>
              <Typography variant="body1" paragraph>
                您的项目已经成功创建，可以开始使用或创建新项目。
              </Typography>
              <Button onClick={handleReset} variant="outlined" sx={{ mt: 2 }}>
                创建新项目
              </Button>
            </Box>
          ) : (
            <Box>
              <Box>
                {activeStep === 0
                  ? steps[activeStep].content(handleSelectProjectType)
                  : steps[activeStep].content}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt: 3,
                  pt: 2,
                  borderTop: '1px solid #eee',
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  上一步
                </Button>
                <Button variant="contained" onClick={handleNext} sx={{ minWidth: 100 }}>
                  {activeStep === steps.length - 1 ? '完成' : '下一步'}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export const Component = ProjectCreationPage;
