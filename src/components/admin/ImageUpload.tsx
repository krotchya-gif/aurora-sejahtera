"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  currentUrl?: string;
  onUploadComplete: (url: string) => void;
  label?: string;
  required?: boolean;
  resetAfterUpload?: boolean;
}

export default function ImageUpload({
  currentUrl = "",
  onUploadComplete,
  label = "Upload Gambar",
  required = false,
  resetAfterUpload = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentUrl);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Tipe file tidak didukung. Gunakan JPG, PNG, atau WebP");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Ukuran file terlalu besar. Maksimal 5MB");
      return;
    }

    setError("");
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        onUploadComplete(data.data.url);
        if (resetAfterUpload) {
          setPreview("");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } else {
          setPreview(data.data.url);
        }
      } else {
        setError(data.message || "Gagal upload file");
        setPreview(currentUrl);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Terjadi kesalahan saat upload");
      setPreview(currentUrl);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onUploadComplete("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Preview */}
      {preview && (
        <div className="mb-4 relative inline-block">
          <div className="relative w-full max-w-md h-48 rounded-lg overflow-hidden border-2 border-gray-200">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
            title="Hapus gambar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          id={`file-upload-${label}`}
        />
        <label
          htmlFor={`file-upload-${label}`}
          className={`
            inline-flex items-center gap-2 px-6 py-3
            border-2 border-dashed border-gray-300 rounded-lg
            hover:border-primary hover:bg-primary/5
            cursor-pointer transition-all
            ${uploading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {uploading ? (
            <>
              <svg className="animate-spin w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm font-medium text-gray-700">Uploading...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                {preview ? "Ganti Gambar" : "Pilih Gambar"}
              </span>
            </>
          )}
        </label>
      </div>

      {/* Info */}
      <p className="text-xs text-gray-500 mt-2">
        Format: JPG, PNG, atau WebP. Maksimal 5MB
      </p>

      {/* Error */}
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
