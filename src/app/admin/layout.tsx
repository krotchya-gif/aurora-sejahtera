import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/lib/SessionProvider";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/login");
  }

  return (
    <SessionProvider>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </SessionProvider>
  );
}
