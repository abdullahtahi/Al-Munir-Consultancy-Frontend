import React, { useState } from 'react';
import {
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { baseUrl, upload } from 'src/services/default';
import { useFormikContext } from 'formik';

interface FileUploadProps {
  name: string;
  label: string;
}

const FileUploadField: React.FC<FileUploadProps> = ({ name, label }) => {
  const { setFieldValue, setFieldTouched, validateField, touched, errors } =
    useFormikContext<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    try {
      setLoading(true);
      
      if (file) {
        const response: any = await upload(`/upload/image`, file);
        await setFieldValue(name, response?.path);
      } else {
        await setFieldValue(name, '');
      }
      

      setFieldTouched(name, true);
      

      setTimeout(() => {
        validateField(name);
      }, 100);
      
    } catch (error) {
      console.error(`Error uploading ${name}:`, error);
      setFieldTouched(name, true);
    } finally {
      setLoading(false);
    }
  };

  const errorText = touched[name] && errors[name] ? (errors[name] as string) : '';

  return (
    <>
   {label !=="" && <Typography variant="h6" sx={{ mb: 2 }}>
        {label}
      </Typography>
        }
      <TextField
        name={name}
        type="file"
        onChange={handleFileChange}
        fullWidth
        error={!!errorText}
        helperText={errorText}
        inputProps={{ accept: 'image/*' }}
      />
      {loading && <CircularProgress size={20} sx={{ mt: '1rem' }} />}
    </>
  );
};

export default FileUploadField;