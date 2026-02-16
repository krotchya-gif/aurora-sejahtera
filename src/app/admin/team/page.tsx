"use client";

import { useState, useEffect } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";
import Image from "next/image";

interface TeamMember {
  _id: string;
  nama: string;
  posisi: string;
  foto: string;
  bio?: string;
  email?: string;
  telepon?: string;
  urutan: number;
  isActive: boolean;
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/team?all=true");
      const data = await res.json();
      if (data.success) {
        setMembers(data.data);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const member = members.find((m) => m._id === id);
      if (!member) return;

      const res = await fetch(`/api/team/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...member, isActive: !currentStatus }),
      });

      if (res.ok) {
        fetchMembers();
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus member ini?")) return;

    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchMembers();
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  if (loading) {
    return (
      <div>
        <AdminHeader title="Team Members" subtitle="Manage team members" />
        <div className="p-4 md:p-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title="Team Members"
        subtitle="Manage team members"
        action={
          <Link
            href="/admin/team/new"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Member
          </Link>
        }
      />

      <div className="p-4 md:p-8">
        {members.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500 mb-4">Belum ada team member</p>
            <Link href="/admin/team/new" className="text-primary hover:underline">
              Tambah member pertama
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div key={member._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Foto */}
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src={member.foto}
                    alt={member.nama}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        member.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                      }`}
                    >
                      {member.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{member.nama}</h3>
                    <p className="text-primary font-medium mb-2">{member.posisi}</p>
                    {member.bio && (
                      <p className="text-sm text-gray-600 line-clamp-2">{member.bio}</p>
                    )}
                  </div>

                  {/* Contact Info */}
                  {(member.email || member.telepon) && (
                    <div className="text-xs text-gray-500 space-y-1 mb-4 border-t pt-3">
                      {member.email && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="truncate">{member.email}</span>
                        </div>
                      )}
                      {member.telepon && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{member.telepon}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Urutan */}
                  <div className="text-xs text-gray-500 mb-4">
                    Urutan: {member.urutan}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleActive(member._id, member.isActive)}
                      className={`flex-1 p-2 rounded-lg transition-colors ${
                        member.isActive
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                      title={member.isActive ? "Nonaktifkan" : "Aktifkan"}
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <Link
                      href={`/admin/team/${member._id}`}
                      className="flex-1 p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="flex-1 p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      title="Hapus"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
