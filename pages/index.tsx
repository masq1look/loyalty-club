import { Button, Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';

type SaludoResponse = {
  name: string;
};

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [saludo, setSaludo] = useState<string>('');

  const onChangeName = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setName(e.currentTarget.value);
  };

  // Handles the submit event on form submit.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    setLoading(true);

    // Get data from the form.
    const data = { name };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = '/api/clientes';

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json'
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata
    };

    const res = await fetch(endpoint, options);
    const responseContent: SaludoResponse = await res.json();
    setLoading(false);
    console.log(responseContent);
    if (res.status != 200) {
      setSaludo('Error');
    }
    setSaludo(responseContent.name);
  };

  return (
    <MainLayout actualPage="Alta">
      <>
        {loading ? (
          <Typography variant="body1">Guardando...</Typography>
        ) : (
          !saludo && (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <TextField
                    id="name"
                    fullWidth
                    label="Nombre"
                    onChange={onChangeName}
                    placeholder="Introduzca Nombre de Cliente"
                    required
                    value={name}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button variant="contained" type="submit">
                    Guardar Cliente
                  </Button>
                </Grid>
              </Grid>
            </form>
          )
        )}
        {saludo && <Typography variant="body1">{saludo}</Typography>}
      </>
    </MainLayout>
  );
};

export default Home;
