import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, Container } from '@mui/material';
import * as Yup from 'yup';

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required('Nama lengkap diperlukan'),
  email: Yup.string().email('Email tidak valid').required('Email diperlukan'),
  password: Yup.string().min(8, 'Kata sandi terlalu pendek - harus 8 karakter atau lebih').required('Kata sandi diperlukan'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Kata sandi tidak cocok').required('Konfirmasi kata sandi diperlukan'),
});

export default function RegistrationPage() {
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 3 }}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={RegistrationSchema}
        onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
          const { confirmPassword, ...dataToSend } = values;
          fetch('/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            if (data.success) {
              alert('Pendaftaran berhasil!');
              resetForm();
            } else {
              setErrors({ server: data.message });
              alert(`Pendaftaran gagal: ${data.message}`);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('Gagal mendaftar. Silakan coba lagi.');
          })
          .finally(() => setSubmitting(false));
        }}
      >
        {({ errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Field as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Nama Lengkap"
              name="name"
              autoComplete="name"
              autoFocus
              helperText={touched.name && errors.name}
              error={touched.name && Boolean(errors.name)}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ mb: 2 }}
            />
            <Field as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Alamat Email"
              name="email"
              autoComplete="email"
              helperText={touched.email && errors.email}
              error={touched.email && Boolean(errors.email)}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ mb: 2 }}
            />
            <Field as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Kata Sandi"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={touched.password && errors.password}
              error={touched.password && Boolean(errors.password)}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ mb: 2 }}
            />
            <Field as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="Konfirmasi Kata Sandi"
              type="password"
              id="confirmPassword"
              helperText={touched.confirmPassword && errors.confirmPassword}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Daftar
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
