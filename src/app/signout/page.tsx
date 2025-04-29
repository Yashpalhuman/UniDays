import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const LogoutPage = dynamic(() => import('./LogoutComponent'), {
    ssr: false,
});

export default function LogoutWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LogoutPage />
        </Suspense>
    );
}
