import React from "react";
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-emerald-950 to-black pt-20">
        <div className="responsive-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="heading-main font-bold mb-6 text-white drop-shadow-lg">About Us</h1>
          <AboutSection />
        </div>
      </main>
    </>
  );
}