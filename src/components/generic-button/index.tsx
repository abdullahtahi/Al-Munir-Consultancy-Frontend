import Button from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';
import type { IconProps } from '@tabler/icons-react';
import React from 'react';

interface GenericButtonProps {
  label: string;
  icon?: React.ElementType<IconProps>; // for Tabler icons
  onClick?: () => void;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const GenericButton: React.FC<GenericButtonProps> = ({
  label,
  icon: Icon,
  onClick,
  color = 'inherit',
  variant = 'contained',
  size = 'small',
  type = 'button',
  fullWidth = false,
  disabled = false,
  sx,
}) => {
  return (
    <Button
      type={type}
      onClick={type === 'submit' ? undefined : onClick}
      color={color}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      startIcon={Icon ? <Icon size={18} /> : null}
      sx={sx || {}}
    >
      {label}
    </Button>
  );
};

export default GenericButton;
