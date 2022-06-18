import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

type SaludoResponse = {
  name: string;
};

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [saludo, setSaludo] = useState<string>('');

  const onChangeName = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | undefined
  ): void => {
    console.log(`e.currentTarget.value: ${e.currentTarget.value}`);
    console.log(`newValue: ${newValue}`);
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
                <label htmlFor="name">Introduzca Nombre de Cliente:</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={onChangeName}
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
