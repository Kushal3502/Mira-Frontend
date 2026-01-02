"use client";

import React from "react";
import Link from "next/link";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
  };

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
      <Button type="submit" className="w-full">
        Sign In
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
