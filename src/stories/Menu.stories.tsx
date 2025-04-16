// 导入图标
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowRight from '@mui/icons-material/ArrowRight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Meta } from '@storybook/react';
import { bindHover, bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import * as React from 'react';

const meta = {
  title: 'MUI/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;

// 基础菜单
export const BasicMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ width: '100%', maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          基础菜单
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          最基本的菜单组件，通过点击按钮打开，需要手动管理状态。
        </Typography>

        <Button
          variant="contained"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          打开菜单
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>个人资料</MenuItem>
          <MenuItem onClick={handleClose}>我的账户</MenuItem>
          <MenuItem onClick={handleClose}>退出登录</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

// 使用 material-ui-popup-state 的菜单
export const MenuWithPopupState = () => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });

  return (
    <Card sx={{ width: '100%', maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          使用 material-ui-popup-state
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          使用 material-ui-popup-state 可以简化菜单状态管理，避免手动处理 anchorEl。
        </Typography>

        <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
          打开菜单
        </Button>
        <Menu {...bindMenu(popupState)}>
          <MenuItem onClick={popupState.close}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>个人资料</ListItemText>
          </MenuItem>
          <MenuItem onClick={popupState.close}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>设置</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={popupState.close}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>退出登录</ListItemText>
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

// 上下文菜单（右键菜单）
export const ContextMenu = () => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'contextMenu' });
  const [anchorPosition, setAnchorPosition] = React.useState<{ top: number; left: number } | null>(
    null,
  );

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setAnchorPosition({
      left: event.clientX,
      top: event.clientY,
    });
    popupState.open();
  };

  return (
    <Card sx={{ width: '100%', maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          上下文菜单（右键菜单）
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          右键点击下方区域触发上下文菜单，常用于文件管理、编辑器等场景。
        </Typography>

        <div
          onContextMenu={handleContextMenu}
          style={{
            width: '100%',
            height: 100,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed #ccc',
            cursor: 'context-menu',
          }}
        >
          <Typography variant="body2">右键点击此区域</Typography>
        </div>

        <Menu
          {...bindMenu(popupState)}
          anchorReference="anchorPosition"
          anchorPosition={anchorPosition ?? undefined}
        >
          <MenuItem onClick={popupState.close}>
            <ListItemIcon>
              <ContentCutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>剪切</ListItemText>
          </MenuItem>
          <MenuItem onClick={popupState.close}>
            <ListItemIcon>
              <ContentCopyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>复制</ListItemText>
          </MenuItem>
          <MenuItem onClick={popupState.close}>
            <ListItemIcon>
              <ContentPasteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>粘贴</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={popupState.close}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>删除</ListItemText>
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

// 嵌套菜单
export const NestedMenu = () => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'nestedMenu' });
  const nestedPopupState = usePopupState({ variant: 'popover', popupId: 'nestedSubMenu' });

  return (
    <Card sx={{ width: '100%', maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          嵌套菜单
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          菜单可以嵌套，鼠标悬停在子菜单项上时展开。
        </Typography>

        <Button variant="contained" {...bindTrigger(popupState)}>
          打开菜单
        </Button>
        <Menu {...bindMenu(popupState)}>
          <MenuItem onClick={popupState.close}>首页</MenuItem>
          <MenuItem
            {...bindHover(nestedPopupState)}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            设置
            <ArrowRight fontSize="small" />
          </MenuItem>
          <MenuItem onClick={popupState.close}>帮助</MenuItem>
          <MenuItem onClick={popupState.close}>关于</MenuItem>
        </Menu>

        <Menu
          {...bindMenu(nestedPopupState)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem
            onClick={() => {
              nestedPopupState.close();
              popupState.close();
            }}
          >
            账户设置
          </MenuItem>
          <MenuItem
            onClick={() => {
              nestedPopupState.close();
              popupState.close();
            }}
          >
            安全设置
          </MenuItem>
          <MenuItem
            onClick={() => {
              nestedPopupState.close();
              popupState.close();
            }}
          >
            通知设置
          </MenuItem>
          <MenuItem
            onClick={() => {
              nestedPopupState.close();
              popupState.close();
            }}
          >
            高级设置
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

// 更多常见菜单模式
export const MenuPatterns = () => {
  // 更多操作菜单
  const moreActionsPopupState = usePopupState({ variant: 'popover', popupId: 'moreActionsMenu' });

  // 选择菜单
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selectPopupState = usePopupState({ variant: 'popover', popupId: 'selectMenu' });
  const options = ['小', '中', '大', '超大'];

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    selectPopupState.close();
  };

  return (
    <Stack spacing={4}>
      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            更多操作按钮
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            常见于列表项、卡片等UI元素中，通过图标按钮展示更多操作选项。
          </Typography>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 8,
              border: '1px solid #eee',
              borderRadius: 4,
            }}
          >
            <Typography>用户资料项</Typography>
            <IconButton {...bindTrigger(moreActionsPopupState)} size="small">
              <MoreVertIcon />
            </IconButton>
          </div>

          <Menu {...bindMenu(moreActionsPopupState)}>
            <MenuItem onClick={moreActionsPopupState.close}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>编辑</ListItemText>
            </MenuItem>
            <MenuItem onClick={moreActionsPopupState.close}>
              <ListItemIcon>
                <ContentCopyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>复制</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={moreActionsPopupState.close} sx={{ color: 'error.main' }}>
              <ListItemIcon sx={{ color: 'error.main' }}>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>删除</ListItemText>
            </MenuItem>
          </Menu>
        </CardContent>
      </Card>

      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            选择菜单
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            用户可以从菜单中选择一个选项，类似于下拉框但更灵活。
          </Typography>

          <Button variant="outlined" {...bindTrigger(selectPopupState)}>
            {options[selectedIndex]}
          </Button>
          <Menu {...bindMenu(selectPopupState)}>
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={() => handleMenuItemClick(index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </CardContent>
      </Card>
    </Stack>
  );
};
