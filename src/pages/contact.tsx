import React from "react";
import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="responsive-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="heading-main font-bold mb-6 text-gray-900 dark:text-white">Contact</h1>
          <ContactSection />
        </div>
      </main>
    </>
  );
}