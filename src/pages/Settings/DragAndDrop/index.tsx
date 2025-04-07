import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FilterListIcon from '@mui/icons-material/FilterList';
import TableRowsIcon from '@mui/icons-material/TableRows';
import TimelineIcon from '@mui/icons-material/Timeline';
import TuneIcon from '@mui/icons-material/Tune';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { Link } from 'react-router';

import { Column } from './Column';
import { Item } from './Item';

// 样式组件
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

// 视图切换选项卡
const ViewTab = styled(Tab)(({ theme }) => ({
  minHeight: 48,
  minWidth: 100,
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
  },
}));

// 工具栏按钮
const ToolbarButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.action.hover, 0.8),
  },
}));

const DragAndDropDemo = () => {
  const theme = useTheme();
  // 视图选择状态
  const [viewTab, setViewTab] = useState(1); // Board视图

  // 跟踪正在拖动的项
  const [activeId, setActiveId] = useState<string | null>(null);

  // 更新任务状态
  const [items, setItems] = useState({
    A: ['任务管理界面设计', '用户反馈收集', '性能优化', '登录页面重构', '用户体验改进'],
    B: ['API集成', '响应式布局'],
    C: ['首页设计', '产品详情页'],
    D: ['功能测试', '文档编写', '站点地图'],
  });

  // 处理视图切换
  const handleViewChange = (event: React.SyntheticEvent, newValue: number) => {
    setViewTab(newValue);
  };

  // 处理拖拽开始
  const handleDragStart = (event: any) => {
    const { operation } = event;
    setActiveId(operation.source.id);
  };

  // 处理拖拽结束时的操作
  const handleDragOver = (event: any) => {
    // console.log(event)
    setItems((currentItems) => move(currentItems, event));
  };

  // 处理拖拽结束
  const handleDragEnd = () => {
    setActiveId(null);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          任务管理看板
        </Typography>
      </Box>

      <Typography color="text.secondary" variant="body1" sx={{ mt: 1, mb: 4 }}>
        使用拖放功能管理和组织任务，跟踪项目进度
      </Typography>

      {/* 视图选择和工具栏 */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Tabs
          value={viewTab}
          onChange={handleViewChange}
          sx={{
            minHeight: 48,
            '& .MuiTabs-indicator': { display: 'none' },
          }}
        >
          <ViewTab icon={<TableRowsIcon fontSize="small" />} label="表格" />
          <ViewTab icon={<ViewModuleIcon fontSize="small" />} label="看板" />
          <ViewTab icon={<CalendarMonthIcon fontSize="small" />} label="日历" />
          <ViewTab icon={<TimelineIcon fontSize="small" />} label="时间线" />
        </Tabs>

        <Box>
          <Tooltip title="筛选">
            <ToolbarButton size="small">
              <FilterListIcon fontSize="small" />
            </ToolbarButton>
          </Tooltip>
          <Tooltip title="调整">
            <ToolbarButton size="small">
              <TuneIcon fontSize="small" />
            </ToolbarButton>
          </Tooltip>
          <Tooltip title="小组件">
            <ToolbarButton size="small">
              <WidgetsIcon fontSize="small" />
            </ToolbarButton>
          </Tooltip>
        </Box>
      </Stack>

      {/* 拖拽区域 */}
      <Box sx={{ mb: 4, pb: 2 }}>
        <DragDropProvider
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              mb: 4,
              flexWrap: 'nowrap',
              minWidth: 'fit-content',
            }}
          >
            {Object.entries(items).map(([column, columnItems]) => (
              <Column key={column} id={column} activeId={activeId}>
                {columnItems.map((id, index) => (
                  <Item key={id} id={id} index={index} column={column} isActive={id === activeId} />
                ))}
              </Column>
            ))}
          </Box>
        </DragDropProvider>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          使用说明
        </Typography>
        <Typography variant="body2" color="text.secondary">
          1. 点击并拖动任务卡片可以移动它
          <br />
          2. 将任务卡片拖到另一个列表中可以改变其所属分类
          <br />
          3. 释放鼠标按钮完成移动操作
          <br />
          4. 任务在不同列表间可以自由移动和排序
        </Typography>
      </Box>
    </Container>
  );
};

export const Component = DragAndDropDemo;
