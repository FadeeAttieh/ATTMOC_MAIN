import React from "react";
import type { GetServerSideProps } from "next";
import Navbar from "../components/Navbar";
import { featureFlags } from "../config/featureFlags";

export const getServerSideProps: GetServerSideProps = async () => {
  if (!featureFlags.careers) {
    return { notFound: true };
  }
  return { props: {} };
};

export default function Careers() {
  return (
    <>
      <Navbar />
      <main>
        <div className="responsive-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="heading-main font-bold mb-6">Careers</h1>
          <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Join Our Team!</h2>
            <p className="mb-4">
              We’re always looking for talented designers, developers, and marketers.
              Send your CV and portfolio to{" "}
              <a
                href="mailto:jobs@webmob.com"
                className="text-blue-600"
              >
                jobs@webmob.com
              </a>
              .
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Frontend Developer</li>
              <li>UI/UX Designer</li>
              <li>Project Manager</li>
            </ul>
            <form>
              <label className="block mb-2 font-semibold">Your Name</label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                required
              />
              <label className="block mb-2 font-semibold">Email</label>
              <input
                type="email"
                className="w-full mb-4 p-2 border rounded"
                required
              />
              <label className="block mb-2 font-semibold">Upload CV</label>
              <input
                type="file"
                className="w-full mb-4"
                accept=".pdf,.doc,.docx"
              />
              <button
                type="submit"
                className="btn bg-blue-600 text-white w-full"
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}