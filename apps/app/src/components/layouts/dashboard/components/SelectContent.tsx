import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import { Typography } from '@mui/material';
import MuiAvatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import React from 'react';

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent() {
  const [selectedValue, setSelectedValue] = React.useState('');
  const [selectedLabel, setSelectedLabel] = React.useState('Sitemark-web');
  const popupState = usePopupState({ variant: 'popover', popupId: 'contentMenu' });

  const handleMenuItemClick = (value: string, label: string) => {
    setSelectedValue(value);
    setSelectedLabel(label);
    popupState.close();
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
      }}
    >
      <Button
        {...bindTrigger(popupState)}
        sx={{
          justifyContent: 'flex-start',
          height: 64,
          py: 1.5,
          pl: 1,
          pr: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
          borderRadius: 0,
          textTransform: 'none',
          color: 'text.primary',
          width: '100%',
          '&.Mui-focused': {
            borderColor: 'divider',
            outline: 'none',
          },
          '&:focus-visible': {
            borderColor: 'divider',
            outline: 'none',
          },
        }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar alt="Sitemark web">
            <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
          <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle2" color="text.primary">
              {selectedLabel}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Web app
            </Typography>
          </Box>
        </Box>
      </Button>

      <Menu
        {...bindMenu(popupState)}
        marginThreshold={6}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 'calc(240px - 12px)',
              maxHeight: 480,
              mt: 0.5,
            },
          },
        }}
      >
        <ListSubheader sx={{ pt: 0 }}>Production</ListSubheader>
        <MenuItem onClick={() => handleMenuItemClick('', 'Sitemark-web')}>
          <ListItemAvatar>
            <Avatar alt="Sitemark web">
              <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Sitemark-web" secondary="Web app" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('10', 'Sitemark-app')}>
          <ListItemAvatar>
            <Avatar alt="Sitemark App">
              <SmartphoneRoundedIcon sx={{ fontSize: '1rem' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Sitemark-app" secondary="Mobile application" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('20', 'Sitemark-Store')}>
          <ListItemAvatar>
            <Avatar alt="Sitemark Store">
              <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Sitemark-Store" secondary="Web app" />
        </MenuItem>
        <ListSubheader>Development</ListSubheader>
        <MenuItem onClick={() => handleMenuItemClick('30', 'Sitemark-Admin')}>
          <ListItemAvatar>
            <Avatar alt="Sitemark Store">
              <ConstructionRoundedIcon sx={{ fontSize: '1rem' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Sitemark-Admin" secondary="Web app" />
        </MenuItem>
        <Divider sx={{ mx: -1 }} />
        <MenuItem onClick={() => handleMenuItemClick('40', 'Add product')}>
          <ListItemIcon>
            <AddRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Add product" secondary="Web app" />
        </MenuItem>
      </Menu>
    </Box>
  );
}
