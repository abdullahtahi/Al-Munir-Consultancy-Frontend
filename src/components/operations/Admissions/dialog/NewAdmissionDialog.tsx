import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IconDeviceFloppy, IconLetterX, IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import React from 'react';
import CustomDatePicker from 'src/components/custom-date-picker';
import CustomFields from 'src/components/custom-fields/custom-fields';
import FileUploadField from 'src/components/custom-file-Upload/custom-file-upload';
import CustomSelect from 'src/components/custom-select/custom-select';
import GenericButton from 'src/components/generic-button';
import ShippingLineSelector from 'src/components/shared/shipping-line';
import { BASE_URL } from 'src/constants/AppConstants';
import * as Yup from 'yup';

interface NewAdmissionsDialogProps {
  open: boolean;
  onClose: () => void;
  handleSubmit: (values: any) => void;
  mode: 'Add' | 'Edit';
  singleUser: any;
}

export const initialValues = {
  consultantId: '',
  admissionInClass: '',
  feeAmount: '',
  studentName: '',
  gender: '',
  phone: '',
  residentNumber: '',
  profileImg: '',
  birthCertificate: '',
  schoolLeavingCertificate: '',
  fatherCnicImgFront: '',
  fatherCnicImgBack: '',
  dateOfBirth: '',
  fatherName: '',
  fatherEducation: '',
  fatherOccupation: '',
  fatherCnic: '',
  motherName: '',
  motherEducation: '',
  motherOccupation: '',
  motherCnic: '',
  permanentAddress: '',
  secondaryAddress: '',
  admissionType: '',
  commissionAmount: '',
  admissionDate: '',
  admissionNumber: '',
  name: '',
  relation: '',
  address: '',
  sponsorId: '',
};

const NewAdmissionsDialog: React.FC<NewAdmissionsDialogProps> = ({
  open,
  onClose,
  handleSubmit,
  mode,
  singleUser,
}) => {
  const getValidationSchema = () =>
    Yup.object().shape({
      consultantId: Yup.string(),
      admissionInClass: Yup.string().required('Admission in class is required'),
      feeAmount: Yup.string().required('Fee amount is required'),
      studentName: Yup.string().required('Student name is required'),
      gender: Yup.string().required('Gender is required'),
      phone: Yup.string().required('Phone number is required'),
      residentNumber: Yup.string(),
      // profileImg: Yup.string().required('Profile image is required'),
      // birthCertificate: Yup.string().required('Birth certificate is required'),
      schoolLeavingCertificate: Yup.string(),
      // fatherCnicImgFront: Yup.string().required(
      //   'Father CNIC front image is required'
      // ),
      // fatherCnicImgBack: Yup.string().required(
      //   'Father CNIC back image is required'
      // ),
      dateOfBirth: Yup.string().required('Date of birth is required'),
      fatherName: Yup.string().required('Father name is required'),
      fatherEducation: Yup.string().required('Father education is required'),
      fatherOccupation: Yup.string().required('Father occupation is required'),
      fatherCnic: Yup.string().required('Father CNIC is required'),
      motherName: Yup.string().required('Mother name is required'),
      motherEducation: Yup.string().required('Mother education is required'),
      motherOccupation: Yup.string().required('Mother occupation is required'),
      motherCnic: Yup.string().required('Mother CNIC is required'),
      permanentAddress: Yup.string().required('Permanent address is required'),
      secondaryAddress: Yup.string(),
      admissionType: Yup.string().required('Admission type is required'),
      commissionAmount: Yup.string(),
      admissionDate: Yup.string().required('Admission Date is required'),
      admissionNumber: Yup.string().required('Admission Number is required'),
      name: Yup.string().required('Name is required'),
      relation: Yup.string().required('Relation is required'),
      address: Yup.string().required('Address is required'),
      sponsorId: Yup.string()
    });
  const title: any = mode === 'Add' ? 'Add Admission' : 'Edit Admission';
  const actionLabel = mode === 'Add' ? 'Add' : 'Edit';
  const gender = [
    {
      key: 'Male',
      value: 'Male',
    },
    {
      key: 'Female',
      value: 'Female',
    },
  ];

  const admissionType = [
    {
      key: 'School',
      value: 'school',
    },
    {
      key: 'Academy',
      value: 'academy',
    },
    {
      key: 'Technical',
      value: 'technical',
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
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
                studentName: singleUser?.Student?.studentName || '',
                gender: singleUser.Student?.gender || '',
                admissionDate: singleUser?.admissionDate || '',
                sponsorId: singleUser?.consultantId || '',
                admissionType: singleUser.admissionType,
                dateOfBirth: singleUser.Student?.dateOfBirth || '',
                admissionInClass: singleUser.admissionInClass || '',
                feeAmount: singleUser.feeAmount || '',
                fatherName: singleUser.Student?.fatherName || '',
                fatherEducation: singleUser.Student?.fatherEducation || '',
                fatherOccupation: singleUser.Student?.fatherOccupation || '',
                fatherCnic: singleUser.Student?.fatherCnic || '',
                motherCnic: singleUser.Student?.motherCnic || '',
                motherEducation: singleUser.Student?.motherEducation || '',
                motherOccupation: singleUser.Student?.motherOccupation || '',
                motherName: singleUser.Student?.motherName || '',
                permanentAddress: singleUser.Student?.permanentAddress || '',
                secondaryAddress: singleUser.Student?.secondaryAddress || '',
                phone: singleUser.Student?.phone || '',
                residentNumber: singleUser.Student?.residentNumber || '',
                admissionNumber: singleUser.admissionNumber || '',
                name: singleUser?.DependOn?.name,
                relation: singleUser?.DependOn?.relation,
                address: singleUser?.DependOn?.address,
                profileImg: singleUser.Student?.profileImg || '',
                birthCertificate: singleUser.Student?.birthCertificate || '',
                schoolLeavingCertificate:
                  singleUser.Student?.schoolLeavingCertificate || '',
                fatherCnicImgFront:
                  singleUser.Student?.fatherCnicImgFront || '',
                fatherCnicImgBack: singleUser?.Student?.fatherCnicImgBack || '',
                dependOnId: singleUser?.DependOn?.id,
                studentId: singleUser?.Student?.id,
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
                <Grid size={{ xs: 12 }}>
                  <Typography sx={{ mb: 3 }} variant="h3">
                    Student Personal Information
                  </Typography>
                </Grid>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="studentName"
                      label="Student Name"
                      placeholder="Enter Student Name"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomSelect
                      name="gender"
                      label="Gender"
                      placeholder="Enter Gender"
                      options={gender}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomDatePicker
                      name="admissionDate"
                      label="Admission Date"
                      defaultValue={dayjs()}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <ShippingLineSelector
                      name="sponsorId"
                      disabled={false}
                      isSearchFilter={true}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomSelect
                      name="admissionType"
                      label="Admission Type"
                      placeholder="Enter Admission Type"
                      options={admissionType}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomDatePicker
                      name="dateOfBirth"
                      label=" Date Of birth"
                      defaultValue={dayjs()}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="admissionInClass"
                      label=" Admission in Class"
                      placeholder="Enter admission in Class"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="feeAmount"
                      label="Monthly Fee"
                      placeholder="Enter Monthly Fee"
                      type="number"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="fatherName"
                      label="Father Name"
                      placeholder="Enter Father Name"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="fatherOccupation"
                      label="Father Occupation"
                      placeholder="Enter Father Occupation"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="fatherCnic"
                      label="Father CNIC"
                      placeholder="Enter Father CNIC"
                      type="number"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="fatherEducation"
                      label="Father Education"
                      placeholder="Enter Father Education"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="motherName"
                      label="Mother Name"
                      placeholder="Enter Mother Name"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="motherEducation"
                      label="Mother Education"
                      placeholder="Enter Mother Education"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="motherOccupation"
                      label="Mother Occupation"
                      placeholder="Enter Mother Occupation"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="motherCnic"
                      label="Mother CNIC"
                      placeholder="Enter Mother CNIC"
                      type="number"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="permanentAddress"
                      label="Permanent Address"
                      placeholder="Enter Permanent Address"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="secondaryAddress"
                      label="Secondary Address"
                      placeholder="Enter secondaryAddress"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="phone"
                      label="Phone"
                      placeholder="Enter Phone"
                      type="number"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="residentNumber"
                      label="Resident Number"
                      placeholder="Enter Resident Number"
                      type="number"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="admissionNumber"
                      label="Admission Number"
                      placeholder="Enter Admission Number"
                      type="number"
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Typography variant="h3">Depend On </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="name"
                      label="Name"
                      placeholder="Enter Name"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="relation"
                      label="Relationship with Student"
                      placeholder="Enter relation"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="address"
                      label="Address"
                      placeholder="Enter address"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="h3">Important Documents </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <FileUploadField
                      key={'profileImg'}
                      name={'profileImg'}
                      label={'Student Image'}
                    />
                    {mode === 'Edit' && (
                      <img
                        src={`${
                          BASE_URL + '/' + singleUser.Student.profileImg
                        }`}
                        className="admissionImgs"
                        alt="profile Image"
                      />
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <FileUploadField
                      key={'birthCertificate'}
                      name={'birthCertificate'}
                      label={'Birth Certificate'}
                    />
                    {mode === 'Edit' && (
                      <img
                        src={`${
                          BASE_URL + '/' + singleUser.Student.birthCertificate
                        }`}
                        className="admissionImgs"
                        alt="birthCertificate"
                      />
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <FileUploadField
                      key={'schoolLeavingCertificate'}
                      name={'schoolLeavingCertificate'}
                      label={'School Leaving Certificate'}
                    />
                    {mode === 'Edit' && (
                      <img
                        src={`${
                          BASE_URL +
                          '/' +
                          singleUser.Student.schoolLeavingCertificate
                        }`}
                        className="admissionImgs"
                        alt="schoolLeavingCertificate"
                      />
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <FileUploadField
                      key={'fatherCnicImgFront'}
                      name={'fatherCnicImgFront'}
                      label={'Father Cnic Image Front'}
                    />
                    {mode === 'Edit' && (
                      <img
                        src={`${
                          BASE_URL + '/' + singleUser.Student.fatherCnicImgFront
                        }`}
                        alt="fatherCnicImgFront"
                        className="admissionImgs"
                      />
                    )}
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <FileUploadField
                      key={'fatherCnicImgBack'}
                      name={'fatherCnicImgBack'}
                      label={'Father Cnic Image Back'}
                    />
                    {mode === 'Edit' && (
                      <img
                        src={`${
                          BASE_URL + '/' + singleUser.Student.fatherCnicImgBack
                        }`}
                        className="admissionImgs"
                        alt="Father Cnic Image Back"
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

export default NewAdmissionsDialog;
