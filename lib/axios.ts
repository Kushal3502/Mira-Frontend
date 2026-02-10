import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  withCredentials: true, // ✅ critical
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      _skipErrorToast?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }, // cookie sent automatically
        );

        return api(originalRequest);
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    if (
      typeof window !== 'undefined' &&
      !originalRequest?._skipErrorToast &&
      !originalRequest?.url?.includes('/auth/refresh')
    ) {
      const errorData = error.response?.data as
        | { message?: string; error?: string }
        | undefined;

      const errorMessage =
        errorData?.message ||
        errorData?.error ||
        error.message ||
        'An unexpected error occurred';

      toast.error(errorMessage);
    }

    return Promise.reject(error);
  },
);

export default api;
