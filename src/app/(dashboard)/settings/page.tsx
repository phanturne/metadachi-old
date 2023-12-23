'use client';

import { useSearchParams } from 'next/navigation';

export default function SettingsPage() {
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab');
  return <>Tab: {tab}</>;
}
