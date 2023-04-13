import {
  Button,
  Card,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import OneClickLogin from './modules/login';

const App = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
            mt: '80px',
            p: 3,
            borderRadius: '16px',
            backgroundColor: '#1C1330',
          }}
        >
          <OneClickLogin />
        </Card>
      </Stack>
    </ThemeProvider>
  );
};

export default App;
