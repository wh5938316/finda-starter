import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import * as React from 'react';

import {
  StepItem as StepItemType,
  gettingStartedSteps,
  joinMovementSteps,
  prepareLaunchSteps,
} from './mockData';

interface StepItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  completed?: boolean;
  onClick: () => void;
}

const StepItem = ({ icon, title, description, buttonText, completed, onClick }: StepItemProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
      <Avatar
        sx={{
          bgcolor: 'action.selected',
          width: 36,
          height: 36,
          mr: 2,
          color: completed ? 'text.secondary' : 'text.primary',
        }}
      >
        {icon}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" color={completed ? 'text.secondary' : 'text.primary'}>
          {title}
        </Typography>
        <Typography variant="body2" color={completed ? 'text.disabled' : 'text.secondary'}>
          {description}
        </Typography>
      </Box>
      {completed ? (
        <Avatar
          sx={{
            bgcolor: 'success.main',
            width: 36,
            height: 36,
          }}
        >
          <CheckIcon />
        </Avatar>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          sx={{
            minWidth: 120,
            width: { xs: '100%', sm: 120 },
          }}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

const GuidePage = () => {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const [completedSteps, setCompletedSteps] = React.useState<Record<string, boolean>>({
    'create-community': true,
  });

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps((prev) => ({ ...prev, [stepId]: true }));
  };

  // 计算各部分剩余任务数
  const gettingStartedTaskIds = gettingStartedSteps.map((step) => step.id);
  const gettingStartedRemaining = gettingStartedTaskIds.filter(
    (task) => !completedSteps[task],
  ).length;

  const joinMovementTaskIds = joinMovementSteps.map((step) => step.id);
  const joinMovementRemaining = joinMovementTaskIds.filter((task) => !completedSteps[task]).length;

  const prepareLaunchTaskIds = prepareLaunchSteps.map((step) => step.id);
  const prepareLaunchRemaining = prepareLaunchTaskIds.filter(
    (task) => !completedSteps[task],
  ).length;

  // 渲染步骤项
  const renderStepItems = (steps: StepItemType[]) => {
    return steps.map((step) => (
      <StepItem
        key={step.id}
        icon={step.icon}
        title={step.title}
        description={step.description}
        buttonText={step.buttonText}
        completed={completedSteps[step.id]}
        onClick={() => handleStepComplete(step.id)}
      />
    ));
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="500">
          恭喜您创建了新社区 🔥
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          完成这些简单步骤，让您的社区快速运行起来。
        </Typography>
      </Box>

      <Paper
        elevation={1}
        sx={{
          borderRadius: 2,
          boxShadow: (theme) => `0 0 10px ${alpha(theme.palette.primary.main, 0.08)}`,
        }}
      >
        {/* 第一部分: 入门指南 */}
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          disableGutters
          elevation={0}
          square
          sx={{
            p: 0,
            borderBottom: 1,
            borderColor: 'divider',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              px: 3,
              py: 1.5,
              overflow: 'hidden',
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: alpha('#000', 0.02) },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                pr: 2,
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">入门指南</Typography>
              <Typography variant="body2" color="text.secondary">
                {gettingStartedRemaining} 步骤待完成
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, py: 0 }}>
            {renderStepItems(gettingStartedSteps)}
          </AccordionDetails>
        </Accordion>

        {/* 第二部分: Join the movement */}
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
          disableGutters
          elevation={0}
          square
          sx={{
            p: 0,
            borderBottom: 1,
            borderColor: 'divider',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              px: 3,
              py: 1.5,
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: alpha('#000', 0.02) },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                pr: 2,
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">加入社区运动</Typography>
              <Typography variant="body2" color="text.secondary">
                {joinMovementRemaining} 步骤待完成
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, py: 0 }}>
            {renderStepItems(joinMovementSteps)}
          </AccordionDetails>
        </Accordion>

        {/* 第三部分: Prepare for the launch */}
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
          disableGutters
          elevation={0}
          square
          sx={{
            p: 0,
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              px: 3,
              py: 1.5,
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: alpha('#000', 0.02) },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                pr: 2,
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">准备发布</Typography>
              <Typography variant="body2" color="text.secondary">
                {prepareLaunchRemaining} 步骤待完成
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, py: 0 }}>
            {renderStepItems(prepareLaunchSteps)}
          </AccordionDetails>
        </Accordion>
      </Paper>

      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          startIcon={<CheckIcon />}
          sx={{ minWidth: 200 }}
        >
          完成设置
        </Button>
      </Box>
    </Container>
  );
};

export const Component = GuidePage;
