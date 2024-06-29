import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, CardActions, Grid, Box, CircularProgress } from '@mui/material';
import ClaimIcon from '@mui/icons-material/HowToReg';

export default function UserDashboardPage() {
  const [reports, setReports] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        console.log('Fetching data with token:', token);
        
        // Fetch notifications
        const notificationsResponse = await fetch('/api/notifications', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!notificationsResponse.ok) {
          throw new Error(`HTTP error! status: ${notificationsResponse.status}`);
        }
        
        const notificationsData = await notificationsResponse.json();
        console.log('Notifications received:', notificationsData);
        setNotifications(Array.isArray(notificationsData) ? notificationsData : []);

        // Fetch lost items reports
        const reportsResponse = await fetch('/lostitems', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!reportsResponse.ok) {
          throw new Error(`HTTP error! status: ${reportsResponse.status}`);
        }

        const reportsData = await reportsResponse.json();
        console.log('Lost items reports received:', reportsData);
        setReports(Array.isArray(reportsData) ? reportsData : []);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const claimItem = (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Anda harus login untuk mengklaim barang.');
      navigate('/login');
      return;
    }
  
    fetch(`http://localhost:5000/founditems/claim/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })
    .then(async response => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(data => {
          if (!response.ok) throw new Error(data.message || 'Failed to claim item');
          return data;
        });
      } else {
        return response.text().then(text => {
          if (!response.ok) throw new Error(text || 'Failed to claim item');
          return { message: text };
        });
      }
    })
    .then(data => {
      alert(data.message || 'Barang berhasil diklaim. Cek email Anda untuk detail lebih lanjut.');
      navigate('/dashboard');
    })
    .catch(error => {
      console.error('Error claiming item:', error);
      if (error.message === 'Invalid token' || error.message === 'Token expired') {
        alert('Sesi Anda telah berakhir. Silakan login kembali.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        alert(`Gagal mengklaim barang: ${error.message}`);
      }
    });
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to mark notification as read');
      
      setNotifications(prevNotifications => 
        prevNotifications.map(notif => 
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
      alert('Failed to mark notification as read. Please try again.');
    }
  };

  if (isLoading) return <Typography>Loading notifications...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  // Render komponen
  return (
    <Container sx={{ marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Pengguna - Selamat Datang, {userInfo.name}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>Notifikasi</Typography>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <Card key={index} sx={{ mb: 2, backgroundColor: notification.isRead ? 'white' : '#e3f2fd' }}>
              <CardContent>
                <Typography>{notification.message}</Typography>
                <Typography variant="caption">{new Date(notification.createdAt).toLocaleString()}</Typography>
              </CardContent>
              {!notification.isRead && (
                <CardActions>
                  <Button size="small" onClick={() => markNotificationAsRead(notification._id)}>
                    Tandai Sudah Dibaca
                  </Button>
                </CardActions>
              )}
            </Card>
          ))
        ) : (
          <Typography>Tidak ada notifikasi baru.</Typography>
        )}
      </Box>

      <Typography variant="h5" gutterBottom>Laporan Kehilangan</Typography>
      {reports.length > 0 ? (
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
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Tidak ada laporan kehilangan saat ini.</Typography>
      )}

      <Button variant="contained" color="primary" sx={{ mt: 2 }} component={Link} to='/report'>
        Buat Laporan Kehilangan Baru
      </Button>
      <Button variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }} onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
