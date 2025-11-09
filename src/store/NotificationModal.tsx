import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import { CheckCircle, Error, Warning, Info } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'loading';

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  type: NotificationType;
  title?: string;
  message: string;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  onConfirm?: () => void;
  showCancelButton?: boolean;
  cancelButtonText?: string;
}

const iconStyles = {
  fontSize: 60,
  mb: 2
};

const typeStyles = {
  success: {
    icon: <CheckCircle color="success" sx={iconStyles} />,
    color: 'success.main'
  },
  error: {
    icon: <Error color="error" sx={iconStyles} />,
    color: 'error.main'
  },
  warning: {
    icon: <Warning color="warning" sx={iconStyles} />,
    color: 'warning.main'
  },
  info: {
    icon: <Info color="info" sx={iconStyles} />,
    color: 'info.main'
  },
  loading: {
    icon: <CircularProgress size={60} sx={iconStyles} />,
    color: 'primary.main'
  }
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  open,
  onClose,
  type,
  title,
  message,
  showConfirmButton = false,
  confirmButtonText,
  onConfirm,
  showCancelButton = true,
  cancelButtonText
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="notification-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        p={4}
      >
        {typeStyles[type].icon}
        {title && (
          <DialogTitle id="notification-dialog-title" sx={{ color: typeStyles[type].color }}>
            {title}
          </DialogTitle>
        )}
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', width: '100%' }}>
          {showConfirmButton && (
            <Button
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
              color="primary"
              variant="contained"
              sx={{ minWidth: 120 }}
            >
              {confirmButtonText || t('common.confirm')}
            </Button>
          )}
          {showCancelButton && (
            <Button
              onClick={onClose}
              color="inherit"
              variant="outlined"
              sx={{ minWidth: 120 }}
              disabled={type === 'loading'}
            >
              {cancelButtonText || t('common.cancel')}
            </Button>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default NotificationModal;