// import { useState, useEffect } from 'react';
// import { AuthSession } from '@supabase/supabase-js';
// import { supabase } from '@/utils/supabaseClient';
//
// export const useSupabaseSession = () => {
//   const [session, setSession] = useState<AuthSession | undefined | null>(
//     undefined
//   );
//
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });
//
//     // Listen for _old_auth changes on:
//     // SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED, USER_DELETED, PASSWORD_RECOVERY
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       setSession(session);
//     });
//
//     // Unsubscribe on cleanup
//     return () => {
//       subscription?.unsubscribe();
//     };
//   }, []);
//
//   return session;
// };
