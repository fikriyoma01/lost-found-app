import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom'; // Impor useHistory untuk navigasi
import { Container, TextField, Button } from '@mui/material';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Untuk navigasi setelah login berhasil

  const handleSubmit = (event) => {
    event.preventDefault();
    const userCredentials = { email, password };
    console.log('Sending these credentials:', userCredentials);

    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
    'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials),
    })
    .then(response => {
      console.log('Response status:', response.status);
  if (!response.ok) {
    response.text().then(text => {
      console.log('Server response text:', text); // Log ini akan menunjukkan HTML atau teks yang sebenarnya dari respons
      throw new Error('Network response was not ok');
    });
  }
  return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.token && data.user) { // Pastikan ada pengecekan token yang valid
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userInfo', JSON.stringify(data.user)); // Pastikan data.user ada dan berisi data yang benar
        alert('Login berhasil!');
        navigate('/dashboard');
      } else {
        // Handle jika respons tidak mengandung token
        alert('Login status: ' + (data.message || 'Tidak ada token'));
      }
    })
    .catch((error) => {
      // Tangkap error baik dari network atau server-side
      console.error('Login error:', error);
  alert('Login status: ' + error.message);
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
