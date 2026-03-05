'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Company ratings are now unified with Alliance ratings
// This page redirects to /rate/alliance
export default function RateCompanyPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/rate/alliance');
  }, [router]);

  return null;
}
