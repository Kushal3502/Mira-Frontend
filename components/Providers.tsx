'use client';

import { authUrl } from '@/config/api';
import api from '@/lib/axios';
import { setUser } from '@/store/features/authSlice';
import { store } from '@/store/store';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Toaster } from 'sonner';

function AuthLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    // Avoid calling /auth/me on public auth routes to prevent 401 → redirect loops
    const authPaths = ['/login', '/register', '/verify'];
    if (authPaths.includes(pathname)) return;

    async function fetchCurrentUser() {
      try {
        const response = await api.get(authUrl.me);
        dispatch(setUser(response.data.data));
      } catch (error) {
        console.log('Fetch user error :: ', error);
      }
    }

    fetchCurrentUser();
  }, [pathname, dispatch]);

  return <>{children}</>;
}

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Toaster position="top-right" richColors />
      <AuthLoader>{children}</AuthLoader>
    </Provider>
  );
}
