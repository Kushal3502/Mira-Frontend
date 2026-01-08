"use client";

import api from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { TbLoader } from "react-icons/tb";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const data = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const response = await api.post("/auth/register", data);

      if (response.data.success) {
        console.log(response.data);
        toast.success(response.data.message);
        localStorage.setItem("email", response.data.data.email);
        router.push("/verify");
      }
    } catch (error) {
      console.error("Resgistration error :: ", error);
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
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <p className="text-sm text-muted-foreground">Sign up to get started</p>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium">
          Full Name <span className="text-red-600">*</span>
        </Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="John Doe"
          required
          className="focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email<span className="text-red-600">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          className="focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password<span className="text-red-600">*</span>
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <TbLoader className=" animate-spin" /> : "Register"}
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
