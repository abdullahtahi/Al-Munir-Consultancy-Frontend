import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { DialogActions } from '@mui/material';
import GenericButton from '../generic-button';
import { IconDeviceFloppy, IconLetterX } from '@tabler/icons-react';

interface DeleteDialogProp {
  deleteImg: () => void;
  handleClose: () => void;
  title: string;
  subText: string;
  open: boolean;
}

export const DeleteDialog: React.FC<DeleteDialogProp> = ({
  deleteImg,
  handleClose,
  title,
  subText,
  open,
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {subText}
            </Typography>

            <DialogActions>
              <GenericButton
                label={'Cancel'}
                onClick={handleClose}
                color="error"
                icon={IconLetterX}
                variant="outlined"
                size="medium"
              />
              <GenericButton
                label={'Delete'}
                onClick={deleteImg}
                color="primary"
                icon={IconDeviceFloppy}
                variant="contained"
                size="medium"
              />
            </DialogActions>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
