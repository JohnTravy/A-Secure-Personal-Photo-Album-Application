import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { fetchPostDataWithAuth } from 'client/client';
import { useNavigate } from 'react-router-dom';

const AddAlbumsForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');

    if (!isLoggedIn) {
      navigate('/login');
      window.location.reload();
    }
  });

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const [errors, setError] = useState({
    name: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    const newErrors = { name: '', description: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    setError(newErrors);

    //if form is valid u can proceed with further actions

    if (isValid) {
      const payload = {
        name: formData.name,
        description: formData.description
      };

      fetchPostDataWithAuth('/album/add', payload)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error('Login error', error);
        });
      console.log('Form submitted:');
      navigate('/');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        error={!!errors.name}
        helperText={errors.name}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        error={!!errors.description}
        helperText={errors.description}
        multiline
        rows={4}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        add Album
      </Button>
    </form>
  );
};

export default AddAlbumsForm;
