import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const VerifyEmailPage = dynamic(() => import('./VerifyEmailComponent'), {
  ssr: false,
});

export default function VerifyEmailWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailPage />
    </Suspense>
  );
}
