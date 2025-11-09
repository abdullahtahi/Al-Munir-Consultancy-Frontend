import { TextField, TextFieldProps } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props extends Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'label'> {
    name?: string;
    isSearchFilter?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    label?: string;
    required?: boolean;
}

const BlNumberSelector: React.FC<Props> = ({
    name = 'blNumber',
    isSearchFilter = false,
    value,
    onChange,
    disabled = false,
    label,
    required = false,
    ...rest
}) => {
    const { t } = useTranslation();
    const formik = useFormikContext<any>();
    const [inputValue, setInputValue] = useState('');

    // Handle initial value in standalone mode
    useEffect(() => {
        if (!formik && value !== undefined) {
            setInputValue(value);
        }
    }, [value, formik]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formik && !isSearchFilter) {
            formik.setFieldValue(name, e.target.value);
        } else {
            setInputValue(e.target.value);
            onChange?.(e);
        }
    };

    const translatedLabel = label ? t(label) : t('appModule.blNumber');

    // Formik mode (with validation)
    if (formik && !isSearchFilter) {
        const fieldError = name ? formik.touched?.[name] && formik.errors?.[name] : '';
        return (
            <TextField
                fullWidth
                name={name}
                label={translatedLabel}
                value={formik.values?.[name] || ''}
                onChange={handleChange}
                error={Boolean(fieldError)}
                helperText={fieldError ? String(fieldError) : ''}
                variant="outlined"
                size="small"
                margin="none"
                disabled={disabled}
                {...rest}
            />
        );
    }

    // Standalone mode (no validation)
    return (
        <TextField
            fullWidth
            name={name}
            label={translatedLabel}
            value={inputValue}
            onChange={handleChange}
            variant="outlined"
            size="small"
            margin="none"
            disabled={disabled}
            {...rest}
        />
    );
};

export default BlNumberSelector;
