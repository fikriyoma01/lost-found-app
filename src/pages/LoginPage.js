import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom'; // Impor useHistory untuk navigasi
import { Container, TextField, Button } from '@mui/material';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate(); // Untuk navigasi setelah login berhasil

  const handleSubmit = (event) => {
    event.preventDefault();
    const userCredentials = { email, password };

    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    })
    .then(response => {
      console.log(response.status); // Tambahkan ini untuk memeriksa status code
      if (!response.ok) {
        response.text().then(text => console.log(text)); // Ini akan menampilkan badan respons jika ada
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.token) {
        // Simpan token ke localStorage atau sesuai kebutuhan Anda
        localStorage.setItem('userToken', data.token);
        alert('Login berhasil!');
        // Redirect pengguna atau ubah state aplikasi, misalnya ke dashboard
        history.push('/dashboard'); // Sesuaikan dengan path yang diinginkan setelah login
      } else {
        // Handle jika respons tidak mengandung token
        alert('Login gagal: ' + (data.message || 'Tidak ada token'));
      }
    })
    .catch((error) => {
      // Tangkap error baik dari network atau server-side
      alert('Login gagal: ' + error.message);
      console.error('Error:', error);
    });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 8 }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Masuk
        </Button>
      </form>
    </Container>
  );
}
