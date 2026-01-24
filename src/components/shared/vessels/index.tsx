import { useVesselsByAttributes } from '@api/hooks/useVesselsByAttributes';
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
import { VesselType } from 'src/types/components/vessels-voyage';

interface Props {
  name?: string;
  isSearchFilter?: boolean;
  value?: VesselType | null;
  onChange?: (value: VesselType | null) => void;
  disabled?: boolean;
  label?: string;
  companyId?: string;
  terminalId?: string;
}

const VesselSelector: React.FC<Props> = ({
  name = 'vesselId',
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
  const [selected, setSelected] = useState<VesselType | null>(null);
  const selectedDepot = useSelector(
    (state: RootState) => state.depot.selectedDepot
  );
  const resolvedTerminalId = terminalId || selectedDepot?.id;
  const resolvedCompanyId = companyId || import.meta.env.VITE_COMPANY_ID;

  const { data: vessels = [], isLoading } =
    resolvedCompanyId && resolvedTerminalId
      ? useVesselsByAttributes(resolvedCompanyId, resolvedTerminalId, {
          limit: constants.all,
          name: searchText,
          attributes: ['id', 'name'],
        })
      : { data: [], isLoading: false };

  const translatedLabel = label || t('eirIn.vessel');

  useEffect(() => {
    if (!formik && value) {
      const match = _find(vessels, (v) => v.id === value.id);
      setSelected(match || null);
    }
  }, [value, vessels, formik]);

  const handleSelection = (_event: any, newValue: VesselType | null) => {
    if (formik && !isSearchFilter) {
      formik.setFieldTouched(name, true);
      formik.setFieldValue(name, newValue?.id || '');
    } else {
      setSelected(newValue);
      onChange?.(newValue);
    }
  };

  const handleInputChange = (
    _event: any,
    newInputValue: string,
    reason: string
  ) => {
    if (reason === 'input') {
      setSearchText(newInputValue);
      if (selected !== null) setSelected(null);
    } else if (reason === 'clear' || reason === 'reset') {
      setSearchText('');
      setSelected(null);
    }
  };

  const getOptionLabel = (option: VesselType) => option?.name || '';
  const isOptionEqualToValue = (option: VesselType, value: VesselType) =>
    option.id === value?.id;

  // ✅ Formik + validation
  if (formik && !isSearchFilter) {
    const fieldError = name
      ? formik.touched?.[name] && formik.errors?.[name]
      : '';

    return (
      <Autocomplete
        options={vessels}
        loading={isLoading}
        onChange={handleSelection}
        onInputChange={handleInputChange}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        disabled={disabled}
        value={vessels.find((v: any) => v.id === +formik.values[name]) || null}
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
      options={vessels}
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

export default VesselSelector;
