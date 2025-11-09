import type { CheckboxProps } from '@mui/material/Checkbox';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

interface GenericCheckboxProps {
  label: string;
  name: string;
  checked?: boolean; // optional if used in standalone mode
  onChange?: (checked: boolean) => void; // optional if used in Formik mode
  disabled?: boolean;
  color?: CheckboxProps['color'];
}

const GenericCheckbox = ({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  color = 'primary',
}: GenericCheckboxProps) => {
  const { t } = useTranslation();
  const formik = useFormikContext<any>();

  // If inside Formik, use its state & handlers
  const isFormik = !!formik?.values && name in formik.values;
  const isChecked = isFormik ? formik.values[name] : checked || false;
  const translatedLabel = label ? t(label) : t('appModule.damageServices');

  const handleChange = (value: boolean) => {
    if (isFormik) {
      formik.setFieldValue(name, value);
    } else {
      onChange?.(value);
    }
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={(e) => handleChange(e.target.checked)}
          name={name}
          disabled={disabled}
          color={color}
        />
      }
      label={translatedLabel}
    />
  );
};

export default GenericCheckbox;
