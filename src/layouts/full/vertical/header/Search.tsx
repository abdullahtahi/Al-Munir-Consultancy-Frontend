import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useState } from 'react';

const Search = () => {
  // drawer top
  const [showDrawer2, setShowDrawer2] = useState(false);
  const [search, setSerach] = useState('');

  const handleDrawerClose2 = () => {
    setShowDrawer2(false);
  };

  return (<>
    <IconButton
      aria-label="show 4 new mails"
      color="inherit"
      aria-controls="search-menu"
      aria-haspopup="true"
      onClick={() => setShowDrawer2(true)}
      size="large"
    >
      <IconSearch size="16" />
    </IconButton>
    <Dialog
      open={showDrawer2}
      onClose={() => setShowDrawer2(false)}
      fullWidth
      maxWidth={'sm'}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slotProps={{
        paper: {
          sx: { position: 'fixed', top: 30, m: 0 }
        }
      }}
    >
      <DialogContent className="testdialog">
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            id="tb-search"
            placeholder="Search here"
            fullWidth
            onChange={(e) => setSerach(e.target.value)}
            slotProps={{
              htmlInput: { 'aria-label': 'Search here' }
            }}
          />
          <IconButton size="small" onClick={handleDrawerClose2}>
            <IconX size="18" />
          </IconButton>
        </Stack>
      </DialogContent>
      <Divider />
      <Box p={2} sx={{ maxHeight: '60vh', overflow: 'auto' }}>
        <Typography variant="h5" p={1}>
          Quick Page Links
        </Typography>
      </Box>
    </Dialog>
  </>);
};

export default Search;
