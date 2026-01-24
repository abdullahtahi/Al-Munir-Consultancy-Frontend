import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { setSelectedDepot } from '@store/slices/depotSlice';
import { IconMapPin } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import { AppDispatch, RootState } from 'src/store';
import { lookUpAllThings } from 'src/store/slices/authSlice';

const Depots = () => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const selectedDepot = useSelector(
    (state: RootState) => state.depot.selectedDepot
  );
  const terminals = useSelector(
    (state: RootState) => state.auth.terminals?.rows || []
  );

  useEffect(() => {
    if (terminals.length > 0 && !selectedDepot) {
      dispatch(setSelectedDepot(terminals[0]));
    }
  }, [terminals, selectedDepot, dispatch]);

  const handleChange = async (event: SelectChangeEvent) => {
    const depotId = Number(event.target.value);
    const depot = terminals.find((d: any) => d.id === depotId);
    if (depot) {
      dispatch(setSelectedDepot(depot));
      await dispatch(lookUpAllThings(depot.id));
    }
  };

  return (
    <FormControl
      fullWidth
      sx={{
        maxWidth: '250px',
        backgroundColor: theme.palette.background.paper,
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiSelect-select': {
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing(1),
        },
      }}
      size="small"
    >
      <CustomSelect
        value={selectedDepot?.id || ''}
        onChange={handleChange}
        displayEmpty
        variant="outlined"
        renderValue={() => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconMapPin size={20} />
            <Typography variant="body2">
              {selectedDepot?.name || 'Select Depot'}
            </Typography>
          </Box>
        )}
      >
        {terminals.map((terminal: any) => (
          <MenuItem key={terminal.id} value={terminal.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.light',
                  width: 24,
                  height: 24,
                  color: 'primary.main',
                }}
              >
                <IconMapPin size={16} />
              </Avatar>
              <ListItemText
                primary={terminal.name}
                secondary={`${terminal.location} (${terminal.zipCode})`}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </Box>
          </MenuItem>
        ))}
      </CustomSelect>
    </FormControl>
  );
};

export default Depots;
