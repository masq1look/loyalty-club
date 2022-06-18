// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient, PostgrestError } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = 'https://efvphsnbidfvelpevybt.supabase.co';
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

type Data = {
  name: string;
  data: any[] | null;
};

type Error = {
  error: PostgrestError | { message: string };
};

export default async function handler(
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
