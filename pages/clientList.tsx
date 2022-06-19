import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PostgrestError, PostgrestResponse } from '@supabase/supabase-js';
import type { GetServerSideProps, NextPage } from 'next';
import MainLayout from '../components/layouts/MainLayout';
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

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Nombre',
    width: 150
  },
  {
    field: 'created_at',
    headerName: 'Fecha de Alta',
    width: 200,
    type: 'dateTime'
  }
];

type Props = { clientes: Clientes[]; error: PostgrestError };

const ClientList: NextPage<Props> = ({ clientes, error }) => {
  return (
    <MainLayout actualPage="Lista">
      <>
        {error && (
          <Typography variant="body2" component="pre">
            Error: {JSON.stringify(error)}
          </Typography>
        )}
        {clientes && (
          <Box sx={{ height: '60vh', width: '100%' }}>
            <DataGrid
              autoHeight={true}
              rows={clientes}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Box>
        )}
      </>
    </MainLayout>
  );
};

export default ClientList;
