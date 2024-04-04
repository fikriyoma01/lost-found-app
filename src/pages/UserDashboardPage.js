import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

export default function UserDashboardPage() {
  const [reports, setReports] = useState([]); // State untuk menyimpan laporan

  // Gunakan useHistory untuk navigasi
  const history = useNavigate();

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    // Opsi: Kirim permintaan ke server untuk menginformasikan logout jika diperlukan
    // fetch('/api/users/logout', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    //   },
    // })
    // .then(() => {
      // Hapus token dari localStorage
      localStorage.removeItem('userToken');
      // Arahkan pengguna ke halaman login atau home
      history.push('/login');
    // });
  };

  useEffect(() => {
    fetch('/lostitems', {
      headers: {
        // Pastikan untuk mengirimkan token atau kredensial jika diperlukan oleh API
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setReports(data); // Simpan laporan ke dalam state
    })
    .catch(error => console.error("There was an error!", error));
  }, []);

  return (
    <Container sx={{ marginTop: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Pengguna
      </Typography>
      <List>
        {reports.map((report, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={report.title} // Misalkan, judul laporan
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {report.description} {/* Deskripsi laporan */}
                  </Typography>
                  {" — "}{report.location} {/* Lokasi kehilangan */}
                </>
              }
            />
            {/* Link untuk melihat detail */}
            <Button component={Link} to={`/report/${report._id}`} sx={{ mr: 1 }}>
              Lihat Detail
            </Button>
            {/* Link untuk mengedit laporan */}
            <Button component={Link} to={`/edit-report/${report._id}`}>
              Edit
            </Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" sx={{ mt: 2 }} component={Link} to='/report'>
        Buat Laporan Kehilangan Baru
      </Button>
      <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
