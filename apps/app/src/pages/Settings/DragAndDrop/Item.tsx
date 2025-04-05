import { useSortable } from '@dnd-kit/react/sortable';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import LinkIcon from '@mui/icons-material/Link';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import React from 'react';

interface ItemProps {
  id: string;
  index: number;
  column?: string;
  isActive?: boolean;
}

const priorityColors = {
  Urgent: '#f44336',
  Normal: '#ff9800',
  Low: '#4caf50',
};

const getTaskData = (id: string) => {
  const priorities = ['Urgent', 'Normal', 'Low'];
  const taskTypes = ['Homepage', 'Marketing', 'Tech work', 'Animation', 'Logo', 'Contact'];
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const priority = priorities[hash % 3];
  const taskType = taskTypes[hash % 6];
  const month = monthNames[hash % 12];
  const day = (hash % 28) + 1;
  const year = "'24";
  const commentCount = hash % 15;
  const taskCode = `MDS-${(hash % 100) + 1}`;

  return {
    taskCode,
    priority,
    title: id,
    type: taskType,
    dueDate: `${month} ${day}, ${year}`,
    commentCount,
  };
};

export function Item({ id, index, column, isActive }: ItemProps) {
  // 使用基础的ref来使组件可拖拽
  const { ref, isDragging } = useSortable({
    id,
    index,
    group: column,
    type: 'item',
    accept: ['item'],
  });

  const taskData = getTaskData(id);

  // 定义拖拽状态下的样式
  const style = isDragging
    ? {
        transition: '0.2s ease',
        transform: 'rotate(-4deg) scale(1.05)',
        zIndex: 1000,
        opacity: 0.9,
        position: 'relative' as const,
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
      }
    : undefined;

  const priorityColor =
    priorityColors[taskData.priority as keyof typeof priorityColors] || '#757575';

  // 如果是活动拖拽项，返回占位UI
  if (isActive) {
    return (
      <div
        style={{
          marginBottom: '16px',
          height: '160px', // 占位高度
        }}
      >
        <Card
          sx={{
            borderRadius: 2,
            height: '100%',
            border: '2px dashed',
            borderColor: 'divider',
            backgroundColor: alpha('#f5f5f5', 0.7),
            boxShadow: 'none',
          }}
        />
      </div>
    );
  }

  // 普通拖拽项
  return (
    <div
      ref={ref}
      style={{
        cursor: 'grab',
        touchAction: 'none',
        marginBottom: '16px',
      }}
    >
      <Card
        style={style}
        sx={{
          borderRadius: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          '&:hover': { boxShadow: '0 3px 8px rgba(0,0,0,0.15)' },
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'visible',
        }}
      >
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          {/* 任务代码和优先级 */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Box display="flex" alignItems="center">
              <LinkIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" fontWeight="medium">
                {taskData.taskCode}
              </Typography>
            </Box>
            <Chip
              label={taskData.priority}
              size="small"
              sx={{
                height: 22,
                bgcolor: alpha(priorityColor, 0.1),
                color: priorityColor,
                fontWeight: 500,
                fontSize: '0.75rem',
                borderRadius: 1,
                '& .MuiChip-label': { px: 1 },
              }}
            />
          </Box>

          {/* 任务标题 */}
          <Typography variant="subtitle1" fontWeight="medium" mb={1}>
            {id}
          </Typography>

          {/* 任务类型/标签 */}
          <Box display="flex" alignItems="center" mb={2}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '0.75rem',
                color: 'text.secondary',
                bgcolor: 'action.hover',
                px: 1,
                py: 0.25,
                borderRadius: 1,
              }}
            >
              🏷️ {taskData.type}
            </Box>
          </Box>

          {/* 截止日期 */}
          <Box display="flex" alignItems="center" mb={2}>
            <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Due to: {taskData.dueDate}
            </Typography>
          </Box>

          {/* 底部信息：头像和评论 */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 28, height: 28 } }}>
              <Avatar
                alt="User 1"
                src={`https://randomuser.me/api/portraits/men/${index + 10}.jpg`}
                sx={{ width: 28, height: 28 }}
              />
              {index % 2 === 0 && (
                <Avatar
                  alt="User 2"
                  src={`https://randomuser.me/api/portraits/women/${index + 15}.jpg`}
                  sx={{ width: 28, height: 28 }}
                />
              )}
              {index % 3 === 0 && (
                <Avatar
                  alt="User 3"
                  src={`https://randomuser.me/api/portraits/men/${index + 20}.jpg`}
                  sx={{ width: 28, height: 28 }}
                />
              )}
            </AvatarGroup>

            <Box display="flex" alignItems="center">
              <ChatBubbleOutlineIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {taskData.commentCount}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
