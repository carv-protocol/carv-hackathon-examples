import { Avatar, Button, Card, Dialog, Stack, Typography } from '@mui/material';
import connectMetamask from 'src/auth/connectMetamask';
import { useEffect, useState } from 'react';
import SvgIcon from 'src/components/svg-Icon';
import { fetchGet, fetchPost } from 'src/utils/fetch';
import { toast } from 'react-toastify';
import { bc_auth } from 'src/auth/AuthPage';
import UnsignUserDialog from './UnsignUserDialog';

export const BACKEND_API = 'https://api-dev.carv.io';

const OneClickLogin = () => {
  const [data, setData] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [clientId, setClientId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    bc_auth.onmessage = async function (e) {
      const res = e.data;
      console.log('res:', res);
      if (res.code === 0) {
        const token = res.data.token;

        if (token) {
          fetchGet(`${BACKEND_API}/users/profile?user_id=me`, {
            headers: {
              authorization: token,
            },
          }).then(profile => {
            setProfile(profile);
          });
        } else {
          toast.error('Token is empty');
        }
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
    };
    return () => {
      bc_auth.onmessage = null;
    };
  }, []);

  const carvLogin = async () => {
    const loginParams = await connectMetamask();

    fetchPost(`${BACKEND_API}/auth/login`, loginParams)
      .then(res => {
        if (res.code === 0) {
          setData(res.data);
        } else {
          toast.error(res.msg);
        }
      })
      .finally(onClose);
  };
  const onClose = () => {
    setOpen(false);
  };

  const list = [
    {
      label: 'user_id',
      value: data?.user_id || profile?.user_id || '',
    },
    {
      label: 'twitter_nickname',
      value: data?.twitter_nickname || profile?.twitter?.name || '',
    },
    {
      label: 'discord_nickname',
      value: data?.discord_nickname || profile?.discord?.username || '',
    },
  ];

  const twitterLogin = async () => {
    const openLink = await fetchGet(
      `${BACKEND_API}/community/twitter/login/authorization?redirect=${location.origin}/auth`
    );
    setOpen(false);
    window.open(
      openLink as string,
      'intent',
      `resizable=yes,toolbar=no,location=yes,width=600,height=760,left=50,top=50`
    );
  };

  const onUnsignUserDialogClose = () => {
    setClientId(null);
  };
  return (
    <>
      <UnsignUserDialog
        clientId={clientId}
        onClose={onUnsignUserDialogClose}
        setData={setData}
        setProfile={setProfile}
      />
      <Stack sx={{ mt: 5 }}>
        {data ? (
          <>
            <Stack flexDirection={'row'} alignItems={'center'}>
              <Avatar src={data.avatar} />
              <Stack sx={{ ml: 1 }}>
                <Typography variant="subtitle2">
                  {data.unique_nickname}
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
                setData(null);
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
              onClick={carvLogin}
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
