import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import React from 'react';
import CustomDatePicker from 'src/components/custom-date-picker';
import CustomFields from 'src/components/custom-fields/custom-fields';

interface ViewBonusDialogProps {
  open: boolean;
  onClose: () => void;
  singleUser: any;
}

const ViewBonusDialog: React.FC<ViewBonusDialogProps> = ({
  open,
  onClose,
  singleUser,
}) => {
  const title: any = 'View Bonus Detail';
  const onSubmit = () => {};

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
          singleUser
            ? {
                studentName:
                  singleUser?.admission?.Student?.studentName || '',
                consultantId:
                  singleUser.fkConsultant?.firstName +" "+
                    singleUser.fkConsultant?.lastName || '',
                fromConsultant:
                  singleUser.fkFromConsultant?.firstName +" "+
                    singleUser.fkFromConsultant?.lastName || '',
                bonusType: singleUser?.bonusType || '',
                amount: singleUser.amount,
                percentage: singleUser?.percentage || '',
                baseAmount: singleUser.baseAmount || '',
                levelDepth: singleUser.levelDepth || '',
                description: singleUser.description || '',
              }
            : {
                studentName: '',
                consultantId: '',
                fromConsultant: '',
                bonusType: '',
                amount: '',
                percentage: '',
                baseAmount: '',
                levelDepth: '',
                description: '',
              }
        }
        onSubmit={onSubmit}
      >
        {({ handleSubmit, errors }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="studentName"
                      label="Student Name"
                      placeholder="Enter Student Name"
                      disabled={true}
                    />
                  </Grid>
 <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="consultantId"
                      label="Consultant"
                      placeholder=""
                      disabled={true}

                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="fromConsultant"
                      label="Consultant From"
                      placeholder=""
                      disabled={true}


                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="bonusType"
                      label="Bonus Type"
                      placeholder=""
                      disabled={true}

                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="amount"
                      label="Amount"
                      placeholder=""
                      disabled={true}

                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="percentage"
                      label="Percentage"
                      disabled={true}

                      placeholder=""
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="baseAmount"
                      label="Base Amount"
                      placeholder=""
                      disabled={true}

                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="levelDepth"
                      label="Level Depth"
                      placeholder=""
                      disabled={true}

                    />
                  </Grid>

                  <Grid size={{ xs: 12}}>
                    <CustomFields
                      name="description"
                      label="Description"
                      placeholder=""
                      disabled={true}

                    />
                  </Grid>
                </Grid>
              </DialogContent>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default ViewBonusDialog;
