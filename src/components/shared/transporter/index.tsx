import { useTransportersByAttributes } from '@api/hooks/useTransportersByAttributes';
import * as constants from '@constants/AppConstants';
import {
    Autocomplete,
    CircularProgress,
    TextField as MuiTextField,
} from '@mui/material';
import { useFormikContext } from 'formik';
import _find from 'lodash/find';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { TransporterType } from 'src/types/components/transporter';

interface Props {
    name?: string;
    isSearchFilter?: boolean;
    value?: TransporterType | null;
    onChange?: (value: TransporterType | null) => void;
    disabled?: boolean;
    label?: string;
    companyId?: string;
    terminalId?: string;
}

const TransporterSelector: React.FC<Props> = ({
    name = 'transporterCompanyId',
    isSearchFilter = false,
    value,
    onChange,
    disabled = false,
    label,
    companyId,
    terminalId,
}) => {
    const { t } = useTranslation();
    const formik = useFormikContext<any>();
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected] = useState<TransporterType | null>(null);
    const selectedDepot = useSelector((state: RootState) => state.depot.selectedDepot);
    const resolvedTerminalId = terminalId || selectedDepot?.id;
    const resolvedCompanyId = companyId || import.meta.env.VITE_COMPANY_ID;

    const { data: transporters = [], isLoading } = resolvedCompanyId && resolvedTerminalId
        ? useTransportersByAttributes(
            resolvedCompanyId,
            resolvedTerminalId,
            {
                limit: constants.all,
                name: searchText,
                type: constants.TRANSPORTER,
                attributes: ['id', 'name', 'code', 'istemaraNo']
            }
        ) : { data: [], isLoading: false };

    const translatedLabel = label || t('appModule.transporter');

    useEffect(() => {
        if (!formik && value) {
            const match = _find(transporters, (v) => v.id === value.id);
            setSelected(match || null);
        }
    }, [value, transporters, formik]);

    const handleSelection = (_event: any, newValue: TransporterType | null) => {
        if (formik && !isSearchFilter) {
            formik.setFieldTouched(name, true);
            formik.setFieldValue(name, newValue?.id || '');
        } else {
            setSelected(newValue);
            onChange?.(newValue);
        }
    };

    const handleInputChange = (_event: any, newInputValue: string, reason: string) => {
        if (reason === 'input') {
            setSearchText(newInputValue);
            if (selected !== null) setSelected(null);
        } else if (reason === 'clear' || reason === 'reset') {
            setSearchText('');
            setSelected(null);
        }
    };

    const getOptionLabel = (option: TransporterType) =>
        `${option.code} ${option.istemaraNo ? `(${option.istemaraNo})` : ''}`;

    const isOptionEqualToValue = (
        option: TransporterType,
        value: TransporterType
    ) => option.id === value?.id;

    // ✅ Formik + validation
    if (formik && !isSearchFilter) {
        const fieldError = name
            ? formik.touched?.[name] && formik.errors?.[name]
            : '';

        return (
            <Autocomplete
                options={transporters}
                loading={isLoading}
                onChange={handleSelection}
                onInputChange={handleInputChange}
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={isOptionEqualToValue}
                disabled={disabled}
                value={
                    transporters.find((t: any) => t.id === +formik.values[name]) || null
                }
                renderInput={(params) => (
                    <MuiTextField
                        {...params}
                        label={`${translatedLabel} *`}
                        name={name}
                        variant="outlined"
                        size="small"
                        error={Boolean(fieldError)}
                        helperText={fieldError ? String(formik.errors[name]) : ''}
                        margin="none"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {isLoading && <CircularProgress size={20} />}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                        sx={{ mt: 0 }}
                    />
                )}
            />
        );
    }

    // ✅ Standalone / Filter use
    return (
        <Autocomplete
            options={transporters}
            loading={isLoading}
            onChange={handleSelection}
            onInputChange={handleInputChange}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            value={selected}
            disabled={disabled}
            renderInput={(params) => (
                <MuiTextField
                    {...params}
                    label={translatedLabel}
                    variant="outlined"
                    margin="none"
                    size="small"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {isLoading && <CircularProgress size={20} />}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    sx={{ mt: 0 }}
                />
            )}
        />
    );
};

export default TransporterSelector;
