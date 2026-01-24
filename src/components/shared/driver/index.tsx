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
  useDriverIds,
  useTruckDriverByAttributes,
} from 'src/api/hooks/useTruckDriverByAttributes';
import { RootState } from 'src/store';
import { DriverIdsType, DriverType } from 'src/types/components/truck-driver';

interface Props {
  name?: string;
  isSearchFilter?: boolean;
  value?: DriverType | DriverIdsType | null;
  onChange?: (value: DriverType | DriverIdsType | null) => void;
  disabled?: boolean;
  label?: string;
  companyId?: string;
  terminalId?: string;
  transporterId?: string;
}

const DriverSelector: React.FC<Props> = ({
  name = 'driverId',
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
  const [selected, setSelected] = useState<DriverType | DriverIdsType | null>(
    null
  );

  const selectedDepot = useSelector(
    (state: RootState) => state.depot.selectedDepot
  );
  const resolvedTerminalId = terminalId || selectedDepot?.id || '';
  const resolvedCompanyId = companyId || import.meta.env.VITE_COMPANY_ID || '';

  const shouldFetchAttributes = !isSearchFilter && !!transporterId;
  const shouldFetchIds = isSearchFilter;

  // Validation mode fetch
  const { data: driversAttrResp = [], isLoading: isLoadingAttr } =
    useTruckDriverByAttributes(
      resolvedCompanyId,
      resolvedTerminalId,
      transporterId,
      {
        driverId: searchText,
        limit: 'all',
        attributes: ['id', 'driverId', 'name', 'transporterId'],
      },
      shouldFetchAttributes
    );

  // Non-validation mode fetch
  const { data: driversIdsResp = { rows: [] }, isLoading: isLoadingIds } =
    useDriverIds(
      resolvedCompanyId,
      resolvedTerminalId,
      {
        limit: 20,
        driverId: searchText,
      },
      shouldFetchIds
    );

  // Prepare unified driver list
  const drivers = React.useMemo(() => {
    if (shouldFetchIds) {
      return _.isArray(driversIdsResp?.rows)
        ? driversIdsResp.rows.map((item: DriverIdsType) => ({
            id: item.id,
            driverId: item.driverId,
            name: item.name,
            transporterId: item.transporterId,
            mobile: item.mobile,
          }))
        : [];
    }

    return _.isArray(driversAttrResp)
      ? driversAttrResp.map((item: DriverType) => ({
          id: item.id,
          driverId: item.driverId,
          name: item.name,
          transporterId: item.transporterId,
          truckId: item.Truck?.id,
          truckNumber: item.Truck?.truckNumber,
        }))
      : [];
  }, [shouldFetchIds, driversIdsResp, driversAttrResp]);

  const translatedLabel = label ? t(label) : t('appModule.driver');

  // Sync standalone value
  useEffect(() => {
    if (!formik && value) {
      const match = drivers.find((c: DriverType) => c.id === value.id);
      setSelected(match || null);
    }
  }, [value, drivers, formik]);

  const handleSelection = (
    _event: any,
    newValue: DriverType | DriverIdsType | null
  ) => {
    console.log('newvalue in driver', newValue);
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

  const getOptionLabel = (option: any) => option?.driverId || '';
  const isOptionEqualToValue = (option: any, value: any) =>
    option?.id === value?.id;

  const isLoading = isLoadingAttr || isLoadingIds;

  // Validation mode (Formik integrated)
  if (formik && !isSearchFilter) {
    const fieldError = name
      ? formik.touched?.[name] && formik.errors?.[name]
      : '';

    return (
      <Autocomplete
        options={drivers}
        loading={isLoading}
        onChange={handleSelection}
        onInputChange={handleInputChange}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        disabled={disabled || !transporterId}
        value={_.find(drivers, (c) => c.id === formik.values[name]) || null}
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

  // Standalone mode
  return (
    <Autocomplete
      options={drivers}
      loading={isLoading}
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

export default DriverSelector;
