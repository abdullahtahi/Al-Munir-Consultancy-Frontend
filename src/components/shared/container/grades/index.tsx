import * as constants from '@constants/AppConstants';
import {
  Autocomplete,
  CircularProgress,
  TextField as MuiTextField,
} from '@mui/material';
import { useFormikContext } from 'formik';
import _find from 'lodash/find';
import _uniqBy from 'lodash/uniqBy';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useContainerGradesByAttributes } from 'src/api/hooks/useContainerGradesByAttributes';
import { RootState } from 'src/store';

export interface ApiContainerGradeType {
  id: number;
  grade: string;
  shippingLineId: number;
  requireServices: boolean;
  damageServices: boolean;
}

export interface StoreContainerGradeType {
  id: number;
  grade: string;
  shippingLineId?: number; // optional in store mode
  code: string;
}

export type ContainerGradeUnion =
  | ApiContainerGradeType
  | StoreContainerGradeType;

interface Props {
  name?: string;
  isSearchFilter?: boolean;
  value?: ContainerGradeUnion | null;
  onChange?: (value: ContainerGradeUnion | null) => void;
  disabled?: boolean;
  label?: string;
  companyId?: string;
  shippingLineId?: string; // required for API mode
}

const ContainerGradeSelector: React.FC<Props> = ({
  name = 'gradeId',
  isSearchFilter = false,
  value,
  onChange,
  disabled = false,
  label,
  companyId,
  shippingLineId,
}) => {
  const { t } = useTranslation();
  const formik = useFormikContext<any>();
  const [selected, setSelected] = useState<ContainerGradeUnion | null>(null);

  const resolvedCompanyId = companyId || import.meta.env.VITE_COMPANY_ID;

  // Store grades
  const storeContainerGrades: StoreContainerGradeType[] = useSelector(
    (state: RootState) => state.auth.lookups.data.grades || []
  );

  // API grades
  const { data: apiResponse, isLoading } = useContainerGradesByAttributes(
    resolvedCompanyId,
    shippingLineId
      ? {
          shippingLineId,
          limit: constants.all,
          attributes: ['id', 'grade', 'shippingLineId', 'requireServices'],
        }
      : undefined // undefined means no SWR call
  );

  // Decide which grades list to use
  const rawGrades: ContainerGradeUnion[] =
    formik && !isSearchFilter
      ? (apiResponse?.rows ?? [])
      : (storeContainerGrades ?? []);

  // Deduplicate by composite key (id + shippingLineId fallback to 0)
  const containerGrades = _uniqBy(
    rawGrades,
    (g) => `${g.id}-${g.shippingLineId ?? 0}`
  );

  const translatedLabel = label ? t(label) : t('eirIn.grade');

  // Sync standalone value (non-formik mode)
  useEffect(() => {
    if (!formik && value) {
      const match = _find(containerGrades, (g) => g.id === value.id);
      setSelected(match || null);
    }
  }, [value, containerGrades, formik]);

  const handleSelection = (
    _event: any,
    newValue: ContainerGradeUnion | null
  ) => {
    if (formik && !isSearchFilter) {
      formik.setFieldTouched(name, true);
      formik.setFieldValue(name, newValue?.id || '');
    } else {
      setSelected(newValue);
      onChange?.(newValue);
    }
  };

  const getOptionLabel = (option: ContainerGradeUnion) => option?.grade || '';

  const isOptionEqualToValue = (
    option: ContainerGradeUnion,
    value: ContainerGradeUnion
  ) =>
    option?.id === value?.id &&
    (option?.shippingLineId ?? 0) === (value?.shippingLineId ?? 0);

  // ✅ Validation mode
  if (formik && !isSearchFilter) {
    const fieldError = name && formik.touched?.[name] && formik.errors?.[name];

    return (
      <Autocomplete
        options={containerGrades}
        loading={isLoading}
        onChange={handleSelection}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        disabled={disabled || !shippingLineId}
        value={
          containerGrades.find((g) => g.id === +formik.values[name]) || null
        }
        renderInput={(params) => (
          <MuiTextField
            {...params}
            label={`${translatedLabel} *`}
            name={name}
            variant="outlined"
            size="small"
            error={Boolean(fieldError)}
            helperText={fieldError ? String(fieldError) : ''}
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

  // ✅ Non-validation mode
  return (
    <Autocomplete
      options={containerGrades}
      loading={isLoading}
      onChange={handleSelection}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      disabled={disabled}
      value={selected}
      renderOption={(props, option) => (
        <li {...props} key={`${option.id}-${option.shippingLineId ?? 0}`}>
          {option.grade}
        </li>
      )}
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

export default ContainerGradeSelector;
