import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

export default function HeroSection() {
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
          Kehilangan Barang/Kendaraan?
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
        </Box>
      </Container>
    </Box>
  );
}
