// src/components/RemarksField.tsx
import { StandardTextFieldProps, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";

interface RemarksFieldProps {
    label: string;
    name?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    rows?: number;
    size?: StandardTextFieldProps["size"];
}

const RemarksField: React.FC<RemarksFieldProps> = ({
    label,
    name = "remarks",
    value = "",
    onChange,
    disabled = false,
    rows = 1,
    size = "small",
}) => {
    const formik = useFormikContext<any>();
    const isFormik = !!formik?.values;

    const [localValue, setLocalValue] = useState(value);

    // Sync local state in non-Formik mode
    useEffect(() => {
        if (!isFormik) {
            setLocalValue(value);
        }
    }, [value, isFormik]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        if (isFormik) {
            formik.setFieldTouched(name, true);
            formik.setFieldValue(name, val);
        } else {
            setLocalValue(val);
            onChange?.(val);
        }
    };

    const fieldValue = isFormik ? formik.values[name] || "" : localValue;
    const errorText =
        isFormik && formik.touched[name] && formik.errors[name]
            ? String(formik.errors[name])
            : "";

    return (
        <TextField
            label={`${label} *`}
            name={name}
            value={fieldValue}
            onChange={handleChange}
            disabled={disabled}
            rows={rows}
            fullWidth
            variant="outlined"
            margin="none"
            size={size}
            error={Boolean(errorText)}
            helperText={errorText}
        />
    );
};

export default RemarksField;
