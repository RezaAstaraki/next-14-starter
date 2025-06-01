'use server';

import { getAccessCookie, ServerUrlMaker, setCookies, userHeader } from '@/lib/serverUtils';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const cookieName = process.env.COOKIENAME as string;

export const logout = async () => {
    cookies().delete(cookieName);
    return redirect('/');
};

export const logoutWithoutRedirect = async () => {
    cookies().delete(cookieName);
    return;
};

export const getCookieWithName = async (cookieName: string) => {
    return cookies().has(cookieName);
};
export const deleteCookieWithName = async (cookieName: string) => {
    cookies().delete(cookieName);
};
export const clearAllCookies = async () => {
    const cookieNames = cookies()
        .getAll()
        .map((cookie) => cookie.name);
    cookieNames.forEach((name) => {
        cookies().delete(name);
    });
    return redirect('/');
};
export const isLogin = async () => {
    const cookies = getAccessCookie();
    return cookies;
};

export const verifyOtp = async (mobile: string, otp: string, reqId: string) => {
    const response = await fetch(ServerUrlMaker('/auth/verify-otp'), {
        method: 'POST',
        headers: userHeader(),
        body: JSON.stringify({ mobile, request_id: reqId, code: otp }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setCookies(data.token);
    return data;
};
