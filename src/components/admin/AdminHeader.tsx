"use client";

import { useSession } from "next-auth/react";
import { useSidebar } from "@/components/admin/AdminLayoutClient";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function AdminHeader({ title, subtitle, action }: AdminHeaderProps) {
  const { data: session } = useSession();
  const { setIsMobileOpen } = useSidebar();

  return (
    <header className="bg-white border-b px-4 md:px-8 py-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Hamburger Button - Mobile Only */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden flex-shrink-0 p-2 -ml-2 text-gray-600 hover:text-gray-900"
            aria-label="Buka menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">{title}</h1>
            {subtitle && <p className="text-gray-500 text-sm truncate">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          {action && <div>{action}</div>}
          {/* User Info - Hidden on very small screens */}
          <div className="text-right hidden sm:block">
            <p className="font-medium text-gray-800 text-sm">{session?.user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{session?.user?.role}</p>
          </div>
          <div className="w-9 h-9 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
            {session?.user?.name?.charAt(0) || "A"}
          </div>
        </div>
      </div>
    </header>
  );
}
