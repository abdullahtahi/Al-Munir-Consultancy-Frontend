import { Autocomplete, TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';

interface Option {
  id: string;
  name: string;
}

interface IsGPSSelectorProps {
  name?: string;
  label: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  isSearchFilter?: boolean;
  isRequired?: boolean;
}

const isGPSOptions: Option[] = [
  { id: 'Yes', name: 'Yes' },
  { id: 'No', name: 'No' },
];

const IsGPSSelector: React.FC<IsGPSSelectorProps> = ({
  name = 'isGPS',
  label,
  value,
  onChange,
  disabled = false,
  isRequired = false,
}) => {
  const formik = (() => {
    try {
      return useFormikContext<any>();
    } catch {
      return null;
    }
  })();

  const [localValue, setLocalValue] = useState<Option | null>(
    value === true
      ? isGPSOptions.find((o) => o.id === 'Yes') || null
      : value === false
        ? isGPSOptions.find((o) => o.id === 'No') || null
        : null
  );

  // Keep local state in sync in non-formik mode
  useEffect(() => {
    if (!formik) {
      setLocalValue(
        value === true
          ? isGPSOptions.find((o) => o.id === 'Yes') || null
          : value === false
            ? isGPSOptions.find((o) => o.id === 'No') || null
            : null
      );
    }
  }, [value, formik]);

  const handleChange = (_event: any, selected: Option | null) => {
    if (formik) {
      formik.setFieldTouched(name, true);
      formik.setFieldValue(name, selected?.id === 'Yes');
    } else {
      setLocalValue(selected);
      onChange?.(selected?.id === 'Yes');
    }
  };

  const selectedValue = formik
    ? formik.values[name] === true
      ? isGPSOptions.find((o) => o.id === 'Yes') || null
      : formik.values[name] === false
        ? isGPSOptions.find((o) => o.id === 'No') || null
        : null
    : localValue;

  const errorText =
    formik && formik.touched[name] && formik.errors[name]
      ? String(formik.errors[name])
      : '';

  return (
    <Autocomplete
      options={isGPSOptions}
      getOptionLabel={(option) => option.name}
      value={selectedValue}
      onChange={handleChange}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label={isRequired ? `${label} *` : label}
          variant="outlined"
          size="small"
          error={Boolean(errorText)}
          helperText={errorText}
        />
      )}
    />
  );
};

export default IsGPSSelector;
