import React, { useState } from 'react';
import { Container, TextField, Button } from '@mui/material';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]); // Menambahkan state untuk menyimpan hasil pencarian

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/lostitems/search?query=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setItems(data); // Memperbarui state dengan hasil pencarian
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 3 }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="search"
          label="Search for lost items or vehicles..."
          name="search"
          autoComplete="off"
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Search
        </Button>
      </form>
      {/* Menampilkan hasil pencarian */}
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.description} - {item.location}</li>
        ))}
      </ul>
    </Container>
  );
}
