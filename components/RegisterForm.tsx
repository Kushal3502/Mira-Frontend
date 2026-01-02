import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";

function RegisterForm() {
  async function handleSubmit() {}

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-2 border bg-background p-6 shadow-sm"
    >
      <div className="text-center space-y-2 border-b pb-2">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <p className="text-sm text-muted-foreground">Sign up to get started</p>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium">
          Full Name
        </Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          required
          className="focus-visible:ring-2 focus-visible:ring-primary"
        />
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

      {/* Submit */}
      <Button type="submit" className="w-full">
        Register
      </Button>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
