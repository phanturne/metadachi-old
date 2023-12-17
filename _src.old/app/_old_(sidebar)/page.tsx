// 'use client';
// import { useEffect, useState } from 'react';
// import { AuthSession } from '@supabase/supabase-js';
// import { supabase } from '@/utils/supabaseClient';
// import ThemeToggle from '@/components/ThemeToggle';
// import Header from '@/components/header/Header';
//
// export default function Home() {
//   const [session, setSession] = useState<AuthSession | null>(null);
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });
//
//     supabase.auth.onAuthStateChange((event, session) => {
//       setSession(session);
//     });
//   }, []);
//
//   return (
//     <main>
//       <Header />
//       <h1>Hello, {session?.user.email}</h1>
//       <ThemeToggle />
//     </main>
//   );
// }
