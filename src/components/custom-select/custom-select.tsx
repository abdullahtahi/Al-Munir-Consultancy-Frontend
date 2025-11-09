import React from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

interface FormTextFieldProps {
  name: string;
  label?: string;
  placeholder: string;
  fullWidth?: boolean;
  type?: string;
  [key: string]: any; // allow passing other props,
  options: {
    key: string;
    value: string;
  }[];
}

const CustomSelect: React.FC<FormTextFieldProps> = ({
  name,
  label,
  placeholder,
  type = 'string',
  fullWidth = true,
  options,
  ...props
}) => {
  const [field, meta] = useField(name);
  return (
    <FormControl
      fullWidth={fullWidth}
      error={meta.touched && Boolean(meta.error)}
    >
      <InputLabel>{label}</InputLabel>
      <Select {...field} {...props} label={label}>
        {options.map((row) => (
          <MenuItem
            sx={{
              textTransform: 'capitalize',
            }}
            key={row.value}
            value={row.value}
          >
            {row.key}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;
