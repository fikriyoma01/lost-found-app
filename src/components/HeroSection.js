import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function HeroSection() {
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.ok) {
          const data = await response.json();
          setUnreadNotifications(data.filter(notif => !notif.isRead).length);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (localStorage.getItem('token')) {
      fetchNotifications();
      const intervalId = setInterval(fetchNotifications, 60000); // Check every minute
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/background-2.jpg')`,
        backgroundSize: 'cover',
        padding: 8,
        color: 'common.white',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" gutterBottom>
          Kehilangan Barang/Kendaraan di ITS?
        </Typography>
        <Typography variant="h5" paragraph>
          Laporkan sekarang atau temukan barang dan kendaraan hilang di sini.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button variant="contained" color="primary" sx={{ mr: 1 }} component={Link} to='/report'>
            Laporkan Kehilangan
          </Button>
          <Button variant="outlined" color="inherit" component={Link} to="/search">
            Cari Barang/Kendaraan
          </Button>
          {localStorage.getItem('token') && (
            <Badge badgeContent={unreadNotifications} color="error">
              <Button variant="contained" color="secondary" component={Link} to="/dashboard">
                <NotificationsIcon />
              </Button>
            </Badge>
          )}
        </Box>
      </Container>
    </Box>
  );
}