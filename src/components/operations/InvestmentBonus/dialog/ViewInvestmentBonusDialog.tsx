import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IconX } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import React from "react";
import CustomFields from "src/components/custom-fields/custom-fields";
import FileUploadField from "src/components/custom-file-Upload/custom-file-upload";
import { baseUrl, put } from "src/services/default";
import * as Yup from "yup";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

interface ViewInvestmentBonusDialogProps {
  open: boolean;
  onClose: () => void;
  singleUser: any;
  onSuccess?: () => void;
}

const ViewInvestmentBonusDialog: React.FC<ViewInvestmentBonusDialogProps> = ({
  open,
  onClose,
  singleUser,
  onSuccess,
}) => {
  const title: any = "View Investment Bonus Detail";
  const onSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await put(
        `${baseUrl}/api/v1/bonuses/${singleUser.id}/process`,
        {
          paymentProof: values.paymentProof,
          status: "processed",
        },
      );

      if (response?.data) {
        if (onSuccess) onSuccess();
        onClose();
      } else {
        console.error("Failed to process bonus", response?.message);
      }
    } catch (error) {
      console.error("Error processing bonus:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    paymentProof: Yup.string().required("Payment proof is required"),
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          width: { xs: "calc(100% - 20px)", md: 1200 },
          mx: "auto",
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
                sponsorName:
                  singleUser.fkFromConsultant?.firstName +
                    " " +
                    singleUser.fkFromConsultant?.lastName || "",
                consultantId:
                  singleUser.fkConsultant?.firstName +
                    " " +
                    singleUser.fkConsultant?.lastName || "",
                bonusType: singleUser?.bonusType || "",
                amount: singleUser.amount,
                percentage: singleUser?.percentage || "",
                baseAmount: singleUser.baseAmount || "",
                levelDepth: singleUser.levelDepth || "",
                description: singleUser.description || "",
                paymentProof: "",
                bankName: singleUser.fkConsultant?.Bank?.name || "",
                bankAccount: singleUser.fkConsultant?.Bank?.accountNumber || "",
              }
            : {
                sponsorName: "",
                consultantId: "",
                bonusType: "",
                amount: "",
                percentage: "",
                baseAmount: "",
                levelDepth: "",
                description: "",
                paymentProof: "",
                bankName: "",
                bankAccount: "",
              }
        }
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, isSubmitting }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="sponsorName"
                      label="Sponsor Name"
                      placeholder="Enter Sponsor Name"
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

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="joiningDate"
                      label="Joining Date"
                      placeholder=""
                      value={dayjs(singleUser?.createdAt).format("DD-MM-YYYY")}
                      disabled={true}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="processDate"
                      label="Process Date"
                      placeholder=""
                      value={
                        singleUser?.processedAt
                          ? dayjs(singleUser?.processedAt).format("DD-MM-YYYY")
                          : "-"
                      }
                      disabled={true}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="bankName"
                      label="Bank Name"
                      placeholder=""
                      disabled={true}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <CustomFields
                      name="bankAccount"
                      label="Bank Account"
                      placeholder=""
                      disabled={true}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <FileUploadField
                      name="paymentProof"
                      label="Payment Proof"
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <CustomFields
                      name="description"
                      label="Description"
                      placeholder=""
                      disabled={true}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!values.paymentProof || isSubmitting}
                  type="submit"
                  variant="contained"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default ViewInvestmentBonusDialog;
