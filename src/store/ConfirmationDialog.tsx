import React, { useState, ReactElement, cloneElement } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ButtonProps,
} from '@mui/material';

interface ConfirmationDialogProps {
  onClose?: () => void;
  onAccept: () => void;
  title: string;
  message: string;
  visible?: boolean;
  children?: ReactElement<ButtonProps>;
  onClickEvent?: () => Promise<void> | void;
  agreeText?: string;
  disagreeText?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  onClose,
  onAccept,
  title,
  message,
  visible = true,
  children,
  onClickEvent,
  agreeText = 'Agree',
  disagreeText = 'Disagree',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleOpen = async () => {
    try {
      setIsLoading(true);
      await onClickEvent?.();
      setIsOpen(true);
    } catch (error) {
      console.error('Error in onClickEvent:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    setIsOpen(false);
    onAccept();
  };

  return (
    <>
      <Dialog
        open={isOpen && visible}
        onClose={handleRequestClose}
        aria-labelledby="confirmation-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleRequestClose}
            color="secondary"
            variant="outlined"
            disabled={isLoading}
          >
            {disagreeText}
          </Button>
          <Button
            onClick={handleAccept}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            {agreeText}
          </Button>
        </DialogActions>
      </Dialog>

      {children &&
        cloneElement(children, {
          onClick: handleOpen,
          disabled: isLoading,
          ...children.props,
        })}
    </>
  );
};

export default ConfirmationDialog;
