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
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { getAllRoles } from 'src/api/role';
import CustomDatePicker from 'src/components/custom-date-picker';
import CustomFields from 'src/components/custom-fields/custom-fields';
import FileUploadField from 'src/components/custom-file-Upload/custom-file-upload';
import CustomSelect from 'src/components/custom-select/custom-select';
import ShippingLineSelector from 'src/components/shared/shipping-line';
import { BASE_URL } from 'src/constants/AppConstants';
import * as Yup from 'yup';

interface ConsultantDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'Add' | 'Edit';
  handleSubmit: (values: any) => void;
  singleUser: any;
}

export const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role:'',
  phone: '',
  cnic: '',
  address: '',
  city: '',
  sponsorId: '',
  paymentReceipt: '',
  profile: '',
  bankName: '',
  accountNumber: '',
  accountAddress: '',
  dateOfBirth: '',
  status: '',
};

const ConsultantDialog: React.FC<ConsultantDialogProps> = ({
  open,
  onClose,
  mode,
  handleSubmit,
  singleUser,
}) => {
  const [rolesData, setRolesData] = useState<any>();

  const getValidationSchema = () =>
    Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().required('Email is required'),
      role: Yup.string().required('User Type is required'),
      password:
        mode == 'Add'
          ? Yup.string().required('Password is required').min(8)
          : Yup.string(),
      phone: Yup.string().required('Phone Number is required').max(11),
      cnic: Yup.string().required('CNIC is required').max(13),
      address: Yup.string(),
      city: Yup.string().required('city is required'),
      sponsorId: Yup.string(),
      paymentReceipt: Yup.string(),
      profile: Yup.string().required('profile Image is required'),
      bankName: Yup.string().required('Bank Name is required'),
      accountNumber: Yup.string().required('Account Number is required'),
      accountAddress: Yup.string().required('Account Address is required'),
      dateOfBirth: Yup.string().required('Date of Birth is required'),
      status: Yup.string(),
    });
  const title: any =
    mode === 'Add' ? 'Add User / Member' : 'Edit User / Member';
  const actionLabel = mode === 'Add' ? 'Add' : 'Edit';
  const userStaus = [
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
  ];

  const roles=rolesData?.rows?.map((row:any)=>({
    key:row?.name,
    value:row?.name
  }))
  const fetchRolesData = async () => {
    try {
      const response = await getAllRoles({});
      console.log("response",response)
      if (response && response.data) {
        setRolesData(response.data || []);
        
      }

    } catch (error: any) {
    } 
  };
  useEffect(()=>{
    fetchRolesData()
  },[])
  console.log("rolesData",rolesData)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth={false}
      PaperProps={{
        sx: {
          width: { xs: '80%' },
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
                firstName: singleUser.firstName || '',
                lastName: singleUser.lastName || '',
                email: singleUser.email || '',
                password: singleUser.password,
                phone: singleUser.phone || '',
                cnic: singleUser.cnic || '',
                role:singleUser.role || '',
                address: singleUser.address || '',
                city: singleUser.city || '',
                sponsorId: singleUser.sponsorId || '',
                profile: singleUser.profile || '',
                paymentReceipt: singleUser.paymentReceipt || '',
                bankName: singleUser.Bank?.name,
                accountNumber: singleUser.Bank?.accountNumber,
                accountAddress: singleUser.Bank?.accountAddress,
                bankId: singleUser.Bank?.id,
                dateOfBirth: singleUser?.dateOfBirth,
                consultantId: singleUser.id,
                status: singleUser.status,
              }
            : initialValues
        }
        validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleSubmit, errors }) => {
          console.log('error', errors);
          return (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="h3">Personal Information</Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="firstName"
                      label="First Name"
                      placeholder="Enter First Name"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter Last Name"
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
                    <CustomFields
                      name="email"
                      label="Email"
                      placeholder="Enter Email"
                    />
                  </Grid>

                  {mode == 'Add' ? (
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                      <CustomFields
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                      />
                    </Grid>
                  ) : (
                    ''
                  )}

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomSelect
                      name="role"
                      label="User Type"
                      placeholder="Enter User Type"
                      options={roles}
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
                      name="cnic"
                      label="CNIC"
                      placeholder="Enter CNIC"
                      type="number"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="city"
                      label="City"
                      placeholder="Enter City"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <CustomFields
                      name="address"
                      label="Address"
                      placeholder="Enter Address"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <FileUploadField
                      key={'profile'}
                      name={'profile'}
                      label={'Consultant Profile Image'}
                    />
                    {mode === 'Edit' && (
                      <img
                        src={`${BASE_URL + '/' + singleUser.profile}`}
                        className="admissionImgs"
                        alt="Profile Image"
                      />
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <FileUploadField
                      key={'paymentReceipt'}
                      name={'paymentReceipt'}
                      label={'Payment Reciept'}
                    />
                    {mode === 'Edit' && (
                      <img
                        src={`${BASE_URL + '/' + singleUser.paymentReceipt}`}
                        className="admissionImgs"
                        alt="payment image"
                      />
                    )}
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomDatePicker
                      name="dateOfBirth"
                      label=" Date Of birth"
                      defaultValue={dayjs()}
                    />
                  </Grid>
                  {mode == 'Edit' ? (
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                      <CustomSelect
                        name="status"
                        label="Status"
                        placeholder="Enter Status"
                        options={userStaus}
                      />
                    </Grid>
                  ) : (
                    ''
                  )}
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="h3">Bank Information</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="bankName"
                      label="Bank Name"
                      placeholder="Enter Bank Name"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="accountNumber"
                      label="Account Number"
                      placeholder="Enter Bank Number"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="accountAddress"
                      label="Account Address"
                      placeholder="Enter Account Address"
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

export default ConsultantDialog;
