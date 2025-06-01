'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

interface ProviderProps {
    children: React.ReactElement;
}
export const ProgressBarProvider = ({ children }: ProviderProps) => {
    return (
        <>
            <ProgressBar height="4px" color="#ff70a6" options={{ showSpinner: false }} shallowRouting disableSameURL />
            {children}
        </>
    );
};
