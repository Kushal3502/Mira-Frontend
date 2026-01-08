import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/utils/token";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "sonner";

const accessToken: string | null = getAccessToken();

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  withCredentials: true,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      _skipErrorToast?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        removeAccessToken();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    // Handle error toasts (skip for refresh token endpoint and if explicitly disabled)
    if (
      typeof window !== "undefined" &&
      !originalRequest._skipErrorToast &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      const errorData = error.response?.data as
        | { message?: string; error?: string }
        | undefined;

      console.log("Error :: ", errorData);

      // Extract error message from response
      const errorMessage =
        errorData?.message ||
        errorData?.error ||
        error.message ||
        "An unexpected error occurred";

      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default api;
