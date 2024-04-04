import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, Container, MenuItem } from '@mui/material';
import * as Yup from 'yup';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 3 }}>
      <Formik
        initialValues={{
          itemType: '',
          description: '',
          location: '',
          timeLost: null,
          contactInfo: '',
        }}
        validationSchema={ReportLossSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // Endpoint API untuk menambahkan laporan kehilangan baru
          const endpoint = '/lostitems/add';
          // Opsi fetch untuk permintaan POST
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          };
        
          // Membuat permintaan ke server
          fetch(endpoint, options)
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              alert('Laporan berhasil dikirim!');
              resetForm();
            })
            .catch((error) => {
              console.error('Error:', error);
              alert('Terjadi kesalahan, laporan gagal dikirim.');
            })
            .finally(() => {
              setSubmitting(false); // Hentikan status submitting
            });
        }}
        
      >
        {({ errors, touched, handleChange, handleBlur, setFieldValue, values }) => (
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Laporkan Kehilangan
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
