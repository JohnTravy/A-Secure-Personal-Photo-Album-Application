import React from 'react';
import { Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { fetchDeleteDataWithAuth } from 'client/client';

const Header = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const handleDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this album?');
    if (isConfirmed) {
      console.log('Album deleted' + id);
      fetchDeleteDataWithAuth(`/album/${id}/delete`).then((res) => {
        console.log(res.data);
        window.location.href = '/';
      });
    } else {
      console.log('Album deletion cancelled');
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Photo Gallery
        </Typography>

        <Button
          component={Link}
          to={`/album/edit?id=${id}`}
          color="inherit"
          variant="contained"
          sx={{ mr: 2, backgroundColor: '#799edc', '&:hover': { backgroundColor: '#5a7ab6' } }}
        >
          Edit Albums
        </Button>

        <Button
          component={Link}
          to={`/album/upload?id=${id}`}
          color="inherit"
          variant="contained"
          sx={{ mr: 2, backgroundColor: '#79dc92ff', '&:hover': { backgroundColor: '#5a7ab6' } }}
        >
          Upload Photos
        </Button>

        <Button
          onClick={handleDelete}
          color="inherit"
          variant="contained"
          sx={{ mr: 2, backgroundColor: '#dc7979ff', '&:hover': { backgroundColor: '#5a7ab6' } }}
        >
          Delete Albums
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
