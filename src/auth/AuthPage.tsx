import { Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';

export const bc_auth = new BroadcastChannel('auth');

const AuthPage = () => {
  const l = useLocation();
  const search = l.search;

  const sp = new URLSearchParams(search);
  const token = sp.get('token');
  const code = sp.get('code');
  const msg = sp.get('msg');
  const client_id = sp.get('client_id');

  bc_auth.postMessage({
    code: code ? Number(code) : -1,
    data: {
      token,
      client_id,
    },
    msg,
  });

  window.close();

  return <div></div>;
};

export default AuthPage;
