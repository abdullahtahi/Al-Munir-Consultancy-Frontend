import GenericButton from '@components/generic-button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IconDeviceFloppy, IconLetterX, IconX } from '@tabler/icons-react';
import { Form, Formik } from 'formik';
import React from 'react';
import CustomFields from 'src/components/custom-fields/custom-fields';
import * as Yup from 'yup';

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
  handleSubmit: (values: any) => void;
  singleUser: any;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  open,
  onClose,
  handleSubmit,
  singleUser,
}) => {
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('New Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('newPassword')], 'Password not match'),
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          width: { xs: '90%', sm: '400px' },
          mx: 'auto',
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3">Change Password</Typography>
          <IconButton onClick={onClose}>
            <IconX />
          </IconButton>
        </Box>
      </DialogTitle>

      <Formik
        initialValues={{
          employeeName: `${singleUser?.firstName || ''} ${singleUser?.lastName || ''}`,
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit({
            id: singleUser.id,
            password: values.newPassword,
          });
        }}
        enableReinitialize
      >
        {({ handleSubmit, errors, values }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <CustomFields
                    name="employeeName"
                    label="Employee Name"
                    placeholder="Employee Name"
                    disabled
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomFields
                    name="newPassword"
                    label="New Password"
                    type="password"
                    placeholder="Enter New Password"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomFields
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm New Password"
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <GenericButton
                label={'Cancel'}
                onClick={onClose}
                color="error"
                icon={IconLetterX}
                variant="outlined"
                size="medium"
              />
              <GenericButton
                label={'Change Password'}
                type="submit"
                disabled={
                  Object.keys(errors).length > 0 ||
                  !values.newPassword ||
                  !values.confirmPassword
                }
                color="primary"
                icon={IconDeviceFloppy}
                variant="contained"
                size="medium"
              />
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ChangePasswordDialog;
