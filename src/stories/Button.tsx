import './button.css';

import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import * as React from 'react';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

interface StyledButtonProps {
  backgroundColor?: string;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'backgroundColor',
})<StyledButtonProps>(({ theme, backgroundColor }) => ({
  ...(backgroundColor && { backgroundColor, '&:hover': { backgroundColor } }),
}));

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      variant={primary ? 'contained' : 'outlined'}
      size={size}
      color={primary ? 'primary' : 'secondary'}
      backgroundColor={backgroundColor}
      {...props}
    >
      {label}
    </StyledButton>
  );
};
