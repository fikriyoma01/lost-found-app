import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid } from '@mui/material';

const features = [
  { title: "Laporkan Kehilangan", description: "Deskripsi singkat fitur 1." },
  { title: "Cari Barang/Kendaraan", description: "Deskripsi singkat fitur 2." },
  { title: "Inventarisasi Temuan", description: "Deskripsi singkat fitur 3." },
];

export default function FeatureCards() {
  return (
    <Grid container spacing={4} sx={{ mt: 4, justifyContent: 'center' }}>
      {features.map((feature, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: 275, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {feature.title}
              </Typography>
              <Typography color="textSecondary">
                {feature.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button size="small">Pelajari lebih lanjut</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
