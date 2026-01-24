import { Autocomplete, TextField as MuiTextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { useFormikContext } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { baseUrl, get } from 'src/services/default';
import { RootState } from 'src/store';

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

const ShippingLineSelector: React.FC<Props> = ({
  name = 'sponsorId',
  isSearchFilter = true,
  onChange,
  disabled = false,
}) => {
  const formik = useFormikContext<any>();
  const token = useSelector(
    (state: RootState) => state?.auth?.user?.data?.accessToken
  );
  const [userData, setUserData] = useState<UserOption[]>([]);
  const translatedLabel = 'Consultant';

  // ---- API Call ----
  const getUsers = useCallback(async () => {
    const params: any = { isAll: true, status: 'active' };
    const queryString = new URLSearchParams(params).toString();
    const users: any = await get(`${baseUrl}/api/v1/users?${queryString}`);

    const formatted =
      users?.data?.rows?.map((row: any) => ({
        id: row.id,
        name: `${row.firstName} ${row.lastName}`,
      })) || [];

    setUserData(formatted);
  }, [token]);

  useEffect(() => {
    getUsers();
  }, []);

  // ---- Handle Selection ----
  const handleSelection = (_event: any, newValue: UserOption | null) => {
    formik.setFieldValue(name, newValue?.id || '');
    onChange?.(newValue);
  };

  // ---- Currently Selected Value ----
  const selectedValue =
    userData.find((item) => item.id === +formik.values[name]) || null;

  // ---- Formik Error ----
  const fieldError =
    formik.touched?.[name] && formik.errors?.[name]
      ? String(formik.errors[name])
      : '';

  return (
    <Autocomplete
      sx={{ height: '2.7rem' }}
      options={userData}
      value={selectedValue}
      onChange={handleSelection}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      disabled={disabled}
      renderInput={(params) => (
        <MuiTextField
          {...(params as TextFieldProps)}
          label={`${translatedLabel}${!isSearchFilter ? ' *' : ''}`}
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

export default ShippingLineSelector;
