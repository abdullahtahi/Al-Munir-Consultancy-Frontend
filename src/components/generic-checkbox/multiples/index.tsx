import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { SxProps } from '@mui/system';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

interface Option {
  label: string;
  value: string;
}

interface GenericMultipleCheckboxGroupProps {
  name: string;
  options: Option[];
  value?: any[];
  onChange?: (selected: any[]) => void;
  disabled?: boolean;
  formGroupSx?: SxProps; // custom styles for FormGroup
  getValueFromOption?: (optionValue: string) => any;
  isValueSelected?: (selectedItem: any, optionValue: string) => boolean;
}

const GenericMultipleCheckboxGroup: React.FC<
  GenericMultipleCheckboxGroupProps
> = ({
  name,
  options,
  value,
  onChange,
  disabled = false,
  formGroupSx,

  getValueFromOption,
  isValueSelected,
}) => {
  const { t } = useTranslation();
  const formik = useFormikContext<any>();

  const isFormik = !!formik?.values && name in formik.values;

  // Default transformation: identity (strings)
  const getValueFromOptionFn = getValueFromOption || ((val) => val);
  const isValueSelectedFn =
    isValueSelected || ((selectedItem, val) => selectedItem === val);

  const selectedValues: any[] = isFormik
    ? formik.values[name] || []
    : value || [];

  const handleToggle = (optionValue: string) => {
    let updatedValues;
    if (selectedValues.some((item) => isValueSelectedFn(item, optionValue))) {
      updatedValues = selectedValues.filter(
        (item) => !isValueSelectedFn(item, optionValue)
      );
    } else {
      updatedValues = [...selectedValues, getValueFromOptionFn(optionValue)];
    }

    if (isFormik) {
      formik.setFieldValue(name, updatedValues);
    } else {
      onChange?.(updatedValues);
    }
  };

  const defaultSx = {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  };

  return (
    <FormGroup sx={formGroupSx || defaultSx}>
      {options.map((opt) => (
        <FormControlLabel
          key={opt.value}
          control={
            <Checkbox
              checked={selectedValues.some((item) =>
                isValueSelectedFn(item, opt.value)
              )}
              onChange={() => handleToggle(opt.value)}
              disabled={disabled}
            />
          }
          label={t(opt.label)}
        />
      ))}
    </FormGroup>
  );
};

export default GenericMultipleCheckboxGroup;
