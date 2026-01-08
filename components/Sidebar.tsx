"use client";

import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import {
  ChatCircleIcon,
  FolderIcon,
  GearIcon,
  HouseIcon,
  SignOutIcon,
  UserIcon,
  XIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { TbLoader } from "react-icons/tb";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/features/authSlice";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: HouseIcon },
    { href: "/dashboard/projects", label: "Projects", icon: FolderIcon },
    { href: "/dashboard/chat", label: "Chat", icon: ChatCircleIcon },
    { href: "/dashboard/settings", label: "Settings", icon: GearIcon },
  ];

  async function handleSignOut() {
    setLoading(true);
    try {
      await api.post("/auth/logout");
      dispatch(logout());
      router.push("/");
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error :: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen z-50 bg-background border-r border-zinc-700 transition-transform duration-300 ease-in-out",
          "w-64 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="border-b border-zinc-700 p-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">
            {`<Mira>`}
          </Link>
          <Button
            variant="ghost"
            size="icon-xs"
            className="lg:hidden"
            onClick={onClose}
          >
            <XIcon />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-none text-sm transition-colors",
                  "hover:bg-muted",
                  isActive
                    ? "bg-muted border-l-2 border-primary text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-zinc-700 p-4 space-y-2">
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-none text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <UserIcon className="size-5" />
            <span>Profile</span>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
            onClick={handleSignOut}
            disabled={loading}
          >
            <SignOutIcon className="size-5" />
            <span>
              {loading ? (
                <TbLoader className="size-4 animate-spin" />
              ) : (
                "Sign Out"
              )}
            </span>
          </Button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
