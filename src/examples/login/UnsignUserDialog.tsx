import { Button, Card, Dialog, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import connectMetamask from 'src/auth/connectMetamask';
import { BACKEND_API } from '.';
import { fetchGet, fetchPost } from 'src/utils/fetch';

interface IUnsignUserDialogProps {
  clientId: number | null;
  onClose: () => void;
  setProfile: (profile: any) => void;
}

const UnsignUserDialog = (props: IUnsignUserDialogProps) => {
  const { clientId, onClose, setProfile } = props;

  const createNewAccount = () => {
    const event = new CustomEvent('requestCreateNewAccount', {
      detail: {
        client_id: clientId,
      },
    });
    document.dispatchEvent(event);
    // fetchPost<any>(`${BACKEND_API}/community/signup`, {
    //   client_id: clientId,
    // })
    //   .then(res => {
    //     console.log('res1:', res);
    //     if (res.code === 0) {
    //       fetchGet(`${BACKEND_API}/users/profile?user_id=me`, {
    //         headers: {
    //           authorization: res.data.token,
    //         },
    //       }).then(profile => {
    //         setProfile(profile);
    //       });
    //     } else {
    //       toast.error(res.msg);
    //     }
    //   })
    //   .finally(onClose);
  };
  const bindExistAccount = async () => {
    const loginParams = await connectMetamask();

    const event = new CustomEvent('requestWalletLogin', {
      detail: {
        ...loginParams,
        client_id: clientId,
      },
    });
    document.dispatchEvent(event);
  };

  return (
    <Dialog open={Boolean(clientId)} onClose={onClose}>
      <Card sx={{ p: 3, width: 280 }}>
        <Typography variant="h5">Sign in</Typography>
        <Stack spacing={2} sx={{ mt: 3 }}>
          <Button
            onClick={createNewAccount}
            variant="outlined"
            sx={{
              textTransform: 'capitalize',
              color: 'grey.50',
            }}
          >
            create new account
          </Button>
          <Button
            onClick={bindExistAccount}
            variant="outlined"
            sx={{
              textTransform: 'capitalize',
              color: 'grey.50',
            }}
          >
            Bind exist account
          </Button>
        </Stack>
      </Card>
    </Dialog>
  );
};

export default UnsignUserDialog;
