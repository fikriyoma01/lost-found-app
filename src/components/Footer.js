import React from 'react';
import { Typography, Link, Container } from '@mui/material';

export default function Footer() {
  return (
    <footer sx={{ py: 6, mt: 'auto', backgroundColor: 'primary.main', color: 'common.white' }}>
      <Container maxWidth="lg">
        <Typography variant="body1">Aplikasi Pendataan Barang dan Kendaraan Hilang.</Typography>
        <Typography variant="body2" align="center" sx={{ pt: 2 }}>
          {'© '}
          <Link color="inherit" href="https://yourwebsite.com/">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </footer>
  );
}
