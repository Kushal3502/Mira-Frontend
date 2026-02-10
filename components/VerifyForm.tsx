"use client";

import React, { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "sonner";
import { TbLoader } from "react-icons/tb";
import { authUrl } from "@/config/api";

function VerifyForm() {
  const email = localStorage.getItem("email");

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start the countdown timer
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  async function handleVerifyEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (!email) {
      toast.error("Email not found. Please register again.");
      router.push("/register");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const code = formData.get("code") as string;

      if (!code || code.length !== 6) {
        toast.error("Please enter a valid 6-digit verification code");
        setLoading(false);
        return;
      }

      const data = {
        email,
        token: code,
      };

      const response = await api.post(authUrl.verify, data);

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.removeItem("email");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        router.push("/login");
      }
    } catch (error) {
      console.error("Verification error :: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleVerifyEmail}
      className="w-full max-w-md space-y-4 border bg-background p-6 shadow-sm"
    >
      {/* Header */}
      <div className="text-center space-y-2 border-b pb-2">
        <h1 className="text-2xl font-semibold">Verify your email</h1>
        <p className="text-sm text-muted-foreground">
          Enter the verification code sent to your email
        </p>
        {!isExpired && (
          <p className="text-xs text-muted-foreground mt-2">
            Code expires in:{" "}
            <span className="font-mono font-semibold text-primary">
              {formatTime(timeRemaining)}
            </span>
          </p>
        )}
        {isExpired && (
          <p className="text-xs text-destructive mt-2 font-semibold">
            Verification code has expired. Please request a new one.
          </p>
        )}
      </div>

      {/* Email (read-only) */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email || ""}
          readOnly
          className="bg-muted cursor-not-allowed"
        />
      </div>

      {/* Verification Code */}
      <div className="space-y-2">
        <Label htmlFor="code" className="text-sm font-medium">
          Verification Code
        </Label>
        <Input
          id="code"
          name="code"
          type="text"
          inputMode="numeric"
          placeholder="Enter 6-digit code"
          required
          maxLength={6}
          className="tracking-widest text-center focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      {/* Resend Code */}
      <div className="flex justify-end">
        <Button
          type="button"
          variant="ghost"
          className="text-sm text-muted-foreground hover:text-primary hover:underline h-auto p-0"
          onClick={() => {
            // Reset timer when resending
            setTimeRemaining(600);
            setIsExpired(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            intervalRef.current = setInterval(() => {
              setTimeRemaining((prev) => {
                if (prev <= 1) {
                  setIsExpired(true);
                  if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                  }
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
            // trigger resend OTP API here
            toast.info("Verification code resent. Please check your email.");
          }}
        >
          Resend code
        </Button>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={loading || isExpired}>
        {loading ? <TbLoader className=" animate-spin" /> : "Verify Email"}
      </Button>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        Entered the wrong email?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Go back
        </Link>
      </p>
    </form>
  );
}

export default VerifyForm;
