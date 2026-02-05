import GenericButton from "@components/generic-button";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { IconLetterX, IconSearch } from "@tabler/icons-react";
import * as Yup from "yup";
import { Formik } from "formik";
import CustomDatePicker from "src/components/custom-date-picker";
import CustomSelect from "src/components/custom-select/custom-select";
import InvestorSelector from "src/components/shared/investor-selector";
import { investmentTypes } from "./Constants";
import dayjs from "dayjs";

interface InvestmentFiltersProps {
  getInvestments: (values: any) => void;
}

const InvestmentFilters: React.FC<InvestmentFiltersProps> = ({
  getInvestments,
}) => {
  const handleCancel = (resetForm: any) => {
    resetForm();
    getInvestments({});
  };

  const handleSubmit = (values: any) => {
    getInvestments(values);
  };

  const getValidationSchema = () =>
    Yup.object().shape({
      employeeId: Yup.string(),
      durationFrom: Yup.string(),
      durationTo: Yup.string(),
      typeOfInvestment: Yup.string(),
    });

  const initialValues = {
    employeeId: "",
    durationFrom: "",
    durationTo: "",
    typeOfInvestment: "",
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
            <InvestorSelector
              name="employeeId"
              label="Investor Name"
              isSearchFilter={true}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
            <CustomDatePicker
              name="durationFrom"
              label="Duration From"
              defaultValue={dayjs()}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
            <CustomDatePicker
              name="durationTo"
              label="Duration To"
              defaultValue={dayjs()}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
            <CustomSelect
              name="typeOfInvestment"
              label="Type of Investment"
              placeholder="Select Investment Type"
              options={investmentTypes}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Stack direction="row" spacing={2} sx={{ mt: 3.5 }}>
              <GenericButton
                label={"Clear"}
                icon={IconLetterX}
                onClick={() => handleCancel(resetForm)}
                color="error"
                variant="outlined"
              />
              <GenericButton
                label={"Search"}
                icon={IconSearch}
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              />
            </Stack>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default InvestmentFilters;
