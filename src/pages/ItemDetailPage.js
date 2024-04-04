import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

export default function ItemDetailPage() {
  const { id } = useParams(); // Mendapatkan ID dari URL
  const [itemDetail, setItemDetail] = useState(null); // State untuk menyimpan data item

  useEffect(() => {
    // Fungsi untuk mengambil data item dari server
    const fetchData = async () => {
      try {
        const response = await fetch(`/lostitems/${id}`); // Ganti URL sesuai endpoint API Anda
        const data = await response.json();
        setItemDetail(data); // Memperbarui state dengan data yang diambil
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [id]); // Dependency array dengan `id` untuk menjalankan efek ini setiap kali ID berubah

  // Menampilkan loader atau pesan saat data sedang dimuat atau belum tersedia
  if (!itemDetail) {
    return <Container sx={{ marginTop: 8 }}>Loading...</Container>;
  }

  return (
    <Container sx={{ marginTop: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {itemDetail.title}
      </Typography>
      <Typography variant="body1" paragraph>
        Deskripsi: {itemDetail.description}
      </Typography>
      <Typography variant="body1" paragraph>
        Lokasi: {itemDetail.location}
      </Typography>
      <Typography variant="body1">
        Waktu Kehilangan: {itemDetail.timeLost}
      </Typography>
    </Container>
  );
}
