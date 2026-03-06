import React, { useState } from 'react';
import Header from './albums/header';
import { Box, Button, Container, Grid, Paper, Typography, IconButton, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AddCircleOutline, Close } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchPostFileUploadWithAuth } from 'client/client';

const useStyles = makeStyles((theme) => ({
  dropzoneContainer: {
    border: `2px dashed #eee ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      borderColor: theme.palette.primary.main
    }
  },
  dropzone: {
    minHeight: '200px',
    padding: theme.spacing(2),
    border: '2px dashed #eee',
    borderRadius: '5px',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      borderColor: theme.palette.primary.main
    }
  },
  uploadedFile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    border: ` 1px solid ${theme.palette.secondary.main}`,
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  }
}));

const FileUploadPage = () => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    try {
      setProcessing(true);
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      fetchPostFileUploadWithAuth('/album/' + id + '/upload_photos', formData).then((res) => {
        navigate('/album/show?id=' + id);
        console.log('Upload successful:', res.data);
        setFiles([]);
      });
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom>
                Photo Upload
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Paper elevation={3} className={classes.dropzoneContainer}>
                  <AddCircleOutline fontSize="large" color="primary" />
                  <Typography variant="h6" color="textSecondary">
                    Drag & drop your photos here, or click to select files
                  </Typography>
                </Paper>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Box>
                {files.map((file, index) => (
                  <Paper key={index} elevation={3} className={classes.uploadedFile}>
                    <Typography>{file.name}</Typography>
                    <IconButton onClick={() => removeFile(index)} color="secondary">
                      <Close />
                    </IconButton>
                  </Paper>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              {processing ? (
                <Box textAlign="center">
                  <CircularProgress />
                  <Typography variant="body2" color="textSecondary" marginTop="10px">
                    Uploading photos, Chill.......
                  </Typography>
                </Box>
              ) : (
                <Button variant="contained" color="primary" onClick={handleUpload} disabled={files.length === 0}>
                  Upload Photos
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default FileUploadPage;
