import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, CardActions, Grid, Box } from '@mui/material';
import ClaimIcon from '@mui/icons-material/HowToReg';

export default function UserDashboardPage() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  useEffect(() => {
    // Ambil daftar laporan kehilangan atau barang yang ditemukan
    fetch('/lostitems', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }
    })
    .then(response => response.json())
    .then(data => setReports(data))
    .catch(error => console.error("Error fetching data:", error));
  }, []);

  const claimItem = (itemId) => {
    fetch(`http://localhost:5000/founditems/claim/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}` 
      },
      credentials: 'include',
      body: JSON.stringify({ userId: localStorage.getItem('userId') })
    })
    .then(response => {
      if (!response.ok) throw new Error('Failed to claim item');
      alert('Barang berhasil diklaim. Cek email Anda untuk detail lebih lanjut.');
      navigate('/dashboard'); // Refresh atau navigasi ke halaman yang sesuai
    })
    .catch(error => {
      console.error('Error claiming item:', error);
      alert('Gagal mengklaim barang. Silakan coba lagi.');
    });
  };

  // Render komponen
  return (
    <Container sx={{ marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Pengguna - Selamat Datang, {userInfo.name}
      </Typography>
      <Grid container spacing={2}>
        {reports.map((report, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">Jenis Item: {report.itemType}</Typography>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2">Deskripsi: {report.description}</Typography>
                  <Typography variant="body2">Lokasi: {report.location}</Typography>
                  <Typography variant="body2">Kontak: {report.contactInfo}</Typography>
                  <Typography variant="body2">Waktu Kehilangan: {new Date(report.timeLost).toLocaleString()}</Typography>
                </Box>
              </CardContent>
              <CardActions disableSpacing>
                <Button startIcon={<ClaimIcon />} variant="contained" color="primary" onClick={() => claimItem(report._id)}>
                  Klaim Barang Ini
                </Button>
                {/* Tambahkan tombol lain jika diperlukan */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" sx={{ mt: 2 }} component={Link} to='/report'>
        Buat Laporan Kehilangan Baru
      </Button>
      <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
