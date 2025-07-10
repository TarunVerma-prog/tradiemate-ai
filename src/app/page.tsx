import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to TradieMate AI 🚀</h1>
      <p className="text-lg text-gray-700 mb-8">Your virtual assistant for tradies.</p>
      <Link href="/chat" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Go to Chat
      </Link>
    </main>
  );
}
