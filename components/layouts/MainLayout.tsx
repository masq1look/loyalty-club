import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Image from 'next/image';
import Link from '../Link';

function Copyright() {
  return (
    <>
      <Typography variant="body2" color="text.secondary">
        {'Copyright © '}
        <Link color="inherit" href="https://www.instagram.com/masq1look/">
          +Q1Look
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <Link color="inherit" href="https://g.page/Masq1look?share">
          Calle de Sagunto, 10, 28223, Pozuelo de Alarcón, Madrid, España
        </Link>
      </Typography>
    </>
  );
}

const MainLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Head>
        <title>+Q1Look Loyalty Club</title>
        <meta name="description" content="+Q1Look Club de Fidelización" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: theme =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800]
        }}
      >
        <Grid
          alignItems={'center'}
          container
          justifyContent={'space-between'}
          spacing={2}
        >
          <Grid item xs={4} md={6}>
            <Link color="inherit" href="https://www.instagram.com/masq1look/">
              <Image
                src="/masq1look_logo.svg"
                alt="Logo +Q1Look"
                width={72}
                height={72}
              />
            </Link>
          </Grid>
          <Grid item xs={8} md={6}>
            <Copyright />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MainLayout;
