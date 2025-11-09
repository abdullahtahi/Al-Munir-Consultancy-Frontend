import React from 'react'
import { useField } from "formik";
import { TextField } from '@mui/material';

interface FormTextFieldProps {
    name: string;
    label?: string;
    placeholder: string;
    fullWidth?: boolean;
    type?:string;
    [key: string]: any; // allow passing other props
  }

  const CustomFields: React.FC<FormTextFieldProps> = ({
    name,
    label,
    placeholder,
    type='string',
    fullWidth = true,
    ...props
  }) => {
    const [field, meta] = useField(name);
  return (
    
    <TextField
    {...field}
    {...props}
    label={label}
    type={type}
    placeholder={placeholder}
    fullWidth={fullWidth}
    error={meta.touched && Boolean(meta.error)}
    helperText={meta.touched && meta.error ? meta.error : ""}
  />

  )
}

export default CustomFields