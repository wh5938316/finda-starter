import Badge, { badgeClasses } from '@mui/material/Badge';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';

export interface MenuButtonProperties extends IconButtonProps {
  showBadge?: boolean;
}

export default function MenuButton({ showBadge = false, ...properties }: MenuButtonProperties) {
  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!showBadge}
      sx={{ [`& .${badgeClasses.badge}`]: { right: 2, top: 2 } }}
    >
      <IconButton size="small" {...properties} />
    </Badge>
  );
}
