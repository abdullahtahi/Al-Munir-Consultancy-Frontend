import GenericButton from '@components/generic-button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { IconLetterX, IconSearch } from '@tabler/icons-react';
import CustomFields from 'src/components/custom-fields/custom-fields';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { baseUrl } from 'src/services/default';
import { get } from 'http';
import React from 'react';
import ShippingLineSelector from 'src/components/shared/shipping-line';
import CustomSelect from 'src/components/custom-select/custom-select';

interface UsersFiltersDialogProps {
  getUsers: (values: any) => void;
}

const UsersFilters: React.FC<UsersFiltersDialogProps> = ({ getUsers }) => {
  const handleCancel = (resetForm: any) => {
    getUsers({});
    resetForm();
  };

  const handleSubmit = (values: any) => {
    getUsers(values);
  };
  const getValidationSchema = () =>
    Yup.object().shape({
      userName: Yup.string(),
      cnic: Yup.string(),
      city: Yup.string(),
      status: Yup.string(),
      sponsorId: Yup.string(),
    });
  const initialValues = {
    userName: '',
    cnic: '',
    sponsorId: '',
    city: '',
    status: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema()}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ handleSubmit, resetForm }) => (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
            <CustomFields
              name="userName"
              label="User Name"
              placeholder="User Name"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
            <CustomFields name="cnic" label="CNIC" placeholder="CNIC" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
            <CustomFields name="city" label="City" placeholder="City" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
            <CustomSelect
              name="status"
              label="status"
              placeholder="Status"
              options={[
                {
                  key: 'pending',
                  value: 'pending',
                },
                {
                  key: 'active',
                  value: 'active',
                },
                {
                  key: 'inactive',
                  value: 'inactive',
                },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <ShippingLineSelector
              name="sponsorId"
              disabled={false}
              isSearchFilter={true}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Stack direction="row" spacing={2}>
              <GenericButton
                label={'Clear'}
                icon={IconLetterX}
                onClick={() => handleCancel(resetForm)}
                color="error"
                variant="outlined"
                sx={{
                  textTransform: 'uppercase',
                  '&:hover': {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    backgroundColor: '#ff9800',
                  },
                }}
              />
              <GenericButton
                label={'Search'}
                icon={IconSearch}
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                sx={{
                  textTransform: 'uppercase',
                  '&:hover': (theme) => ({
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: `0 4px 10px ${theme.palette.primary.dark}66`,
                  }),
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default UsersFilters;
