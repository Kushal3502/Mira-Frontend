'use client';

import { authUrl } from '@/config/api';
import api from '@/lib/axios';
import Link from 'next/link';
import { useState } from 'react';
import { TbLoader } from 'react-icons/tb';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await api.post(authUrl.login, formData);

      if (response.data.success) {
        console.log(response);
        toast.success('Loggin successful');
      }
    } catch (error) {
      console.log('login error :: ', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlelogin}
      className="w-full max-w-md space-y-2 border bg-background p-6 shadow-sm"
    >
      <div className="text-center space-y-2 border-b pb-2">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="john@example.com"
          required
          className="focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          className="focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      {/* Forgot password */}
      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-muted-foreground hover:text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <TbLoader className=" animate-spin" /> : 'Sign In'}
      </Button>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Register here
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
