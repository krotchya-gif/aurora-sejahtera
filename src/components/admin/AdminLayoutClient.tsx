"use client";

import { createContext, useState, useContext } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface SidebarContextType {
  isMinimized: boolean;
  setIsMinimized: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isMinimized: false,
  setIsMinimized: () => {},
  isMobileOpen: false,
  setIsMobileOpen: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isMinimized, setIsMinimized, isMobileOpen, setIsMobileOpen }}>
      <div className="min-h-screen bg-gray-100">
        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        <AdminSidebar />

        {/* Main Content - no margin on mobile, margin on lg+ */}
        <div className={`ml-0 transition-all duration-300 ${isMinimized ? 'lg:ml-20' : 'lg:ml-64'}`}>
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
