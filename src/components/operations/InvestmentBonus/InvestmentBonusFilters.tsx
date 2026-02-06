import GenericButton from "@components/generic-button";
import ShippingLineSelector from "@components/shared/shipping-line";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { IconLetterX, IconSearch } from "@tabler/icons-react";
import CustomFields from "src/components/custom-fields/custom-fields";
import * as Yup from "yup";
import { Formik } from "formik";
import CustomSelect from "src/components/custom-select/custom-select";

interface InvestmentBonusFiltersProps {
  getBonus: (values: any) => void;
}

const InvestmentBonusFilters: React.FC<InvestmentBonusFiltersProps> = ({
  getBonus,
}) => {
  const handleCancel = (resetForm: any) => {
    resetForm();
    getBonus({});
  };

  const handleSubmit = (values: any) => {
    getBonus(values);
  };

  const getValidationSchema = () =>
    Yup.object().shape({
      sponsorName: Yup.string(),
      consultantId: Yup.string(),
      bonusType: Yup.string(),
    });

  const initialValues = {
    sponsorName: "",
    consultantId: "",
    bonusType: "",
  };

  const bonusTypes = [
    { key: "Direct Bonus", value: "direct_bonus" },
    { key: "Indirect Bonus", value: "indirect_bonus" },
    { key: "Level Bonus", value: "level_bonus" },
  ];

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
              name="sponsorName"
              label="Sponsor Name"
              placeholder="Enter Sponsor Name"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
            <CustomSelect
              name="bonusType"
              label="Bonus Type"
              placeholder="Select Bonus Type"
              options={bonusTypes}
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
                label={"Clear"}
                icon={IconLetterX}
                onClick={() => handleCancel(resetForm)}
                color="error"
                variant="outlined"
                sx={{
                  textTransform: "uppercase",
                  "&:hover": {
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    backgroundColor: "#ff9800",
                  },
                }}
              />
              <GenericButton
                label={"Search"}
                icon={IconSearch}
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "uppercase",
                  "&:hover": (theme) => ({
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

export default InvestmentBonusFilters;
