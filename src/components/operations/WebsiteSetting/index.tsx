import { DialogActions, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import CustomFields from 'src/components/custom-fields/custom-fields';
import FileUploadField from 'src/components/custom-file-Upload/custom-file-upload';
import GenericButton from 'src/components/generic-button';
import { BASE_URL } from 'src/constants/AppConstants';
import { baseUrl, get, post, put } from 'src/services/default';
import * as Yup from 'yup';

export const initialValues = {
  vision: '',
  address: '',
  phone: '',
  logo: '',
  facebookLink: '',
  youtubeLink: '',
  email: '',
  sucessStories: '',
  trustedTutors: '',
  schedule: '',
  courses: '',
};

const WebisteInforamtionComponent = () => {
  const [singleUser, setSingleUser] = useState<any>({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success' | 'info' | 'warning',
  });
  const getValidationSchema = () =>
    Yup.object().shape({
      vision: Yup.string().required('vision is required'),
      address: Yup.string().required('address is required'),
      phone: Yup.string().required('phone is required'),
      logo: Yup.string().required('logo is required'),
      facebookLink: Yup.string(),
      youtubeLink: Yup.string(),
      email: Yup.string().required('email is required'),
      sucessStories: Yup.string().required('sucessStories is required'),
      trustedTutors: Yup.string().required('Trusted Tutors is required'),
      schedule: Yup.string().required('Schedule is required'),
      courses: Yup.string().required('courses is required'),
    });
  const handleSubmit = async (values: any) => {
    try {
      if (values?.id) {
        const { isActive, ...rest } = values;
        const user: any = await put(
          `${baseUrl}/api/v1/courses/${singleUser?.id}`,
          { ...rest, isActive: isActive == 'Active' ? true : false }
        );

        setSnackbar({
          open: true,
          message: user.message || 'Updated SuccessFully',
          severity: 'success',
        });
      } else {
        const websiteSetting: any = await post(
          `${baseUrl}/api/v1/website-setting`,
          values
        );
        console.log('courses', websiteSetting);
        setSnackbar({
          open: true,
          message:
            websiteSetting.message || 'Website Setting Created SuccessFully',
          severity: 'success',
        });
      }
      await getWebsiteSetting();
    } catch (error: any) {
      error.map((row: any) => {
        setSnackbar({
          open: true,
          message: row.message,
          severity: 'error',
        });
      });
    }
  };

  const getWebsiteSetting = async () => {
    try {
      const webisteData: any = await get(`${baseUrl}/api/v1/website-setting`);
      setSingleUser(webisteData.data);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || '',
        severity: 'error',
      });
    }
  };
  useEffect(() => {
    getWebsiteSetting();
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography sx={{ mb: 3 }} variant="h3">
          Website Setting
        </Typography>
      </Grid>
      <Formik
        initialValues={
          singleUser
            ? {
                id: Object.keys(singleUser).length > 0 ? singleUser.id : null,
                vision: singleUser?.vision,
                address: singleUser?.address || '',
                phone: singleUser?.phone || '',
                logo: singleUser?.logo || '',
                facebookLink: singleUser?.facebookLink || '',
                youtubeLink: singleUser?.youtubeLink || '',
                email: singleUser?.email || '',
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
              <Grid container spacing={2} sx={{}}>
                <Grid size={{ xs: 12 }}>
                  <CustomFields
                    name="vision"
                    label="Vision"
                    placeholder="Enter Vision"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }}>
                  <CustomFields
                    name="address"
                    label="Address"
                    placeholder="Enter Address"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <CustomFields
                    name="email"
                    label="Email"
                    placeholder="Enter Email"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <CustomFields
                    name="phone"
                    label="phone"
                    placeholder="Enter Phone"
                    type="number"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <CustomFields
                    name="facebookLink"
                    label="Facebook Link"
                    placeholder="Enter Facebook Link"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <CustomFields
                    name="youtubeLink"
                    label="youtube Link"
                    placeholder="Enter Youtube Link"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <CustomFields
                    name="sucessStories"
                    label="Sucess Stories"
                    placeholder="Enter Sucess Stories"
                    type="number"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <CustomFields
                    name="trustedTutors"
                    label="Trusted Tutors"
                    placeholder="Enter Trusted Tutors"
                    type="number"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <CustomFields
                    name="schedule"
                    label="Schedule"
                    placeholder="Enter Schedule"
                    type="number"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <CustomFields
                    name="courses"
                    label="Courses"
                    placeholder="Enter courses"
                    type="number"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                  <FileUploadField key={'logo'} name={'logo'} label={'Logo'} />
                </Grid>
                {singleUser && Object.keys(singleUser)?.length > 0 ? (
                  <img
                    src={`${BASE_URL + '/' + singleUser.logo}`}
                    className="admissionImgs"
                    alt="Branch Image"
                  />
                ) : (
                  ''
                )}
              </Grid>

              <DialogActions sx={{ px: 3, pb: 2 }}>
                <GenericButton
                  label={'Save'}
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
    </Grid>
  );
};

export default WebisteInforamtionComponent;
