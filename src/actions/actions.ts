'use server';

import { getAccessCookie, handleFetchResponse, ServerUrlMaker, setCookies, userAuthorizedHeader, userHeader } from '@/lib/serverUtils';
import { TUserInfo } from '@/types/types';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const sendMobile = async (mobile: string) => {
    const response = await fetch(ServerUrlMaker('/auth/request-otp'), {
        method: 'POST',
        headers: userHeader(),
        body: JSON.stringify({ mobile }),
    });
    console.log(response);
    return await handleFetchResponse(response);
};

export const isLogin = async () => {
    const cookies = getAccessCookie();
    return cookies;
};

export const verifyOtp = async (mobile: string, otp: number, reqId: string) => {
    const response = await fetch(ServerUrlMaker('/auth/verify-otp'), {
        method: 'POST',
        headers: userHeader(),
        body: JSON.stringify({ request_id: reqId, mobile, code: otp }),
    });
    const data = await handleFetchResponse(response);
    if (data.ok) {
        setCookies(data.body.token);
    }
    return data;
};

export const getPlansData = async () => {
    const response = await fetch(ServerUrlMaker('/plans'), {
        method: 'GET',
        headers: userHeader(),
    });
    return await handleFetchResponse(response);
};

export const sendUserInfo = async (data: TUserInfo) => {
    const response = await fetch(ServerUrlMaker('/profile'), {
        method: 'POST',
        headers: userAuthorizedHeader(),
        body: JSON.stringify(data),
    });

    return await handleFetchResponse(response);
};

export const logout = async () => {
    cookies().delete(process.env.COOKIENAME as string);
    return redirect('/');
};

export const getUserInfo = async () => {
    const response = await fetch(ServerUrlMaker('/profile'), {
        method: 'GET',
        headers: userAuthorizedHeader(),
    });

    return await handleFetchResponse(response);
};

export const sendPlanInfo = async (data: any) => {
    const response = await fetch(ServerUrlMaker('/register'), {
        method: 'POST',
        headers: userAuthorizedHeader(),
        body: JSON.stringify(data),
    });
    return await handleFetchResponse(response);
};

export const getUserPlans = async () => {
    const response = await fetch(ServerUrlMaker('/user-plans'), {
        method: 'GET',
        headers: userAuthorizedHeader(),
    });
    return await handleFetchResponse(response);
};
export const getUserPlanspend = async () => {
    const response = await fetch(ServerUrlMaker('/user-plans?status=0'), {
        method: 'GET',
        headers: userAuthorizedHeader(),
    });
    return await handleFetchResponse(response);
};

export const sendPaymentId = async (data: any) => {
    const response = await fetch(ServerUrlMaker('/payment'), {
        method: 'POST',
        headers: userAuthorizedHeader(),
        body: JSON.stringify(data),
    });
    return await handleFetchResponse(response);
};

export const cancelPlanPayment = async (userPlan: any) => {
    const response = await fetch(ServerUrlMaker(`/user-plans/${userPlan}/cancel`), {
        method: 'POST',
        headers: userAuthorizedHeader(),
    });

    return await handleFetchResponse(response);
};

export const getInstallment = async () => {
    const response = await fetch(ServerUrlMaker('/installments'), {
        method: 'GET',
        headers: userAuthorizedHeader(),
    });

    return await handleFetchResponse(response);
};

export const getPaymentHistory = async () => {
    const response = await fetch(ServerUrlMaker('/payment/history'), {
        method: 'GET',
        headers: userAuthorizedHeader(),
    });

    return await handleFetchResponse(response);
};
