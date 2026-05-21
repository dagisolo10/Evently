import { messageFromAxiosError, ApiRequestError } from "./api/api-errors";

import axios, { AxiosError } from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: process.env["NEXT_PUBLIC_API_URL"],
});

export const getTestId = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("userId");
    }
    return null;
};

api.interceptors.request.use((config) => {
    if (process.env.NODE_ENV === "production") {
        return config;
    }

    const userId = getTestId();
    if (userId) config.headers["userId"] = userId;
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (err: unknown) => {
        const ax = err as AxiosError;
        const message = messageFromAxiosError(err);
        return Promise.reject(new ApiRequestError(message, ax.response?.status, ax.response?.data));
    },
);

let tokenResolver: (() => Promise<string | null>) | null = null;

export const injectTokenResolver = (resolver: () => Promise<string | null>) => {
    tokenResolver = resolver;
};

api.interceptors.request.use(async (config) => {
    if (tokenResolver) {
        try {
            const token = await tokenResolver();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Interceptor failed to resolve token:", error);
        }
    }
    return config;
});

export default api;
