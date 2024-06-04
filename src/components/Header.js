import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

export default function Header() {
  const isUserLoggedIn = Boolean(localStorage.getItem('userToken')); // or your authentication check

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Aplikasi Pendataan Barang dan Kendaraan Hilang
        </Typography>
        <Button color="inherit" component={Link} to="/">Beranda</Button>
        <Button color="inherit" component={Link} to="/register">Daftar</Button>
        {!isUserLoggedIn && <Button color="inherit" component={Link} to="/login">Masuk</Button>}
        <Button color="inherit" component={Link} to="/search">Cari</Button>
        {isUserLoggedIn && (
          <>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <Button color="inherit" component={Link} to="/claimed">Klaim Saya</Button> {/* Button baru */}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
