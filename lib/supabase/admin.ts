import { getSupabaseClient } from './client';

/** The browser route guard improves UX; RLS in Supabase enforces actual access. */
export async function getAdminUser() {
  const supabase = getSupabaseClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return null;

  const { data, error } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();
  if (error) throw error;
  return data ? user : null;
}
