import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Divider, { dividerClasses } from '@mui/material/Divider';
import { listClasses } from '@mui/material/List';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { paperClasses } from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import * as React from 'react';

import MenuButton from './MenuButton';

const MenuItem = styled(MuiMenuItem)({
  margin: '2px 0',
});

export default function OptionsMenu() {
  const popupState = usePopupState({ variant: 'popover', popupId: 'optionsMenu' });

  return (
    <React.Fragment>
      <MenuButton
        aria-label="打开菜单"
        sx={{ borderColor: 'transparent' }}
        {...bindTrigger(popupState)}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        id="options-menu"
        {...bindMenu(popupState)}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              width: 200,
            },
          },
        }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: '4px',
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: '4px -4px',
          },
        }}
      >
        <MenuItem onClick={popupState.close}>个人信息</MenuItem>
        <MenuItem onClick={popupState.close}>我的账户</MenuItem>
        <Divider />
        <MenuItem onClick={popupState.close}>添加另一个账户</MenuItem>
        <MenuItem onClick={popupState.close}>设置</MenuItem>
        <Divider />
        <MenuItem
          onClick={popupState.close}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: 'auto',
              minWidth: 0,
            },
          }}
        >
          <ListItemText>退出登录</ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
