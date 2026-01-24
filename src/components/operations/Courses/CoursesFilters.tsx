import GenericButton from '@components/generic-button';
import ShippingLineSelector from '@components/shared/shipping-line';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { IconLetterX, IconSearch } from '@tabler/icons-react';
import CustomFields from 'src/components/custom-fields/custom-fields';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CustomSelect from 'src/components/custom-select/custom-select';

interface CoursesFiltersDialogProps {
  getCourses: (values: any) => void;
}

const CoursesFilters: React.FC<CoursesFiltersDialogProps> = ({
  getCourses,
}) => {
  const handleCancel = (resetForm: any) => {
    resetForm();
    getCourses({});
  };

  const handleSubmit = (values: any) => {
    getCourses(values);
  };

  const getValidationSchema = () =>
    Yup.object().shape({
      name: Yup.string(),
      isActive: Yup.string(),
    });
  const initialValues = {
    name: '',
    isActive: '',
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
            <CustomFields name="name" label="name" placeholder="Branch Name" />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
            <CustomSelect
              name="isActive"
              label="status"
              placeholder="Enter status"
              options={[
                {
                  key: 'Active',
                  value: 'Active',
                },
                {
                  key: 'In Active',
                  value: 'In Active',
                },
              ]}
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

export default CoursesFilters;
