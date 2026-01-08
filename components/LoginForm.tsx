"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import api from "@/lib/axios";
import { toast } from "sonner";
import { TbLoader } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { login } from "@/store/features/authSlice";

function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const response = await api.post("/auth/login", data);

      if (response.data.success) {
        console.log(response.data);
        toast.success(response.data.message);
        dispatch(login(response.data.data));
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error :: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
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
        {loading ? <TbLoader className=" animate-spin" /> : "Sign In"}
      </Button>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
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
