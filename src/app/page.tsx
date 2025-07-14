"use client";
import { FaComments, FaPhoneAlt, FaEnvelope, FaClipboardList, FaCheckCircle, FaUserTie, FaStar, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import Head from "next/head";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function Home() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>
      <div className={`min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-100 ${inter.className}`}>
        {/* Sticky Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <img src="/images/tradiemate-logo.jpg" alt="TradieMate Logo" className="h-12 w-auto object-contain" />
            </div>
            <nav className="hidden sm:flex gap-6 text-gray-700 font-medium">
              <a href="#features" className="hover:text-blue-600">Features</a>
              <a href="#how" className="hover:text-blue-600">How it works</a>
              <a href="#why" className="hover:text-blue-600">Why TradieMate?</a>
              <a href="#dashboard" className="hover:text-blue-600">Dashboard</a>
              <a href="#testimonials" className="hover:text-blue-600">Testimonials</a>
            </nav>
            <Link href="/chat">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-full font-bold shadow hover:from-blue-600 hover:to-purple-600 transition">
                Start Chatting
              </button>
            </Link>
          </div>
        </header>
        {/* Hero Section */}
        <section className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center bg-[#23231f] px-4 py-24">
          <h1 className="font-extrabold text-[#f7f5ee] mb-8 tracking-tight leading-tight" style={{ letterSpacing: '-0.04em', fontSize: '7.5vw' }}>
            Never miss another customer
          </h1>
          <p className="text-2xl sm:text-3xl text-[#f7f5ee] mb-12 max-w-2xl mx-auto font-normal">
            Get the #1 rated receptionist service for<br className="hidden sm:block" /> small businesses.
          </p>
          <div className="mb-8">
            <span className="text-xl sm:text-2xl text-[#f7f5ee] font-semibold">Call us now: </span>
            <span className="text-2xl sm:text-3xl text-[#e24a0c] font-bold">+61 2 5503 5726</span>
          </div>
          <div className="flex flex-row gap-8 justify-center mb-10">
            <button className="bg-[#e24a0c] text-white font-bold text-xl px-12 py-5 rounded-full transition-all duration-200">
              AI Receptionist
            </button>
            <button className="bg-[#e24a0c] text-white font-bold text-xl px-12 py-5 rounded-full transition-all duration-200">
              Human Receptionists
            </button>
          </div>
          <button
            className="mt-4 bg-blue-600 text-white font-bold text-xl px-10 py-4 rounded-full hover:bg-blue-700 transition"
            onClick={() => alert('Calling feature coming soon!')}
          >
            Call an AI Receptionist
          </button>
          <a href="#" className="text-[#f7f5ee] text-xl underline underline-offset-2 hover:text-orange-300 transition">
            Book a demo with our team &rsaquo;
          </a>
        </section>
        {/* How it Works */}
        <section id="how" className="w-full py-14 px-4 bg-white flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">How it works</h2>
          <div className="flex flex-col sm:flex-row gap-8 max-w-4xl w-full justify-center">
            <div className="flex-1 flex flex-col items-center">
              <FaUserTie className="text-blue-500 text-3xl mb-2" />
              <span className="font-semibold text-gray-800 mb-1">1. Customer contacts TradieMate</span>
              <span className="text-gray-500 text-sm text-center">Via chat, call, or email — any time, day or night.</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <FaCheckCircle className="text-green-500 text-3xl mb-2" />
              <span className="font-semibold text-gray-800 mb-1">2. We capture the request</span>
              <span className="text-gray-500 text-sm text-center">TradieMate collects all the details and books the job.</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <FaClipboardList className="text-purple-500 text-3xl mb-2" />
              <span className="font-semibold text-gray-800 mb-1">3. You see it in your dashboard</span>
              <span className="text-gray-500 text-sm text-center">All bookings and customer info in one place, ready for you.</span>
            </div>
          </div>
        </section>
        {/* Why TradieMate? */}
        <section id="why" className="w-full py-14 px-4 bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Why TradieMate?</h2>
          <div className="flex flex-col sm:flex-row gap-8 max-w-4xl w-full justify-center">
            <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <FaStar className="text-yellow-400 text-3xl mb-2" />
              <span className="font-semibold text-gray-800 mb-1">Never miss a job</span>
              <span className="text-gray-500 text-sm text-center">24/7 coverage means you capture every opportunity, even after hours.</span>
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <FaCheckCircle className="text-green-500 text-3xl mb-2" />
              <span className="font-semibold text-gray-800 mb-1">Save time & reduce admin</span>
              <span className="text-gray-500 text-sm text-center">Let TradieMate handle the admin so you can focus on your trade.</span>
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <FaUserTie className="text-blue-500 text-3xl mb-2" />
              <span className="font-semibold text-gray-800 mb-1">Professional image</span>
              <span className="text-gray-500 text-sm text-center">Impress customers with fast, professional responses every time.</span>
            </div>
          </div>
        </section>
        {/* Dashboard Section */}
        <section id="dashboard" className="w-full py-14 px-4 flex flex-col items-center bg-white">
          <div className="w-full max-w-3xl bg-gray-50 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8 border border-gray-200 shadow">
            <div className="flex-shrink-0">
              <img
                src="/images/human-receptionist.jpg"
                alt="Human Receptionist"
                className="rounded-xl shadow-md max-w-xs md:max-w-sm"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tradie Dashboard</h2>
              <p className="text-gray-700 text-base mb-2">
                See all your bookings and customer details in one place. Stay organised, respond quickly, and never lose track of a job again.
              </p>
              <Link href="/chat">
                <button className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-bold shadow hover:from-blue-600 hover:to-purple-600 transition">
                  Try the Chat Now
                </button>
      </Link>
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-14 px-4 bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">What our customers say</h2>
          <div className="flex flex-col sm:flex-row gap-8 max-w-4xl w-full justify-center">
            <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
              </div>
              <span className="text-gray-700 text-center mb-2">“TradieMate has made my life so much easier. I never miss a customer call!”</span>
              <span className="text-sm text-gray-500">— Sam, Plumber</span>
            </div>
            <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
              </div>
              <span className="text-gray-700 text-center mb-2">“The dashboard is a game changer. I can see all my bookings at a glance.”</span>
              <span className="text-sm text-gray-500">— Alex, Electrician</span>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="w-full bg-white border-t border-gray-200 py-6 mt-auto">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 gap-4">
            <div className="flex items-center gap-2">
              <img src="/images/tradiemate-logo.jpg" alt="TradieMate Logo" className="h-8 w-auto object-contain" />
              <span className="font-bold text-gray-700">TradieMate</span>
            </div>
            <div className="flex gap-4 text-gray-500 text-xl">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
            <span className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} TradieMate. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
