import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, Container, MenuItem, Typography } from '@mui/material';
import * as Yup from 'yup';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';

const itemTypes = [
  { value: 'elektronik', label: 'Elektronik' },
  { value: 'kendaraan', label: 'Kendaraan' },
  { value: 'pribadi', label: 'Barang Pribadi' },
  { value: 'lainnya', label: 'Lainnya' },
];

const ReportLossSchema = Yup.object().shape({
  itemType: Yup.string().required('Jenis barang/kendaraan diperlukan'),
  description: Yup.string().required('Deskripsi diperlukan'),
  location: Yup.string().required('Lokasi kehilangan diperlukan'),
  timeLost: Yup.date().required('Waktu kehilangan diperlukan').nullable(),
  contactInfo: Yup.string().required('Informasi kontak diperlukan'),
});

export default function ReportLossPage() {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Laporkan Kehilangan
      </Typography>
      <Formik
        initialValues={{
          itemType: '',
          description: '',
          location: '',
          timeLost: null,
          contactInfo: '',
        }}
        validationSchema={ReportLossSchema}
        onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
          const userInfo = JSON.parse(localStorage.getItem('userInfo'));
          if (!userInfo || !userInfo._id) {
            alert('Anda harus login untuk melaporkan kehilangan.');
            navigate('/login');
            return;
          }

          const reportData = {
            ...values,
            reportedBy: userInfo._id,
          };

          fetch('/lostitems/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(reportData),
          })
            .then(response => {
              if (!response.ok) {
                return response.json().then(err => {
                  throw new Error(err.message || 'Terjadi kesalahan saat mengirim laporan.');
                });
              }
              return response.json();
            })
            .then(data => {
              console.log('Success:', data);
              alert('Laporan berhasil dikirim!');
              resetForm();
              navigate('/dashboard');
            })
            .catch((error) => {
              console.error('Error:', error);
              setErrors({ submit: error.message });
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ errors, touched, handleChange, handleBlur, setFieldValue, values, isSubmitting }) => (
          <Form>
            <Field as={TextField}
              select
              variant="outlined"
              margin="normal"
              fullWidth
              id="itemType"
              label="Jenis Barang/Kendaraan"
              name="itemType"
              helperText={touched.itemType && errors.itemType}
              error={touched.itemType && Boolean(errors.itemType)}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ mb: 2 }}
            >
              {itemTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field>
            <Field as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              id="description"
              label="Deskripsi"
              name="description"
              multiline
              rows={4}
              helperText={touched.description && errors.description}
              error={touched.description && Boolean(errors.description)}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ mb: 2 }}
            />
            <Field as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              id="location"
              label="Lokasi Kehilangan"
              name="location"
              helperText={touched.location && errors.location}
              error={touched.location && Boolean(errors.location)}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ mb: 2 }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                label="Waktu Kehilangan"
                inputFormat="dd/MM/yyyy HH:mm"
                value={values.timeLost}
                onChange={(value) => setFieldValue('timeLost', value)}
                renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
              />
            </LocalizationProvider>
            <Field as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              id="contactInfo"
              label="Informasi Kontak"
              name="contactInfo"
              helperText={touched.contactInfo && errors.contactInfo}
              error={touched.contactInfo && Boolean(errors.contactInfo)}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ mb: 2 }}
            />
          {errors.submit && (
              <Typography color="error" sx={{ mt: 2 }}>
                {errors.submit}
              </Typography>
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ mt: 3 }}
            >
              {isSubmitting ? 'Mengirim...' : 'Laporkan Kehilangan'}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
