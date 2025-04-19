import MuiListItemButton from '@mui/material/ListItemButton';
import { listItemTextClasses } from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

const ListItemButton = styled(MuiListItemButton)(({ theme }) => [
  {
    color: theme.vars.palette.text.secondary,
    backgroundColor: 'transparent',
    '&.Mui-selected': {
      [`& .${listItemTextClasses.primary}`]: {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
  },
  theme.applyStyles('dark', {
    color: theme.vars.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.vars.palette.background.surface,
    },
    '&.Mui-selected': {
      color: theme.vars.palette.text.primary,
      backgroundColor: theme.vars.palette.background.control,
      backgroundImage: `linear-gradient(to bottom, #262626, #1d1d1d)`,
      position: 'relative',
      borderRadius: 8,
      border: 'none',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 8,
        padding: '1px',
        background: `linear-gradient(to bottom, #525252, #323232)`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        pointerEvents: 'none',
      },
    },
  }),
]) as typeof MuiListItemButton;

export default ListItemButton;
