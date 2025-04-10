import { CollisionPriority } from '@dnd-kit/abstract';
import { useDroppable } from '@dnd-kit/react';
import BoltIcon from '@mui/icons-material/Bolt';
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';

// 样式组件
const ColumnContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  minWidth: 320,
  maxWidth: 400,
  minHeight: 400,
  backgroundColor: alpha(theme.palette.background.paper, 0.6),
  borderRadius: theme.shape.borderRadius,
  transition: 'box-shadow 0.2s ease-in-out',
  border: `1px solid ${theme.palette.divider}`,
}));

// 获取每个列对应的图标和颜色
const getColumnIcon = (id: string) => {
  switch (id) {
    case 'A': {
      return {
        icon: <FolderIcon fontSize="small" />,
        color: '#607d8b',
        name: 'Backlog',
        count: 24,
      };
    }
    case 'B': {
      return {
        icon: <BoltIcon fontSize="small" />,
        color: '#ff9800',
        name: 'In progress',
        count: 4,
      };
    }
    case 'C': {
      return {
        icon: <VerifiedIcon fontSize="small" />,
        color: '#e91e63',
        name: 'Validation',
        count: 7,
      };
    }
    case 'D': {
      return {
        icon: <TaskAltIcon fontSize="small" />,
        color: '#4caf50',
        name: 'Done',
        count: 13,
      };
    }
    default: {
      return {
        icon: <FolderIcon fontSize="small" />,
        color: '#9e9e9e',
        name: id,
        count: React.Children.count(id),
      };
    }
  }
};

interface ColumnProps {
  children: React.ReactNode;
  id: string;
  activeId?: string | null;
}

export function Column({ children, id, activeId }: ColumnProps) {
  // 简化使用useDroppable钩子
  const { ref, isDropTarget } = useDroppable({
    id,
    type: 'column',
    accept: ['item'],
    collisionPriority: CollisionPriority.Low,
  });

  const columnInfo = getColumnIcon(id);

  // 检查列是否为空，显示空列占位符
  const isEmpty = React.Children.count(children) === 0;

  // 添加投放区高亮效果
  const style = isDropTarget
    ? {
        backgroundColor: alpha(columnInfo.color, 0.08),
        boxShadow: `0 0 0 2px ${columnInfo.color}`,
      }
    : undefined;

  return (
    <ColumnContainer
      elevation={0}
      style={style}
      sx={{
        position: 'relative',
        transition: 'all 0.2s ease',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          pb: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: columnInfo.color,
              mr: 1,
            }}
          >
            {columnInfo.icon}
          </Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {columnInfo.name}
            <Typography component="span" variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
              {columnInfo.count}
            </Typography>
          </Typography>
        </Box>
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        ref={ref}
        sx={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          height: '100%',
        }}
      >
        {children}

        {/* 显示列为空时的占位符 */}
        {isEmpty && (
          <Card
            sx={{
              borderRadius: 2,
              height: 100,
              border: '2px dashed',
              borderColor: 'divider',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              拖放任务到此处
            </Typography>
          </Card>
        )}
      </Box>
    </ColumnContainer>
  );
}
