// src/components/CustomDatePicker.tsx
import { StandardTextFieldProps, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';

interface CustomDatePickerProps {
  label: string;
  name?: string;
  size?: StandardTextFieldProps['size'];
  defaultValue?: Dayjs | null;
  onDateChange?: (date: Dayjs | null) => void;
  textFieldProps?: TextFieldProps;
  disabled?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  name,
  size = 'small',
  defaultValue = null,
  onDateChange,
  textFieldProps,
  disabled = false,
  minDate,
  maxDate,
}) => {
  const formik = name ? useFormikContext<any>() : null;

  // If in formik mode, use formik value instead of local state
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    formik && name ? formik.values[name] : defaultValue
  );

  useEffect(() => {
    if (!formik && onDateChange) {
      onDateChange(selectedDate);
    }
  }, [selectedDate, formik, onDateChange]);

  const handleChange = (newValue: Dayjs | null) => {
    if (formik && name) {
      formik.setFieldTouched(name, true);
      formik.setFieldValue(name, newValue);
    } else {
      setSelectedDate(newValue);
    }
  };

  // Get Formik error if in validation mode
  const error =
    formik && name && formik.touched[name] && formik.errors[name]
      ? String(formik.errors[name])
      : '';

  return (
    <DatePicker
      label={label}
      value={
        formik && name
          ? formik.values[name]
            ? dayjs(formik.values[name]) // ✅ ensure it's a Dayjs instance
            : null
          : selectedDate
            ? dayjs(selectedDate)
            : null
      }
      onChange={handleChange}
      disabled={disabled}
      {...(minDate ? { minDate } : {})}
      {...(maxDate ? { maxDate } : {})}
      slotProps={{
        textField: {
          fullWidth: true,
          variant: 'outlined',
          size,
          error: Boolean(error),
          helperText: error,
          ...textFieldProps,
        },
      }}
    />
  );
};

export default CustomDatePicker;
