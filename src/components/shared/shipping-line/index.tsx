import { Autocomplete, TextField as MuiTextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { useFormikContext } from 'formik';
import _find from 'lodash/find';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { baseUrl, get } from 'src/services/default';
import { RootState } from 'src/store';
import { ShippingLine } from 'src/types/components/shipping-line';

interface Props {
  name?: string;
  isSearchFilter?: boolean;
  value?: ShippingLine | null;
  onChange?: (value: ShippingLine | null) => void;
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

  const [userData, setUserData] = useState<any>(null);
  const [selected, setSelected] = useState<ShippingLine | null>(null);

  const handleSelection = (_event: any, newValue: ShippingLine | null) => {
    formik.setFieldValue(name, newValue?.id || '');
    setSelected(newValue);
    onChange?.(newValue);
  };

  const getUsers = useCallback(async () => {
    const params = {
      status: 'active',
    };
    const queryString = new URLSearchParams(params).toString();
    const users: any = await get(`${baseUrl}/api/v1/users?${queryString}`);
    setUserData(users.data);
    return users;
  }, [token]);

  useEffect(() => {
    getUsers();
  }, []);

  const translatedLabel = 'Sponsor';

  if (formik && !isSearchFilter) {
    const fieldError = name
      ? formik.touched?.[name] && formik.errors?.[name]
      : '';

    return (
      <Autocomplete
        options={userData?.rows.map((row: any) => ({
          label: row.firstName + row.lastName,
        }))}
        value={
          userData?.rows.find(
            (line: any) => line.id === +formik.values[name]
          ) || null
        }
        onChange={handleSelection}
        getOptionLabel={(option: ShippingLine) => option.name}
        isOptionEqualToValue={(option: ShippingLine, value: ShippingLine) =>
          option.id === value.id
        }
        disabled={disabled}
        renderInput={(params) => (
          <MuiTextField
            {...(params as TextFieldProps)}
            label={`${translatedLabel} *`}
            name={name}
            variant="outlined"
            size="small"
            error={Boolean(fieldError)}
            helperText={fieldError ? String(fieldError) : ''}
            margin="none"
            sx={{ mt: 0 }}
          />
        )}
      />
    );
  }

  return (
    <Autocomplete
      options={
        userData?.rows.map((row: any) => ({
          id: row.id,
          name: `${row.firstName} ${row.lastName}`, // keep a proper "name"
        })) || []
      }
      value={
        userData?.rows
          .map((row: any) => ({
            id: row.id,
            name: `${row.firstName} ${row.lastName}`,
          }))
          .find((line: any) => line.id === +formik.values[name]) || null
      }
      getOptionLabel={(option: any) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      onChange={handleSelection}
      disabled={disabled}
      renderInput={(params) => (
        <MuiTextField
          {...(params as TextFieldProps)}
          label={translatedLabel}
          variant="outlined"
          margin="none"
          size="small"
        />
      )}
    />
  );
};

export default ShippingLineSelector;
