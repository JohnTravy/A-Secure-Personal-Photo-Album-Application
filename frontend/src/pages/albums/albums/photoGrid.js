/* eslint-disable prettier/prettier */
import { Grid, Card, Tooltip, CardMedia, CardContent, Typography } from '@mui/material';
import { fetchGetDataWithAuth, fetchGetDataWithAuthArrayBuffer } from 'client/client';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Buffer } from 'buffer';
import { fetchDeleteDataWithAuth, fetchGetBlobDataWithAuth } from 'client/client';
import { makeStyles } from '@mui/styles';
import { Modal } from '@mui/material';
import { Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMain: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: '90%',
    maxWidth: '90%',
    overflow: 'auto',
  },

  closeButton: {
    marginLeft: 'auto',
  },
}));

const PhotoGrid = () => {
  const [photos, setPhotos] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const album_id = queryParams.get('id');
  const [albumInfo, setAlbumInfo] = useState({});
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [PhotoContent, setPhotoContent] = useState(null);
  const [PhotoDesc, setPhotoDesc] = useState('');
  const [DownloadLink, setDownloadLink] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const handleView = (download_link, description) => {
    // Handle view logic here
    fetchGetDataWithAuthArrayBuffer(download_link).then(response => {
      const buffer = Buffer.from(response.data, 'binary').toString('base64');
      setPhotoContent(buffer);
    });
    setDownloadLink(download_link);
    setPhotoDesc(description);
    handleOpen();
  };
  
  const handleDownload = (download_link) => {
    console.log(download_link)
    fetchGetBlobDataWithAuth(download_link)
      .then((response) => {
        console.log(response);
        //now lets try and get the filename from the content-disposition header
       const disposition = response.headers['content-disposition'];
        const match = /filename="(.*)"/.exec(disposition);
        const filename = match ? match[1] : 'downloadedFile';
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
    }).catch((error) => {
        console.error('Error downloading file:', error);
    });

  };

  const handleDelete = (photo_id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this photo?');
    if (isConfirmed) {
      console.log('Photo deleted' + photo_id);

      fetchDeleteDataWithAuth(`/album/${album_id}/photos/${photo_id}/delete`)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
    } else {
      console.log('Photo deletion cancelled');
    }
  };

  useEffect(() => {
    fetchGetDataWithAuth(`/album/${album_id}`).then((res) => {
      setAlbumInfo(res.data);
      const photoList = res.data.photos;

      photoList.forEach((photo) => {

        let thumbnail_link = photo.download_link.replace('/download_photo', '/download_thumbnail');
       

        fetchGetDataWithAuthArrayBuffer(thumbnail_link).then((response) => {
          const albumPhotoID = 'album_' + album_id + '_photo' + photo.id;
          const buffer = Buffer.from(response.data, 'binary').toString('base64');

          const temp = {
            album_id,
            photo_id: photo.id,
            name: photo.name,
            description: photo.description,
            content: buffer,
            download_link: photo.download_link
          };

          setPhotos(prev => ({
            ...prev,
            [albumPhotoID]: temp
          }));
        });
      });
    });
  }, [album_id]);

  return (
    <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modal}
      > 

        <div className={classes.modalMain}>
          <img src= {'data:image/jpeg;base64,'+PhotoContent} alt={PhotoDesc} style= {{width: '100%', height: 'auto',}}/>
          <Button onClick={() => handleDownload(DownloadLink)} variant="contained" color="primary" style={{ marginTop: '10px' }}>
          </Button>
        </div>
      </Modal>
      <Typography variant="h4" gutterBottom> {albumInfo.name}</Typography>
      <Typography variant="subtitle1" gutterBottom> {albumInfo.description}</Typography>  
    <Grid container spacing={2}>
      {Object.keys(photos).map(key => (
        <Grid item key={key} xs={8} sm={4} md={4} lg={2}>
          <Card>
            <Tooltip title={photos[key].description}>
              <CardMedia
                component="img"
                height="200"
                image={'data:image/jpeg;base64,' + photos[key].content}
              />
            </Tooltip>
           <a href='#' onClick={() => handleView(photos[key]['download_link'], photos[key]['description'])}>view</a>{"  | "}
           <a href= {`/photo/edit?album_id=${album_id}&photo_id=${photos[key]['photo_id']}&photo_name=${photos[key]['name']}&photo_desc=${photos[key]['description']}`}>Edit</a>{"  | "}
           <a href='#' onClick={()=> handleDownload(photos[key]['download_link'])}>Download</a>{"  | "}
           <a href="#" onClick={() => handleDelete(photos[key]['photo_id'])}>delete</a>

            <CardContent>
              <Typography variant="subtitle1">
                {photos[key].name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
  );
}

export default PhotoGrid;
