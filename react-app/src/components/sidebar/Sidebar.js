import { Box, Drawer, IconButton, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { ChevronLeft } from '@mui/icons-material';
import { useValue } from '../../context/ContextProvider';
import CreateEventForm from '../events/CreateEvent';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { containerRef } = useValue();
  const [latt, setLatt] = useState(null)
  const [long, setLong] = useState(null)
  const [newIdea, setNewIdea] = useState(null)
  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat.toArray();
    setNewIdea({
      lat: latitude,
      long: longitude,
    });
    setLatt(latitude)
    setLong(longitude)
  };
  return (
    <Drawer variant="persistent" hideBackdrop={true} open={isOpen}>
      <DrawerHeader>
        <Typography style={{ fontWeight: '700', fontSize: '24px', marginLeft: "12px" }}>Create Event</Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize="large" />
        </IconButton>
      </DrawerHeader>
      <Box sx={{ width: 240, p: 3 }}>
        <Box ref={containerRef}>
          <div className="create-event-form-wrap">
            <CreateEventForm />
          </div>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
