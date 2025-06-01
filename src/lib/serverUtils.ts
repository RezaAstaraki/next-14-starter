'server only';

import { clearAllCookies } from '@/actions/authActions';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const cookieName = process.env.COOKIENAME as string;

export function getAccessCookie() {
    return cookies().has(cookieName);
}

export const userAuthorizedHeader = () => {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get(cookieName)?.value}`,
    };
};

export const setCookies = (value: string) => {
    cookies().set({ name: cookieName, value, httpOnly: true, path: '/' });
};

export async function handleFetchResponse(fetchResult: Response, revalidateTags?: string[] | string) {
    try {
        if (fetchResult.ok) {
            if (revalidateTags) {
                if (typeof revalidateTags === 'string') {
                    revalidateTag(revalidateTags);
                } else {
                    revalidateTags.forEach((tag) => {
                        revalidateTag(tag);
                    });
                }
            }
            if (fetchResult.status != 204) {
                const response = await fetchResult.json();
                return {
                    ok: fetchResult.ok,
                    status: fetchResult.status,
                    body: response,
                };
            } else {
                return {
                    ok: fetchResult.ok,
                    status: fetchResult.status,
                    body: {
                        message: 'success',
                    },
                };
            }
        } else {
            const response = await fetchResult.json();
            console.log(response);
            if (fetchResult.status === 401) {
                await clearAllCookies();
                return redirect('/');
            }
            return {
                ok: fetchResult.ok,
                status: fetchResult.status,
                body: response,
            };
        }
    } catch (e) {
        console.error('Error processing fetch response:', e);
        return {
            ok: false,
            status: 500,
            body: {
                message: 'An error occurred while processing the response.',
                errors: e instanceof Error ? e.message : 'Unknown error',
            },
        };
    }
}

export const ServerUrlMaker = (endPoint: string) => {
    const baseUrl = process.env.BACKEND_API_URL;
    if (!baseUrl) {
        throw new Error('API URL is not defined');
    }
    return `${baseUrl}${endPoint}`;
};

export const userHeader = () => {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
};
