import Typography from '@mui/material/Typography';
import { PostgrestError, PostgrestResponse } from '@supabase/supabase-js';
import type { GetServerSideProps, NextPage } from 'next';
import MainLayout from '../components/layouts/MainLayout';
import Link from '../components/Link';
import { definitions } from '../types/database';
import { supabase } from '../utils/supabaseClient';

type Clientes = definitions['clientes'];

export const getServerSideProps: GetServerSideProps = async context => {
  const res = await supabase
    .from<Clientes>('clientes')
    .select('id,created_at,name');

  const { data, error }: PostgrestResponse<Clientes> = res;

  const acceptLanguage = context.req.headers['accept-language']
    ?.split(',')
    ?.map(language => language.split(';')[0]);

  const locale =
    (acceptLanguage && acceptLanguage.length >= 1 && acceptLanguage[1]) ||
    (acceptLanguage && acceptLanguage.length === 1 && acceptLanguage[0]) ||
    context.locale ||
    context.defaultLocale ||
    'es-ES';

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };

  const clientes = data?.map(cliente => {
    return {
      ...cliente,
      created_at: new Date(cliente.created_at).toLocaleString(locale, options)
    };
  });

  return {
    props: { clientes, error }
  };
};

type Props = { clientes: Clientes[]; error: PostgrestError };

const ClientList: NextPage<Props> = ({ clientes, error }) => {
  return (
    <MainLayout>
      <>
        <Typography variant="h2" component="h1" gutterBottom>
          Lista de clientes
        </Typography>
        {error && (
          <Typography variant="body2" component="pre">
            Error: {JSON.stringify(error)}
          </Typography>
        )}
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
