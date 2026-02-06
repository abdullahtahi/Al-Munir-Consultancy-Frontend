import * as Yup from "yup";

export const initialValues = {
  consultantId: "",
  userName: "",
  typeOfInvestment: "",
  durationFrom: "",
  durationTo: "",
  amount: "",
  branchId: "",
};

export const validationSchema = Yup.object().shape({
  consultantId: Yup.string().required("Employee selection is required"),
  userName: Yup.string(),
  typeOfInvestment: Yup.string().required("Type of investment is required"),
  durationFrom: Yup.date().required("Duration from is required"),
  durationTo: Yup.date().required("Duration to is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  branchId: Yup.string(),
});

export const investmentTypes = [
  { key: "Active Investor", value: "Active Investor" },
  { key: "Spot Investor", value: "Spot Investor" },
  { key: "Slient Investor", value: "Slient Investor" },
];
