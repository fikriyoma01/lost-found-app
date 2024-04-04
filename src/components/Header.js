import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Aplikasi Pendataan Barang dan Kendaraan Hilang
        </Typography>
        <Button color="inherit" component={Link} to="/">Beranda</Button>
        <Button color="inherit" component={Link} to="/register">Daftar</Button>
        <Button color="inherit" component={Link} to="/login">Masuk</Button>
        <Button color="inherit" component={Link} to="/search">Cari</Button>
        {/* Tampilkan ini hanya jika pengguna telah masuk */}
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
      </Toolbar>
    </AppBar>
  );
}
