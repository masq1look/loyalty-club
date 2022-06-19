// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../../utils/supabaseClient';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
  data: any[] | null;
};

type Error = {
  error: PostgrestError | { message: string };
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const name: string = req?.body?.name;
  if (!name || name.trim().length < 1) {
    res.status(400).json({ error: { message: 'Missing name' } });
  }
  const { data, error } = await supabase
    .from('clientes')
    .insert([{ name: name }]);
  if (error) {
    res.status(500).json({ error });
  }
  res.status(200).json({ name: `Hello ${req.body.name}`, data });
}

export default handler;
