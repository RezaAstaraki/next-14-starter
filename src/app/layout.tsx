
import RootModal from '@/components/general components/modal/RootModal';

import { Providers } from '@/components/providers/Providers';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';
// import { GoogleTagManager } from '@next/third-parties/google'

export const metadata: Metadata = {
    title: '',
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html dir="rtl" lang="fa">
            <body className='flex flex-1 min-h-dvh'>
                {/* <GoogleTagManager gtmId="GTM-5KMQ28H4" /> */}
                <Providers>
                    {children}
                    <Toaster position="top-center" richColors duration={4000} expand />
                    <RootModal />
                </Providers>
            </body>
        </html>
    );
}
