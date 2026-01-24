import {
  Autocomplete,
  CircularProgress,
  TextField as MuiTextField,
} from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useContainersByAttributes } from 'src/api/hooks/useContainersByAttributes';
import { RootState } from 'src/store';
import { ContainerItemType } from 'src/types/components/container';

interface Props {
  name?: string;
  isSearchFilter?: boolean;
  value?: ContainerItemType | null;
  onChange?: (value: ContainerItemType | null) => void;
  disabled?: boolean;
  label?: string;
  companyId?: string;
  terminalId?: string;
  shippingLineId: string;
}

const ContainerSelector: React.FC<Props> = ({
  name = 'containerId',
  isSearchFilter = false,
  value,
  onChange,
  disabled = false,
  label,
  companyId,
  terminalId,
  shippingLineId,
}) => {
  const { t } = useTranslation();
  const formik = useFormikContext<any>();
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState<ContainerItemType | null>(null);

  const selectedDepot = useSelector(
    (state: RootState) => state.depot.selectedDepot
  );
  const resolvedTerminalId = terminalId || selectedDepot?.id;
  const resolvedCompanyId = companyId || import.meta.env.VITE_COMPANY_ID;

  const { data: containersResponse = [], isLoading } =
    resolvedCompanyId && resolvedTerminalId
      ? useContainersByAttributes(resolvedCompanyId, resolvedTerminalId, {
          container_number: searchText,
          ownerCompanyId: shippingLineId,
          isEirInBlock: false,
          attributes: [
            'id',
            'containerNumber',
            'ownerCompanyId',
            'isoDetailId',
            'weightCapacity',
            'detentionDate',
            'ISOCodeId',
            'flmJobNo',
          ],
        })
      : { data: [], isLoading: false };

  const translatedLabel = label ? t(label) : t('appModule.container');
  const containers = containersResponse?.rows ?? [];

  // Sync standalone value
  useEffect(() => {
    if (!formik && value) {
      const match = containers.find((c: any) => c.id === value.id);
      setSelected(match || null);
    }
  }, [value, containers, formik]);

  const handleSelection = (_event: any, newValue: ContainerItemType | null) => {
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

  const getOptionLabel = (option: ContainerItemType) =>
    option?.containerNumber || '';
  const isOptionEqualToValue = (
    option: ContainerItemType,
    value: ContainerItemType
  ) => option?.id === value?.id;

  // ✅ Formik mode
  if (formik && !isSearchFilter) {
    const fieldError = name
      ? formik.touched?.[name] && formik.errors?.[name]
      : '';

    return (
      <Autocomplete
        options={containers}
        loading={isLoading}
        onChange={handleSelection}
        onInputChange={handleInputChange}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        disabled={disabled || !shippingLineId}
        value={
          containers.find(
            (c: ContainerItemType) => c.id === +formik.values[name]
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

  // ✅ Standalone mode
  return (
    <Autocomplete
      options={containers}
      loading={isLoading}
      onChange={handleSelection}
      onInputChange={handleInputChange}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      disabled={disabled || !shippingLineId}
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

export default ContainerSelector;
