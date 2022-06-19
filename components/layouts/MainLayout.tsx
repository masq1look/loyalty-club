import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Image from 'next/image';
import * as React from 'react';
import Link from '../Link';

export type Page = 'Alta' | 'Lista' | 'Direccion';
//  | 'Productos'| 'Precios'| 'Blog'

const pages: { [key in Page]: { title: string; link: string } } = {
  Alta: { title: 'Alta de Clientes', link: '/' },
  Lista: { title: 'Lista de Clientes', link: '/clientList' },
  Direccion: { title: 'Dirección de +Q1Look', link: '/address' }
};

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

type Props = { actualPage: Page };

const ResponsiveAppBar = ({ actualPage = 'Alta' }: Props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget.id);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pageDescription = pages[actualPage].title;
  const filteredPages: Page[] = Object.keys(pages)
    .map(page => page as Page)
    .filter(page => page !== actualPage);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              textDecoration: 'none'
            }}
          >
            {pageDescription}
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: 'none', md: 'flex' } }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="appbar menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {filteredPages.map(page => (
                <MenuItem key={page} id={page} onClick={handleCloseNavMenu}>
                  <Link href={pages[page].link} key={page}>
                    <Typography textAlign="center">
                      {pages[page].title}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            component="div"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              textDecoration: 'none'
            }}
          >
            {pageDescription}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {filteredPages.map(page => (
              <Link href={pages[page].link} key={page}>
                <Button
                  id={page}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {pages[page].title}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

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

const MainLayout = ({
  actualPage,
  children
}: {
  actualPage: Page;
  children: JSX.Element;
}) => {
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
      <ResponsiveAppBar actualPage={actualPage} />
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
