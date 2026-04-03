import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase.from('notifications').select('*').limit(1);
  console.log('Select table test:');
  console.log('Data:', data);
  console.log('Error:', error);
}
test();
