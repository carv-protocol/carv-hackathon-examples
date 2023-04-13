import { Avatar, Button, Card, Dialog, Stack, Typography } from '@mui/material';
import connectMetamask from 'src/auth/connectMetamask';
import { data } from './mock';
import { useState } from 'react';
import SvgIcon from 'src/components/svg-Icon';

const OneClickLogin = () => {
  const { avatar, unique_nickname } = data;
  const [open, setOpen] = useState(false);

  const CarvLogin = async () => {
    const loginParams = await connectMetamask();

    fetch(`https://api.carv.io/auth/login`, {
      method: 'POST',
      body: JSON.stringify(loginParams),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log('res:', res);
      });
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          textTransform: 'capitalize',
          color: 'grey.50',
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        One-click login
      </Button>
      <Dialog open={open} onClose={onClose}>
        <Card sx={{ p: 3, width: 280 }}>
          <Typography variant="h5">Log in</Typography>
          <Stack spacing={2} sx={{ mt: 3 }}>
            {/* <Avatar src={avatar} />
        <Stack sx={{ ml: 1 }}>
          <Typography variant="subtitle2">{unique_nickname}</Typography>
          <Typography variant="body2" sx={{mt:'auto'}}>{unique_nickname}</Typography>
        </Stack> */}

            <Button
              startIcon={<SvgIcon icon="svg-metamask" />}
              onClick={CarvLogin}
              variant="outlined"
              sx={{
                textTransform: 'capitalize',
                color: 'grey.50',
              }}
            >
              Wallet login
            </Button>
            <Button
              startIcon={<SvgIcon icon="svg-twitter" />}
              onClick={CarvLogin}
              variant="outlined"
              sx={{
                textTransform: 'capitalize',
                color: 'grey.50',
              }}
            >
              Twitter login
            </Button>
            <Button
              startIcon={<SvgIcon icon="svg-discord" />}
              onClick={CarvLogin}
              variant="outlined"
              sx={{
                textTransform: 'capitalize',
                color: 'grey.50',
              }}
            >
              Discord login
            </Button>
          </Stack>
        </Card>
      </Dialog>
    </>
  );
};

export default OneClickLogin;
