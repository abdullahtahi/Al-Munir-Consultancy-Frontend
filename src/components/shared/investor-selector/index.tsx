import { Autocomplete, TextField as MuiTextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import { useFormikContext } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl, get } from "src/services/default";
import { RootState } from "src/store";

interface UserOption {
  id: number;
  name: string;
}

interface Props {
  name?: string;
  isSearchFilter?: boolean;
  onChange?: (value: UserOption | null) => void;
  disabled?: boolean;
  label?: string;
}

const InvestorSelector: React.FC<Props> = ({
  name = "consultantId",
  isSearchFilter = false,
  onChange,
  disabled = false,
  label = "Investor",
}) => {
  const formik = useFormikContext<any>();
  const token = useSelector(
    (state: RootState) => state?.auth?.user?.data?.accessToken,
  );
  const [userData, setUserData] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const nameField = "userName";

  const getInvestors = useCallback(
    async (search: string) => {
      if (search.length < 3) {
        setUserData([]);
        return;
      }
      try {
        setLoading(true);
        const params: any = {
          isAll: true,
          status: "active",
          role: "Investor",
          search: search,
        };
        const queryString = new URLSearchParams(params).toString();
        const response: any = await get(
          `${baseUrl}/api/v1/users?${queryString}`,
        );

        const formatted =
          response?.data?.rows.map((row: any) => ({
            id: row.id,
            name: `${row.firstName} ${row.lastName}`,
          })) || [];

        setUserData(formatted);
      } catch (error) {
        console.error("Error fetching investors:", error);
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputValue.length >= 3) {
        getInvestors(inputValue);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, getInvestors]);

  const handleSelection = (_event: any, newValue: UserOption | null) => {
    formik.setFieldValue(name, newValue?.id || "");
    formik.setFieldValue(nameField, newValue?.name || "");
    formik.setFieldTouched(name, true);
    onChange?.(newValue);
  };

  const currentId = formik.values[name];
  const currentName = formik.values[nameField];

  const selectedValue =
    userData.find((item) => item.id === +currentId) ||
    (currentId && currentName ? { id: +currentId, name: currentName } : null);

  const fieldError =
    formik.touched?.[name] && formik.errors?.[name]
      ? String(formik.errors[name])
      : "";

  return (
    <Autocomplete
      sx={{ height: "2.7rem" }}
      options={userData}
      loading={loading}
      value={selectedValue}
      inputValue={inputValue}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={handleSelection}
      getOptionLabel={(option) => option.name || ""}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      disabled={disabled}
      onBlur={() => formik.setFieldTouched(name, true)}
      renderInput={(params) => (
        <MuiTextField
          {...(params as TextFieldProps)}
          label={`${label}${!isSearchFilter ? " *" : ""}`}
          size="small"
          variant="outlined"
          error={Boolean(fieldError)}
          helperText={fieldError}
          margin="none"
        />
      )}
    />
  );
};

export default InvestorSelector;
