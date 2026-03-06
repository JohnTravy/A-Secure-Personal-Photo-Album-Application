import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent } from '@mui/material';
import { fetchGetDataWithAuth } from 'client/client';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BrightPopColors = [
  '#FF33A8',
  '#FF8F33',
  '#33FFF3',
  '#A8FF33',
  '#FF3333',
  '#33A8FF',
  '#B833FF',
  '#FF33E6',
  '#33FF8F',
  '#FFD433',
  '#FF6F91',
  '#6FFF33',
  '#33FFCC',
  '#FF3380',
  '#8FFF33',
  '#3380FF',
  '#FFB833',
  '#5D33FF',
  '#33FF57',
  '#FF335D'
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * BrightPopColors.length);
  return BrightPopColors[randomIndex];
};

const AlbumDynamicGridPage = () => {
  const [dataArray, setDataArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
      navigate('/login');
      window.location.reload();
    }

    fetchGetDataWithAuth('/album/loalbums').then((res) => {
      if (!res) return;
      setDataArray(res.data);
      console.log('dataArray:', dataArray);
    });
  });

  return (
    <Grid container spacing={2}>
      {dataArray.map((data, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Link to={`/album/show?id=${data.id}`}>
            <Card
              sx={{
                backgroundColor: getRandomColor(),
                textAlign: 'center',
                p: 3,
                borderRadius: 2,
                height: 250,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <CardContent>
                <h1 style={{ fontSize: '2rem', margin: 0, color: 'white' }}>{data.name}</h1>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default AlbumDynamicGridPage;
