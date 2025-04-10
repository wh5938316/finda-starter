import { useSortable } from '@dnd-kit/react/sortable';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LinkIcon from '@mui/icons-material/Link';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

interface ItemProperties {
  id: string;
  index: number;
  column?: string;
  isActive?: boolean;
}

// 优先级对应的MUI颜色
const priorityColorMap = {
  Urgent: 'error',
  Normal: 'warning',
  Low: 'success',
} as const;

function getTaskData(id: string) {
  const priorities = ['Urgent', 'Normal', 'Low'];
  const taskTypes = ['Homepage', 'Marketing', 'Tech work', 'Animation', 'Logo', 'Contact'];

  // 根据ID计算一个确定性哈希值，使相同ID总是产生相同结果
  const hash = id.split('').reduce((accumulator, char) => accumulator + char.charCodeAt(0), 0);

  // 生成优先级和任务类型
  const priority = priorities[hash % 3];
  const taskType = taskTypes[hash % 6];

  // 生成评论数和任务代码
  const commentCount = hash % 15;
  const taskCode = `MDS-${(hash % 100) + 1}`;

  // 使用dayjs生成日期
  // 为了确保日期相对合理，用当前时间作为基准，加上基于hash的随机天数
  const today = dayjs();
  const daysToAdd = hash % 180; // 最多6个月时间跨度
  const dueDate = today.add(daysToAdd, 'day');
  const formattedDate = dueDate.format("MMM D, 'YY"); // 例如：Jan 15, '24

  return {
    taskCode,
    priority,
    title: id,
    type: taskType,
    dueDate: formattedDate,
    commentCount,
    rawDueDate: dueDate, // 保留原始dayjs对象，以便后续需要
  };
}

export function Item({ id, index, column, isActive }: ItemProperties) {
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
        transform: 'rotate(-4deg)',
        // transform: 'rotate(-4deg) scale(1)',
        zIndex: 1000,
        opacity: 0.9,
        position: 'relative' as const,
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
      }
    : undefined;

  // 普通拖拽项
  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
      }}
    >
      <Card
        style={style}
        sx={{
          cursor: 'grab',
          touchAction: 'none',
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
              color={
                priorityColorMap[taskData.priority as keyof typeof priorityColorMap] || undefined
              }
              variant="outlined"
              sx={{
                height: 22,
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
    </Box>
  );
}
