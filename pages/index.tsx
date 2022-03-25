import type { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

type SaludoResponse = {
  name: string;
};

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [idClienteValue, setIdCliente] = useState<string>('');
  const [saludo, setSaludo] = useState<string>('');

  const onChangeIdCliente = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | undefined
  ): void => {
    console.log(`e.currentTarget.value: ${e.currentTarget.value}`);
    console.log(`newValue: ${newValue}`);
    setIdCliente(e.currentTarget.value);
  };

  // Handles the submit event on form submit.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    setLoading(true);

    // Get data from the form.
    const data = { idCliente: idClienteValue };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = '/api/hello';

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
    console.log(responseContent);
    setSaludo(responseContent.name);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>+Q1Look Loyalty Club</title>
        <meta name="description" content="+Q1Look Club de Fidelización" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Alta de clientes</h1>
        {loading ? (
          <p>Guardando...</p>
        ) : (
          !saludo && (
            <div className={styles.grid}>
              <form onSubmit={handleSubmit}>
                <label htmlFor="idCliente">
                  Introduzca Identificador de Cliente:
                </label>
                <input
                  id="idCliente"
                  type="text"
                  value={idClienteValue}
                  onChange={onChangeIdCliente}
                />
                <input type="submit" value="Guardar Cliente" />
              </form>
            </div>
          )
        )}
        {saludo && <div className={styles.card}>{saludo}</div>}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.instagram.com/masq1look/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image
              src="/masq1look_logo.svg"
              alt="Logo +Q1Look"
              width={72}
              height={72}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
