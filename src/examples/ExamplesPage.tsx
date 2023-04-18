import { Button, Card, Stack, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import OneClickLogin from './login';
import Highlights from './highlights';

const ExamplesPage = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack
      alignItems="center"
      sx={{
        width: '100%',
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #5865F2 0%, rgba(88, 101, 242, 0) 100%), #0C0619',
      }}
    >
      <Card
        sx={{
          width: '50%',
          minHeight: 500,
          mt: '80px',
          p: 3,
          borderRadius: '16px',
          backgroundColor: '#1C1330',
        }}
      >
        <Stack
          sx={{ width: '100%', height: '100%' }}
          alignItems={'center'}
          justifyContent={'space-around'}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Login" sx={{ textTransform: 'capitalize' }} />
            <Tab label="Highlights" sx={{ textTransform: 'capitalize' }} />
          </Tabs>
          {value === 0 && <OneClickLogin />}
          {value === 1 && <Highlights />}
        </Stack>
      </Card>
    </Stack>
  );
};

export default ExamplesPage;
