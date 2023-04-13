import { ThemeProvider, Typography, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import Router from './routes';

const App = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="dark" limit={2} pauseOnFocusLoss={false} />

      <Router />
    </ThemeProvider>
  );
};

export default App;
