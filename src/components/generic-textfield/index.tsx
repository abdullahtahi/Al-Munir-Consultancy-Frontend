import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface GenericTextFieldProps extends Omit<
  TextFieldProps,
  'name' | 'value' | 'onChange' | 'label'
> {
  name?: string;
  label?: string; // translation key or plain text
  value?: string; // standalone mode
  onChange?: (value: string) => void; // standalone mode
  disabled?: boolean;
  isSearchFilter?: boolean; // skip Formik binding for search inputs
  isRequired?: boolean;
}

const GenericTextField: React.FC<GenericTextFieldProps> = ({
  name = '',
  label = '',
  value,
  onChange,
  disabled = false,
  size = 'small',
  isSearchFilter = false,
  isRequired = false,
  ...rest
}) => {
  const { t } = useTranslation();
  const formik = useFormikContext<any>();
  const [inputValue, setInputValue] = useState(value ?? '');

  const isFormik = !!formik?.values && name in formik.values;

  // Keep standalone input in sync
  useEffect(() => {
    if (!isFormik && value !== undefined) {
      setInputValue(value);
    }
  }, [value, isFormik]);

  const fieldValue = isFormik ? formik.values[name] : inputValue;

  const fieldError =
    isFormik && formik.touched[name] && formik.errors[name]
      ? String(formik.errors[name])
      : '';

  const handleChange = (newValue: string) => {
    if (isFormik && !isSearchFilter) {
      formik.setFieldValue(name, newValue);
    } else {
      setInputValue(newValue);
      onChange?.(newValue);
    }
  };

  const translatedLabel = label ? t(label) : '';

  return (
    <TextField
      fullWidth
      name={name}
      label={isRequired ? `${translatedLabel} *` : translatedLabel}
      variant="outlined"
      value={fieldValue}
      disabled={disabled}
      error={Boolean(fieldError)}
      helperText={fieldError || ''}
      size={size}
      margin="none"
      required={false}
      inputProps={{
        'aria-required': false,
      }}
      onChange={(e) => handleChange(e.target.value)}
      {...rest}
    />
  );
};

export default GenericTextField;
