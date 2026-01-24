import GenericButton from '@components/generic-button';
import ShippingLineSelector from '@components/shared/shipping-line';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { IconLetterX, IconSearch } from '@tabler/icons-react';
import CustomFields from 'src/components/custom-fields/custom-fields';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CustomSelect from 'src/components/custom-select/custom-select';
import CustomDatePicker from 'src/components/custom-date-picker';
import dayjs from 'dayjs';

interface AdmissionFiltersDialogProps {
  getAdmissions: (values: any) => void;
}

const AdmissionsFilter: React.FC<AdmissionFiltersDialogProps> = ({
  getAdmissions,
}) => {
  const handleCancel = (resetForm: any) => {
    resetForm();
    getAdmissions({});
  };

  const handleSubmit = (values: any) => {
    getAdmissions(values);
  };

  const getValidationSchema = () =>
    Yup.object().shape({
      studentName: Yup.string(),
      admissionType: Yup.string(),
      admissionNumber: Yup.string(),
      admissionDateFrom: Yup.string(),
      admissionDateTo: Yup.string(),
      status: Yup.string(),
      consultantId: Yup.string(),
    });
  const initialValues = {
    studentName: '',
    admissionType: '',
    admissionNumber: '',
    admissionDateFrom: '',
    admissionDateTo: '',
    status: '',
    consultantId: '',
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
              name="studentName"
              label="Student Name"
              placeholder="Student Name"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
            <CustomFields
              name="admissionNumber"
              label="Admission Number"
              placeholder="Enter Admission Number"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
            <CustomSelect
              name="admissionType"
              label="Admission Type"
              placeholder="Enter Admission Type"
              options={[
                {
                  key: 'school',
                  value: 'school',
                },
                {
                  key: 'academy',
                  value: 'academy',
                },
                {
                  key: 'technical',
                  value: 'technical',
                },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
            <CustomDatePicker
              name="admissionDateFrom"
              label="Date From"
              defaultValue={dayjs()}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
            <CustomDatePicker
              name="admissionDateTo"
              label="Date To"
              defaultValue={dayjs()}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
            <CustomSelect
              name="status"
              label="status"
              placeholder="Status"
              options={[
                {
                  key: 'Pending',
                  value: 'Pending',
                },
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
          <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}>
            <ShippingLineSelector
              name="consultantId"
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

export default AdmissionsFilter;
