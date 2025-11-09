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
import { useVoyagesByAttributes } from 'src/api/hooks/useVoyagesByAttributes';
import { RootState } from 'src/store';
import { VoyageType } from 'src/types/components/vessels-voyage';


interface Props {
    name?: string;
    isSearchFilter?: boolean;
    value?: VoyageType | null;
    onChange?: (value: VoyageType | null) => void;
    disabled?: boolean;
    label?: string;
    companyId?: string;
    terminalId?: string;
    vesselId?: number; // For disabling the field
}

const VoyageSelector: React.FC<Props> = ({
    name = 'voyageId',
    isSearchFilter = false,
    value,
    onChange,
    disabled = false,
    label,
    companyId,
    terminalId,
    vesselId,
}) => {
    const { t } = useTranslation();
    const formik = useFormikContext<any>();
    const [selected, setSelected] = useState<VoyageType | null>(null);
    const selectedDepot = useSelector((state: RootState) => state.depot.selectedDepot);
    const resolvedTerminalId = terminalId || selectedDepot?.id;
    const resolvedCompanyId = companyId || import.meta.env.VITE_COMPANY_ID;

    const { data: voyageResponse = [], isLoading } = resolvedCompanyId && resolvedTerminalId
        ? useVoyagesByAttributes(
            resolvedCompanyId,
            resolvedTerminalId,
            vesselId,
            {
                limit: constants.all,
                attributes: ['id', 'voyageNo']
            }
        ) : { data: [], isLoading: false };

    const voyages = voyageResponse?.rows ?? [];

    const translatedLabel = label || t('eirIn.voyage');

    useEffect(() => {
        if (!formik && value) {
            const match = _find(voyages, (v) => v.id === value.id);
            setSelected(match || null);
        }
    }, [value, voyages, formik]);

    const handleSelection = (_event: any, newValue: VoyageType | null) => {
        if (formik && !isSearchFilter) {
            formik.setFieldTouched(name, true);
            formik.setFieldValue(name, newValue?.id || '');
        } else {
            setSelected(newValue);
            onChange?.(newValue);
        }
    };

    const getOptionLabel = (option: VoyageType) => option?.voyageNo.toString();
    const isOptionEqualToValue = (option: VoyageType, value: VoyageType) =>
        option.id === value?.id;

    // ✅ Formik + validation
    if (formik && !isSearchFilter) {
        const fieldError = name
            ? formik.touched?.[name] && formik.errors?.[name]
            : '';

        return (
            <Autocomplete
                options={voyages}
                loading={isLoading}
                onChange={handleSelection}
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={isOptionEqualToValue}
                disabled={disabled || !vesselId}
                value={
                    voyages.find((v: any) => v.id === +formik.values[name]) || null
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
            options={voyages}
            loading={isLoading}
            onChange={handleSelection}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            value={selected}
            disabled={disabled || !vesselId}
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

export default VoyageSelector;
