import { Avatar, Button, Card, Dialog, Stack, Typography } from '@mui/material';
import connectMetamask from 'src/auth/connectMetamask';
import { useEffect, useState } from 'react';
import SvgIcon from 'src/components/svg-Icon';
import { toast } from 'react-toastify';
import UnsignUserDialog from './UnsignUserDialog';

export const BACKEND_API = 'https://api.carv.io';

const auth_channel = new BroadcastChannel('auth');

const OneClickLogin = () => {
  const [profile, setProfile] = useState<any>(null);
  const [clientId, setClientId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    auth_channel.onmessage = async function (e) {
      const data = e.data;
      const res = e.data.response;

      onClose();
      onUnsignUserDialogClose();

      console.log('channel res:', res);
      if (data.type === 'openLinkResponse') {
        if (res.code !== 0) {
          toast.error(res.msg);
        }
      }
      if (data.type === 'tokenLoginResponse') {
        if (res.code === 0) {
          setProfile(res.data);
        } else if (res.code === 2040) {
          const client_id = res.data.client_id;
          if (client_id) {
            setClientId(client_id);
          } else {
            toast.error('client_id is empty');
          }
        } else {
          toast.error(res.msg);
        }
      }
      if (
        ['createNewAccountResponse', 'walletLoginResponse'].includes(data.type)
      ) {
        if (res.code === 0) {
          setProfile(res.data);
        } else {
          toast.error(res.msg);
        }
      }
    };
    return () => {
      auth_channel.onmessage = null;
    };
  }, []);

  const carvLogin = async () => {
    console.log('carvLogin');
    const loginParams = await connectMetamask();

    const event = new CustomEvent('requestWalletLogin', {
      detail: loginParams,
    });
    document.dispatchEvent(event);
  };
  const onClose = () => {
    setOpen(false);
  };

  const list = [
    {
      label: 'user_id',
      value: profile?.user_id || '',
    },
    {
      label: 'twitter_nickname',
      value: profile?.twitter?.name || '',
    },
    {
      label: 'discord_nickname',
      value: profile?.discord?.username || '',
    },
  ];

  const twitterLogin = async () => {
    const event = new CustomEvent('requestOpenLink', {
      detail: 'twitter',
    });
    document.dispatchEvent(event);
  };
  const discordLogin = async () => {
    const event = new CustomEvent('requestOpenLink', {
      detail: 'discord',
    });
    document.dispatchEvent(event);
  };

  const onUnsignUserDialogClose = () => {
    setClientId(null);
  };
  return (
    <>
      <UnsignUserDialog
        clientId={clientId}
        onClose={onUnsignUserDialogClose}
        setProfile={setProfile}
      />
      <Stack sx={{ mt: 5 }}>
        {profile ? (
          <>
            <Stack flexDirection={'row'} alignItems={'center'}>
              <Avatar src={profile?.avatar} />
              <Stack sx={{ ml: 1 }}>
                <Typography variant="subtitle2">
                  {profile?.unique_nickname}
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={1} sx={{ mt: 2 }}>
              {list.map(item => {
                return (
                  <Stack
                    key={item.value}
                    flexDirection={'row'}
                    alignItems={'center'}
                    gap={2}
                  >
                    <Typography variant="subtitle1" color={'grey.500'}>
                      {item.label}
                    </Typography>
                    <Typography variant="body1">{item.value}</Typography>
                  </Stack>
                );
              })}
            </Stack>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                textTransform: 'capitalize',
                color: 'grey.50',
              }}
              onClick={() => {
                setProfile(null);
              }}
            >
              Log out
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            sx={{
              mt: 3,
              textTransform: 'capitalize',
              color: 'grey.50',
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            login
          </Button>
        )}
      </Stack>
      <Dialog open={open} onClose={onClose}>
        <Card sx={{ p: 3, width: 280 }}>
          <Typography variant="h5">Log in</Typography>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Button
              startIcon={<SvgIcon icon="svg-metamask" />}
              onClick={carvLogin}
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
              onClick={twitterLogin}
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
              onClick={discordLogin}
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
