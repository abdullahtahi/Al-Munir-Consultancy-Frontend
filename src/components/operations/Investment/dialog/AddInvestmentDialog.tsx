import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IconDeviceFloppy, IconLetterX, IconX } from "@tabler/icons-react";
import { Form, Formik, useFormikContext } from "formik";
import React from "react";
import CustomDatePicker from "src/components/custom-date-picker";
import CustomFields from "src/components/custom-fields/custom-fields";
import CustomSelect from "src/components/custom-select/custom-select";
import InvestorSelector from "src/components/shared/investor-selector";
import GenericButton from "src/components/generic-button";
import { initialValues, validationSchema, investmentTypes } from "../Constants";
import dayjs from "dayjs";
import { baseUrl, get } from "src/services/default";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface AddInvestmentDialogProps {
  open: boolean;
  onClose: () => void;
  handleSubmit: (values: any) => void;
  mode: "Add" | "Edit";
  singleUser: any;
}

const InvestmentFormLogic: React.FC<{ mode: "Add" | "Edit" }> = ({ mode }) => {
  const { values, setFieldValue } = useFormikContext<any>();
  const prevType = React.useRef(values.typeOfInvestment);
  const prevAmount = React.useRef(values.amount);

  React.useEffect(() => {
    if (values.typeOfInvestment !== prevType.current) {
      if (values.typeOfInvestment === "Spot Investor") {
        setFieldValue("durationFrom", dayjs());
        setFieldValue("durationTo", dayjs().add(3, "month"));
      } else if (
        values.typeOfInvestment === "Active Investor" ||
        values.typeOfInvestment === "Slient Investor"
      ) {
        setFieldValue("durationFrom", dayjs());
        setFieldValue("durationTo", dayjs().add(1, "month"));
      }
      prevType.current = values.typeOfInvestment;
    }
  }, [values.typeOfInvestment, setFieldValue]);

  React.useEffect(() => {
    if (
      mode === "Edit" &&
      values.amount !== prevAmount.current &&
      prevAmount.current !== undefined &&
      prevAmount.current !== ""
    ) {
      if (values.typeOfInvestment === "Spot Investor") {
        setFieldValue("durationFrom", dayjs());
        setFieldValue("durationTo", dayjs().add(3, "month"));
      }
    }
    prevAmount.current = values.amount;
  }, [values.amount, values.typeOfInvestment, setFieldValue, mode]);

  return (
    <>
      {values.typeOfInvestment === "Spot Investor" && (
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: "primary.light",
              color: "primary.main",
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Note: The minimum profit ratio is 8% to 12% and it is every 3
              months.
            </Typography>
          </Box>
        </Grid>
      )}
      {(values.typeOfInvestment === "Active Investor" ||
        values.typeOfInvestment === "Slient Investor") && (
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: "primary.light",
              color: "primary.main",
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Note: The profit share is 70-30 and it is Monthly.
            </Typography>
          </Box>
        </Grid>
      )}
    </>
  );
};

const AddInvestmentDialog: React.FC<AddInvestmentDialogProps> = ({
  open,
  onClose,
  handleSubmit,
  mode,
  singleUser,
}) => {
  const [fetchedInvestments, setFetchedInvestments] = React.useState<any[]>([]);
  const [loadingInvestments, setLoadingInvestments] = React.useState(false);

  const fetchPreviousInvestments = async (consultantId: number) => {
    try {
      setLoadingInvestments(true);
      const response: any = await get(
        `${baseUrl}/api/v1/investment/amounts/consultant/${consultantId}`,
      );
      if (response && response.data) {
        setFetchedInvestments(response.data);
      } else {
        setFetchedInvestments([]);
      }
    } catch (error) {
      console.error("Error fetching previous investments:", error);
      setFetchedInvestments([]);
    } finally {
      setLoadingInvestments(false);
    }
  };

  const title = mode === "Add" ? "Add Investment" : "Edit Investment";
  const actionLabel = mode === "Add" ? "Add" : "Edit";

  React.useEffect(() => {
    if (!open) {
      setFetchedInvestments([]);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
          mode === "Edit" && singleUser
            ? {
                consultantId: singleUser?.consultant?.id || "",
                userName:
                  singleUser?.consultant?.firstName +
                    " " +
                    singleUser?.consultant?.lastName || "",
                typeOfInvestment: singleUser?.typeOfInvestor || "",
                durationFrom: dayjs(singleUser.durationFrom),
                durationTo: dayjs(singleUser.durationTo),
                amount: singleUser.amount || "",
              }
            : initialValues
        }
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleSubmit, errors, values }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12 }}>
                  <InvestorSelector
                    name="consultantId"
                    label="Investor Name*"
                    disabled={mode === "Edit"}
                    onChange={(val) => {
                      if (val) fetchPreviousInvestments(val.id);
                      else setFetchedInvestments([]);
                    }}
                  />
                </Grid>

                {fetchedInvestments.length > 0 && (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                      Previous Investments
                    </Typography>
                    <TableContainer component={Paper} variant="outlined">
                      <Table size="small">
                        <TableHead sx={{ bgcolor: "grey.100" }}>
                          <TableRow>
                            <TableCell>Amount</TableCell>
                            <TableCell>Duration From</TableCell>
                            <TableCell>Duration To</TableCell>
                            <TableCell>Investment Type</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {fetchedInvestments.map((inv, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{inv.amount}</TableCell>
                              <TableCell>
                                {dayjs(inv.durationFrom).format("DD-MM-YYYY")}
                              </TableCell>
                              <TableCell>
                                {dayjs(inv.durationTo).format("DD-MM-YYYY")}
                              </TableCell>
                              <TableCell>{inv.typeOfInvestor}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                )}

                <Grid size={{ xs: 12 }}>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    New Entry
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomSelect
                    name="typeOfInvestment"
                    label="Type of Investment*"
                    placeholder="Enter Type of Investment"
                    options={investmentTypes}
                    disabled={mode === "Edit"}
                  />
                </Grid>

                <InvestmentFormLogic mode={mode} />

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomDatePicker
                    name="durationFrom"
                    label="Duration From*"
                    disabled={
                      mode === "Edit" ||
                      (!!values.typeOfInvestment &&
                        values.typeOfInvestment !== "")
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomDatePicker
                    name="durationTo"
                    label="Duration To*"
                    disabled={
                      mode === "Edit" ||
                      (!!values.typeOfInvestment &&
                        values.typeOfInvestment !== "")
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomFields
                    name="amount"
                    label="Amount*"
                    placeholder="Enter Amount"
                    type="number"
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <GenericButton
                label={"Cancel"}
                onClick={onClose}
                color="error"
                icon={IconLetterX}
                variant="outlined"
              />
              <GenericButton
                label={actionLabel}
                type="submit"
                disabled={Object.keys(errors).length > 0}
                color="primary"
                icon={IconDeviceFloppy}
                variant="contained"
              />
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddInvestmentDialog;
