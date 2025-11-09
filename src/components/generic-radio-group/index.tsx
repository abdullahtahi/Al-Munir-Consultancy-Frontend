import type { FormControlProps } from '@mui/material/FormControl';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import type { RadioProps } from '@mui/material/Radio';
import Radio from '@mui/material/Radio';
import type { RadioGroupProps } from '@mui/material/RadioGroup';
import RadioGroup from '@mui/material/RadioGroup';
import { useFormikContext } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface RadioOption {
    label: string; // translation key or plain text
    value: string | number | boolean;
}

interface GenericRadioGroupProps {
    name: string;
    options: RadioOption[];
    value?: string | number; // standalone mode
    onChange?: (value: string | number | boolean) => void; // standalone mode
    disabled?: boolean;
    row?: boolean; // defaults to true
    color?: RadioProps['color'];
    formControlProps?: Partial<FormControlProps>; // ✅ custom styles for FormControl
    radioGroupProps?: Partial<RadioGroupProps>; // ✅ custom styles for RadioGroup
    labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
}

const GenericRadioGroup: React.FC<GenericRadioGroupProps> = ({
    name,
    options,
    value,
    onChange,
    disabled = false,
    row = true, // ✅ default one row
    color = 'primary',
    formControlProps,
    radioGroupProps,
    labelPlacement = 'end'
}) => {
    const { t } = useTranslation();
    const formik = useFormikContext<any>();

    const isFormik = !!formik?.values && name in formik.values;
    const selectedValue = isFormik ? formik.values[name] : value ?? '';

    const fieldError =
        isFormik && formik.touched[name] && formik.errors[name]
            ? String(formik.errors[name])
            : '';

    const handleChange = (newValue: string | number | boolean) => {
        if (isFormik) {
            formik.setFieldValue(name, newValue);
        }
        // Always call onChange if provided
        onChange?.(newValue);
    };

    const parseValue = (value: any): string | number | boolean => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    };

    return (
        <FormControl
            component="fieldset"
            error={!!fieldError}
            {...formControlProps} // ✅ pass extra props/styles
        >
            <RadioGroup
                row={row}
                name={name}
                value={selectedValue}
                onChange={(e) => handleChange(parseValue(e.target.value))}
                {...radioGroupProps} // ✅ pass extra props/styles
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={String(option.value)}
                        value={option.value}
                        control={<Radio color={color} disabled={disabled} />}
                        label={t(option.label)}
                        labelPlacement={labelPlacement}
                    />
                ))}
            </RadioGroup>
            {fieldError && <FormHelperText>{fieldError}</FormHelperText>}
        </FormControl>
    );
};

export default GenericRadioGroup;
