import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';

const SamplePage = () => {
  return (
    <MainCard title="About This Application">
      <Typography variant="body2">This application is designed to manage and showcase a collection of albums.</Typography>
    </MainCard>
  );
};

export default SamplePage;
