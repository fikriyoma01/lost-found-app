import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function ClaimedItemsPage() {
  const [claimedItems, setClaimedItems] = useState([]);
  const userId = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))._id : null;

  useEffect(() => {
    // Ganti dengan endpoint API yang benar untuk mengambil item-item yang telah diklaim oleh pengguna
    fetch(`http://localhost:5000/founditems/claimeditems/${userId}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }
    })
    .then(response => response.json())
    .then(data => setClaimedItems(data))
    .catch(error => console.error("Error fetching claimed items:", error));
  }, [userId]);

  return (
    <Container sx={{ marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>
        Item Klaim Saya
      </Typography>
      <List>
        {claimedItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Jenis Item: ${item.itemType}`}
              secondary={`Deskripsi: ${item.description}, Diklaim pada: ${new Date(item.createdAt).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
