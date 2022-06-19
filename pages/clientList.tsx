import Typography from '@mui/material/Typography';
import { PostgrestError, PostgrestResponse } from '@supabase/supabase-js';
import type { GetServerSideProps, NextPage } from 'next';
import MainLayout from '../components/layouts/MainLayout';
import Link from '../components/Link';
import { supabase } from '../utils/supabaseClient';

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
    <MainLayout>
      <>
        <Typography variant="h2" component="h1" gutterBottom>
          Lista de clientes
        </Typography>
        {error && <pre>Error: {JSON.stringify(error)}</pre>}
        {clientes && (
          <table>
            <thead>
              <tr>
                <th>Fecha de Alta</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.created_at}</td>
                  <td>{cliente.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Link href="/">Alta de Clientes</Link>
      </>
    </MainLayout>
  );
};

export default ClientList;
