import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import {
  createClient,
  PostgrestError,
  PostgrestResponse
} from '@supabase/supabase-js';

const supabaseUrl = 'https://efvphsnbidfvelpevybt.supabase.co';
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

type Cliente = {
  id: string;
  created_at: string;
  name: string;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const res = await supabase.from('clientes').select('id,created_at,name');

  console.log('res: ', res);
  const { data: clientes, error }: PostgrestResponse<Cliente> = res;

  return {
    props: { clientes, error }
  };
};

type Props = { clientes: Cliente[]; error: PostgrestError };

const ClientList: NextPage<Props> = ({ clientes, error }) => {
  console.log('clientes: ', clientes);
  console.log('error: ', error);
  return (
    <div className={styles.container}>
      <Head>
        <title>+Q1Look Loyalty Club</title>
        <meta name="description" content="+Q1Look Club de Fidelización" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Lista de clientes</h1>
        <Link href="/">
          <a>Alta de Clientes</a>
        </Link>
        {error && <pre>Error: {JSON.stringify(error)}</pre>}
        {clientes && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha de Alta</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.created_at}</td>
                  <td>{cliente.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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

export default ClientList;
