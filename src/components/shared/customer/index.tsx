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
import { useCustomersByAttributes } from 'src/api/hooks/useCustomersByAttributes';
import { RootState } from 'src/store';
import { CustomerType } from 'src/types/components/customer';

interface Props {
  name?: string;
  isSearchFilter?: boolean;
  value?: CustomerType | null;
  onChange?: (value: CustomerType | null) => void;
  disabled?: boolean;
  label?: string;
  companyId?: string;
  terminalId?: string;
}

const CustomerSelector: React.FC<Props> = ({
  name = 'customerCompanyId',
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
  const [selected, setSelected] = useState<CustomerType | null>(null);
  const selectedDepot = useSelector(
    (state: RootState) => state.depot.selectedDepot
  );
  const resolvedTerminalId = terminalId || selectedDepot?.id;
  const resolvedCompanyId = companyId || import.meta.env.VITE_COMPANY_ID;

  const { data: customers = [], isLoading } =
    resolvedTerminalId && resolvedCompanyId
      ? useCustomersByAttributes(resolvedCompanyId, resolvedTerminalId, {
          limit: constants.all,
          name: searchText,
          type: constants.CUSTOMER,
          attributes: ['id', 'name'],
        })
      : { data: [], isLoading: false };

  const translatedLabel = label || t('appModule.customers');

  // Sync standalone value
  useEffect(() => {
    if (!formik && value) {
      const match = _find(customers, (c) => c.id === value.id);
      setSelected(match || null);
    }
  }, [value, customers, formik]);

  const handleSelection = (_event: any, newValue: CustomerType | null) => {
    if (formik && !isSearchFilter) {
      formik.setFieldTouched(name, true); // mark as touched
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

  const getOptionLabel = (option: CustomerType) => option?.name || '';
  const isOptionEqualToValue = (option: CustomerType, value: CustomerType) =>
    option.id === value?.id;

  // 🌟 Formik + validation block
  if (formik && !isSearchFilter) {
    const fieldError = name
      ? formik.touched?.[name] && formik.errors?.[name]
      : '';

    return (
      <Autocomplete
        options={customers}
        loading={isLoading}
        onChange={handleSelection}
        onInputChange={handleInputChange}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        disabled={disabled}
        value={
          customers.find(
            (cust: CustomerType) => cust.id === +formik.values[name]
          ) || null
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

  // 🌟 Standalone or Search Filter Mode (No Formik validation)
  return (
    <Autocomplete
      options={customers}
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

export default CustomerSelector;
