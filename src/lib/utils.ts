import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { FailResponse } from './types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const clientHandleResponse = ({ res, successToastMessage, toaster = true }: { res: any; successToastMessage?: string; toaster?: boolean }) => {
    if (!res.ok) {
        const response: FailResponse = res.body;
        console.log(res);
        if (response.errors) {
            if (toaster && response) {
                Object.values(response.errors).forEach((errorMessages) => {
                    errorMessages.forEach((error) => toast.error(error));
                });
            }
        } else {
            if (toaster && response) {
                toast.error(response.message);
            }
        }
    } else {
        const response = res.body;
        if (successToastMessage) {
            toast.success(successToastMessage);
        }
        return response;
    }
};

export const clientUrlMaker = (endPoint: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
        throw new Error('API URL is not defined');
    }
    return baseUrl;
};

export const animations = {
    fadeIn: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 15 },
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    },
    slideIn: (direction: 'right' | 'left') => ({
        hidden: {
            opacity: 0,
            x: direction === 'right' ? -50 : 50,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', stiffness: 100, damping: 20 },
        },
    }),
    stagger: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.07, delayChildren: 0.1 },
        },
    },
    item: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 15 },
        },
    },
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    },
    pulse: {
        scale: [1, 1.02, 1],
        transition: { duration: 2, repeat: Infinity },
    },
    background: {
        initial: { backgroundPosition: '0% 0%' },
        animate: {
            backgroundPosition: ['0% 0%', '100% 100%'],
            transition: { duration: 20, repeat: Infinity, repeatType: 'mirror' },
        },
    },
};

export const colors = {
    bronze: {
        bg: 'bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900',
        border: 'border-amber-500/30',
        hover: 'hover:border-amber-400',
        text: 'text-amber-500',
        button: 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600',
        icon: 'text-amber-400',
        shadow: 'shadow-amber-500/20',
        gradient: 'from-amber-900',
    },
    silver: {
        bg: 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600',
        border: 'border-gray-300/30',
        hover: 'hover:border-gray-200',
        text: 'text-gray-300',
        button: 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-300 hover:to-gray-400',
        icon: 'text-gray-300',
        shadow: 'shadow-gray-400/20',
        gradient: 'from-gray-600',
    },
    gold: {
        bg: 'bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700',
        border: 'border-yellow-400/30',
        hover: 'hover:border-yellow-300',
        text: 'text-yellow-400',
        button: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500',
        icon: 'text-yellow-300',
        shadow: 'shadow-yellow-500/20',
        gradient: 'from-yellow-700',
    },
    diamond: {
        bg: 'bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600',
        border: 'border-cyan-300/30',
        hover: 'hover:border-cyan-200',
        text: 'text-cyan-300',
        button: 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500',
        icon: 'text-cyan-200',
        shadow: 'shadow-cyan-500/20',
        gradient: 'from-cyan-600',
    },
};

export function persianToEnglishDigits(input: string): string {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    return input.replace(/[۰-۹]/g, (char) => {
        return englishNumbers[persianNumbers.indexOf(char)] ?? char;
    });
}

export function getSecondsDifferenceFromGMT(gmtTime: string): number {
    // Parse the provided GMT time string (e.g., "2024-10-21T12:00:00Z")
    const gmtDate = new Date(gmtTime);

    // Get the current local time
    const now = new Date();

    // Calculate the difference in milliseconds
    const differenceInMs = gmtDate.getTime() - now.getTime();

    // Convert milliseconds to seconds
    const differenceInSeconds = Math.floor(differenceInMs / 1000);

    return differenceInSeconds;
}
export const animationsQuantityStep = {
    container: {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    },
    item: {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    },
    stagger: {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    },
};
