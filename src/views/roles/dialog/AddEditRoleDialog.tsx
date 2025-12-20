import React, { useMemo } from 'react';

import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid2';

import CustomTextField from '@components/forms/theme-elements/CustomTextField';
import GenericButton from '@components/generic-button';
// import { openDialog } from '@store/slices/globalDepotDialogSlice';
// import { hideLoader, showLoader } from '@store/slices/loaderSlice';
// import { showSnackbar } from '@store/slices/snackbarSlice';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { addRole, updateRole } from 'src/api/role';

import type { AppDispatch, RootState } from 'src/store';
// import type { IRoleFormValues, IRoleResponseRow } from 'src/types/components/users';

interface AddEditRoleDialogProps {
  open: boolean;
  title: string;
  mode: 'add' | 'edit';
  onClose: () => void;
  onSave: () => void;
  selectedRow?: any | null,
  isLoading?: boolean;
}

const AddEditRoleDialog: React.FC<AddEditRoleDialogProps> = ({
  open,
  title,
  mode,
  onClose,
  onSave,
  selectedRow,
  isLoading,
}) => {
  const { t } = useTranslation();
  // const dispatch: AppDispatch = useDispatch();
  const isEdit = mode === 'edit';
  
  const initialValues: any = useMemo(() => {
    if (isEdit && selectedRow) {
      return {
        name: selectedRow.name || '',
        description: selectedRow.description || '',
      };
    }

    return {
      name: '',
      description: '',
    };
  }, [mode, selectedRow]);

  const validationSchema = () => Yup.object().shape({
    name: Yup.string().required('name is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleSubmit = async (values: any) => {
    // dispatch(showLoader('saveRole'));

    try {

      let response;

      if (isEdit && selectedRow?.id) {
        response = await updateRole(selectedRow.id, values);
      } else {
        response = await addRole(values);
      }

      if (response && (response.resStatus === 200 || response.resStatus === 201)) {
        // const message =
        //   isEdit
        //     ? t('role.updatedSuccessfully')
        //     : t('role.createdSuccessfully');

        // dispatch(showSnackbar({ message, severity: 'success' }));
        onSave?.();
        handleClose();
      }
    } catch (error: any) {
      // dispatch(showSnackbar({ message: error?.message || t('appModule.genericError'), severity: 'error' }));
    } finally {
      // dispatch(hideLoader('saveRole'));
    }
  };

  const handleClose = () => {
    onClose();
  };

  const transformedTitle = title ? t(title) : t('role.add');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth={true}
      slotProps={{
        paper: {
          sx: {
            mx: { xs: 1.25, sm: 2 },
          },
        },
      }}
    >
      <DialogTitle>{transformedTitle}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema()}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    label="Role*"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    margin="none"
                    size="small"
                    fullWidth
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    label="Description*"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    margin="none"
                    size="small"
                    fullWidth
                  />
                </Grid>

              </Grid>
            </DialogContent>
            <DialogActions>
              <GenericButton
                label="Cancel"
                color="error"
                variant="contained"
                size="medium"
                icon={IconX}
                onClick={onClose}
                sx={{ textTransform: 'uppercase' }}
              />
              <GenericButton
                label={mode === 'add' ? t('appModule.save') : t('appModule.update')}
                color="primary"
                variant="contained"
                size="medium"
                icon={IconDeviceFloppy}
                type="submit"
                sx={{ textTransform: 'uppercase' }}
              />
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddEditRoleDialog;
