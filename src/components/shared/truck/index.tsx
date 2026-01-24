import {
  Autocomplete,
  CircularProgress,
  TextField as MuiTextField,
} from '@mui/material';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  useTruckDriverByAttributes,
  useTruckNumbers,
} from 'src/api/hooks/useTruckDriverByAttributes';
import { RootState } from 'src/store';
import { TruckBase, TruckType } from 'src/types/components/truck-driver';

interface Props {
  name?: string;
  isSearchFilter?: boolean;
  value?: TruckType | null;
  onChange?: (value: TruckType | null) => void;
  disabled?: boolean;
  label?: string;
  companyId?: string;
  terminalId?: string;
  transporterId?: string;
}

const TruckSelector: React.FC<Props> = ({
  name = 'truckId',
  isSearchFilter = false,
  value,
  onChange,
  disabled = false,
  label,
  companyId,
  terminalId,
  transporterId = '',
}) => {
  const { t } = useTranslation();
  const formik = useFormikContext<any>();
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState<TruckType | null>(null);

  const selectedDepot = useSelector(
    (state: RootState) => state.depot.selectedDepot
  );
  const resolvedTerminalId = terminalId || selectedDepot?.id || '';
  const resolvedCompanyId = companyId || import.meta.env.VITE_COMPANY_ID || '';

  // --- API calls ---
  const shouldFetchDrivers = !isSearchFilter && !!transporterId;
  const shouldFetchNumbers = isSearchFilter;

  const { data: trucksDriverResp = [], isLoading: isLoadingDrivers } =
    useTruckDriverByAttributes(
      resolvedCompanyId,
      resolvedTerminalId,
      transporterId,
      {
        truckId: searchText,
        limit: 'all',
        attributes: ['id', 'truckNumber', 'transporterId'],
      },
      shouldFetchDrivers
    );

  const {
    data: trucksNumbersResp = { rows: [] },
    isLoading: isLoadingNumbers,
  } = useTruckNumbers(
    resolvedCompanyId,
    resolvedTerminalId,
    {
      limit: 20,
      isActive: true,
      truckNumber: searchText,
      attributes: ['id', 'truckNumber', 'transporterId'],
    },
    shouldFetchNumbers
  );

  // --- Prepare trucks list ---
  const trucks = React.useMemo(() => {
    if (isSearchFilter) {
      return _.isArray(trucksNumbersResp?.rows)
        ? trucksNumbersResp.rows.map((item: TruckBase) => ({
            id: item.id,
            truckNumber: item.truckNumber,
            transporterId: item.transporterId,
          }))
        : [];
    }
    return _.isArray(trucksDriverResp)
      ? trucksDriverResp.map((item: TruckType) => ({
          id: item?.id,
          truckNumber: item?.truckNumber,
          transporterId: item?.transporterId,
          driverId: item?.Driver?.driverId,
          driverName: item?.Driver?.name,
        }))
      : [];
  }, [isSearchFilter, trucksNumbersResp, trucksDriverResp]);

  const translatedLabel = label ? t(label) : t('appModule.truck');

  // --- Sync standalone value ---
  useEffect(() => {
    if (!formik && value) {
      const match = trucks.find((c: TruckType) => c.id === value.id);
      setSelected(match || null);
    }
  }, [value, trucks, formik]);

  const handleSelection = (_event: any, newValue: TruckType | null) => {
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
      setSearchText(newInputValue.length > 2 ? newInputValue : '');
      if (selected !== null) setSelected(null);
    } else if (reason === 'clear' || reason === 'reset') {
      setSearchText('');
      setSelected(null);
    }
  };

  const getOptionLabel = (option: TruckType) => option?.truckNumber || '';
  const isOptionEqualToValue = (option: TruckType, value: TruckType) =>
    option?.id === value?.id;

  const loading = isSearchFilter ? isLoadingNumbers : isLoadingDrivers;

  // --- Validation mode (Formik) ---
  if (formik && !isSearchFilter) {
    const fieldError = name
      ? formik.touched?.[name] && formik.errors?.[name]
      : '';

    return (
      <Autocomplete
        options={trucks}
        loading={loading}
        onChange={handleSelection}
        onInputChange={handleInputChange}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        disabled={disabled || !transporterId}
        value={_.find(trucks, (c) => c.id === formik.values[name]) || null}
        renderInput={(params) => (
          <MuiTextField
            {...params}
            label={`${translatedLabel} *`}
            name={name}
            variant="outlined"
            size="small"
            error={Boolean(fieldError)}
            helperText={fieldError ? String(formik.errors[name]) : ''}
            margin="normal"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress size={20} />}
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

  // --- Standalone search filter mode ---
  return (
    <Autocomplete
      options={trucks}
      loading={loading}
      onChange={handleSelection}
      onInputChange={handleInputChange}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      disabled={disabled}
      value={selected}
      renderInput={(params) => (
        <MuiTextField
          {...params}
          label={translatedLabel}
          variant="outlined"
          margin="normal"
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress size={20} />}
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

export default TruckSelector;
