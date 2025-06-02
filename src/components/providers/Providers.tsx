'use client';

import { store } from '@/redux/store';
import { NextUIProvider } from '@nextui-org/react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Provider } from 'react-redux';

interface ProviderProps {
    children: React.ReactNode;
}

const ProgressBarProvider = ({ children }: ProviderProps) => {
    return (
        <>
            <ProgressBar height="4px" color="#ff70a6" options={{ showSpinner: false }} shallowRouting disableSameURL />
            {children}
        </>
    );
};

const ReduxProvider = ({ children }: ProviderProps) => {
    return <Provider store={store}>{children}</Provider>;
};

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ProgressBarProvider>
            <NextUIProvider className='flex flex-1'>
                <ReduxProvider>{children}</ReduxProvider>
            </NextUIProvider>
        </ProgressBarProvider>
    );
}
