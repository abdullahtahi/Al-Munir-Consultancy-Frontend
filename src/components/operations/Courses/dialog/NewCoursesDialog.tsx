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
import FileUploadField from 'src/components/custom-file-Upload/custom-file-upload';
import CustomSelect from 'src/components/custom-select/custom-select';
import GenericButton from 'src/components/generic-button';
import { BASE_URL } from 'src/constants/AppConstants';
import * as Yup from 'yup';

interface NewCoursesDialogProps {
  open: boolean;
  onClose: () => void;
  handleSubmit: (values: any) => void;
  mode: 'Add' | 'Edit';
  singleUser: any;
}

export const initialValues = {
  name: '',
  logo: '',
  isActive: true,
};

const NewCoursesDialog: React.FC<NewCoursesDialogProps> = ({
  open,
  onClose,
  handleSubmit,
  mode,
  singleUser,
}) => {
  const getValidationSchema = () =>
    Yup.object().shape({
      name: Yup.string().required('name is required'),
      logo: Yup.string().required('logo is required'),
      isActive: Yup.string(),
    });
  const title: any = mode === 'Add' ? 'Add Courses' : 'Edit Courses';
  const actionLabel = mode === 'Add' ? 'Add' : 'Edit';

  const status = [
    {
      key: 'Active',
      value: 'Active',
    },
    {
      key: 'In Active',
      value: 'In Active',
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          width: { xs: 'calc(100% - 20px)', md: 1200 },
          mx: 'auto',
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3">{title}</Typography>
          <IconButton onClick={onClose}>
            <IconX />
          </IconButton>
        </Box>
      </DialogTitle>

      <Formik
        initialValues={
          mode === 'Edit' && singleUser
            ? {
                name: singleUser?.name,
                logo: singleUser?.logo || '',
                isActive: singleUser.isActive == true ? 'Active' : 'In Active',
              }
            : initialValues
        }
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleSubmit, errors }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={2} sx={{}}>
                  <Grid size={{ xs: 12 }}>
                    <CustomFields
                      name="name"
                      label="Course Name"
                      placeholder="Enter Course Name"
                    />
                  </Grid>

                  {mode === 'Edit' && (
                    <Grid size={{ xs: 12 }}>
                      <CustomSelect
                        name="isActive"
                        label="isActive"
                        placeholder="Enter Status"
                        options={status}
                      />
                    </Grid>
                  )}
                  <Grid size={{ xs: 12 }}>
                    <FileUploadField key={'logo'} name={'logo'} label={''} />
                    {mode === 'Edit' && (
                      <img
                        src={`${BASE_URL + '/' + singleUser.logo}`}
                        className="admissionImgs"
                        alt="Branch Image"
                      />
                    )}
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
                  label={actionLabel}
                  type="submit"
                  disabled={Object.keys(errors).length > 0 ? true : false}
                  color="primary"
                  icon={IconDeviceFloppy}
                  variant="contained"
                  size="medium"
                />
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default NewCoursesDialog;
