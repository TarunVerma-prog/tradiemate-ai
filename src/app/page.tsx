"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Welcome to TradieMate AI</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your virtual assistant for all tradie appointments.
      </p>
      <Link
        href="/chat"
        className="px-6 py-3 bg-blue-600 text-white rounded-full text-xl font-semibold hover:bg-blue-700 transition"
      >
        Chat with us
      </Link>
    </main>
  );
}
