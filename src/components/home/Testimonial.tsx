"use client";

import { useState } from "react";

import { testimonials } from "@/data/paket";

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            TESTIMONIAL
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Apa Kata Mereka?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pengalaman nyata dari para traveler yang telah mempercayakan liburan mereka kepada Aurora Sejahtera
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 ${
                activeIndex === index ? "ring-2 ring-primary" : ""
              }`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < item.rating ? "text-accent" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 mb-6 line-clamp-4">&ldquo;{item.komentar}&rdquo;</p>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary/20">
                  <img
                    src={item.foto}
                    alt={item.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{item.nama}</h4>
                  <p className="text-sm text-gray-500">{item.destinasi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-primary/5 rounded-2xl">
            <p className="text-4xl font-bold text-primary">500+</p>
            <p className="text-gray-600 mt-1">Happy Travelers</p>
          </div>
          <div className="text-center p-6 bg-secondary/5 rounded-2xl">
            <p className="text-4xl font-bold text-secondary">50+</p>
            <p className="text-gray-600 mt-1">Destinasi</p>
          </div>
          <div className="text-center p-6 bg-accent/5 rounded-2xl">
            <p className="text-4xl font-bold text-accent">4.9</p>
            <p className="text-gray-600 mt-1">Rating</p>
          </div>
          <div className="text-center p-6 bg-primary/5 rounded-2xl">
            <p className="text-4xl font-bold text-primary">5+</p>
            <p className="text-gray-600 mt-1">Tahun Pengalaman</p>
          </div>
        </div>
      </div>
    </section>
  );
}
