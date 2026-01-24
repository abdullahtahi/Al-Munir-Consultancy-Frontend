// src/components/CustomDateTimePicker.tsx
import { StandardTextFieldProps } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';

interface CustomDateTimePickerProps {
  name?: string;
  label: string;
  size?: StandardTextFieldProps['size'];
  defaultValue?: Dayjs | null;
  onDateTimeChange?: (dateTime: Dayjs | null) => void;
  textFieldProps?: TextFieldProps;
  disabled?: boolean;
  minDateTime?: Dayjs;
  maxDateTime?: Dayjs;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  name,
  label,
  size = 'small',
  defaultValue = null,
  onDateTimeChange,
  textFieldProps,
  disabled = false,
  minDateTime,
  maxDateTime,
}) => {
  const formik = useFormikContext<any>();
  const isFormikMode = Boolean(name && formik);

  // Local state only for standalone mode
  const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(
    isFormikMode ? null : defaultValue
  );

  useEffect(() => {
    if (!isFormikMode && defaultValue) {
      setSelectedDateTime(defaultValue);
    }
  }, [defaultValue, isFormikMode]);

  const fieldError =
    isFormikMode && name ? formik.touched?.[name] && formik.errors?.[name] : '';

  return (
    <DateTimePicker
      label={`${label} *`}
      value={
        isFormikMode ? (formik.values[name!] ?? defaultValue) : selectedDateTime
      }
      onChange={(newValue) => {
        if (isFormikMode) {
          formik.setFieldTouched(name!, true);
          formik.setFieldValue(name!, newValue);
        } else {
          setSelectedDateTime(newValue);
          onDateTimeChange?.(newValue);
        }
      }}
      disabled={disabled}
      minDateTime={minDateTime}
      maxDateTime={maxDateTime}
      slotProps={{
        textField: {
          fullWidth: true,
          variant: 'outlined',
          size,
          error: Boolean(fieldError),
          helperText: fieldError ? String(fieldError) : '',
          ...textFieldProps,
        },
      }}
    />
  );
};

export default CustomDateTimePicker;
