import Navbar from "../components/Navbar";
import { useState } from "react";
import type { GetServerSideProps } from "next";
import { featureFlags } from "../config/featureFlags";

export const getServerSideProps: GetServerSideProps = async () => {
  if (!featureFlags.quote) {
    return { notFound: true };
  }
  return { props: {} };
};

type Step = 1 | 2 | 3 | 4 | 5;

const initialForm = {
  projectType: "",
  features: "",
  timeline: "",
  budget: "",
  name: "",
  email: "",
  file: null as File | null,
};

export default function Quote() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState(initialForm);
  const [estimate, setEstimate] = useState<number | null>(null);

  // Simple estimation logic (for demo)
  const calculateEstimate = () => {
    let base = 1000;
    if (form.projectType === "Website") base += 500;
    if (form.projectType === "Web App") base += 1500;
    if (form.projectType === "Mobile App") base += 2000;
    if (form.features.includes("E-commerce")) base += 1000;
    if (form.features.includes("Branding")) base += 800;
    setEstimate(base);
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let file: File | null = null;
    if (
      e.target instanceof HTMLInputElement &&
      e.target.type === "file" &&
      e.target.files &&
      e.target.files.length > 0
    ) {
      file = e.target.files[0];
    }
    setForm((prev) => ({
      ...prev,
      [name]: file ? file : value,
    }));
  };

  // Next step logic
  const nextStep = () => {
    if (step === 3) calculateEstimate();
    setStep((prev) => (prev < 5 ? (prev + 1) as Step : prev));
  };

  const prevStep = () => setStep((prev) => (prev > 1 ? (prev - 1) as Step : prev));

  // Submit handler (demo)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Quote request submitted!");
    setStep(1);
    setForm(initialForm);
    setEstimate(null);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="responsive-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="heading-main font-bold mb-6">Request a Quote</h1>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <section>
                  <label className="block mb-2 font-semibold">Project Type</label>
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="Website">Website</option>
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Branding">Branding</option>
                  </select>
                  <button type="button" className="btn" onClick={nextStep}>
                    Next
                  </button>
                </section>
              )}

              {step === 2 && (
                <section>
                  <label className="block mb-2 font-semibold">Features / Requirements</label>
                  <textarea
                    name="features"
                    value={form.features}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded"
                    placeholder="Describe features (e.g., E-commerce, Blog, Branding)"
                    required
                  />
                  <button type="button" className="btn mr-2" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="btn" onClick={nextStep}>
                    Next
                  </button>
                </section>
              )}

              {step === 3 && (
                <section>
                  <label className="block mb-2 font-semibold">Timeline</label>
                  <input
                    type="text"
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded"
                    placeholder="e.g., 4 weeks"
                    required
                  />
                  <label className="block mb-2 font-semibold">Budget (USD)</label>
                  <input
                    type="number"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded"
                    placeholder="e.g., 5000"
                    required
                  />
                  <button type="button" className="btn mr-2" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="btn" onClick={nextStep}>
                    Next
                  </button>
                </section>
              )}

              {step === 4 && (
                <section>
                  <label className="block mb-2 font-semibold">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded"
                    required
                  />
                  <label className="block mb-2 font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded"
                    required
                  />
                  <label className="block mb-2 font-semibold">Upload Brief/Reference (optional)</label>
                  <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    className="w-full mb-4"
                    accept=".pdf,.doc,.docx,.png,.jpg"
                  />
                  <button type="button" className="btn mr-2" onClick={prevStep}>
                    Back
                  </button>
                  <button type="button" className="btn" onClick={nextStep}>
                    Next
                  </button>
                </section>
              )}

              {step === 5 && (
                <section>
                  <h2 className="text-lg font-semibold mb-2">Summary</h2>
                  <ul className="mb-4">
                    <li>
                      <strong>Project Type:</strong> {form.projectType}
                    </li>
                    <li>
                      <strong>Features:</strong> {form.features}
                    </li>
                    <li>
                      <strong>Timeline:</strong> {form.timeline}
                    </li>
                    <li>
                      <strong>Budget:</strong> ${form.budget}
                    </li>
                    <li>
                      <strong>Name:</strong> {form.name}
                    </li>
                    <li>
                      <strong>Email:</strong> {form.email}
                    </li>
                    <li>
                      <strong>Estimate:</strong> {estimate ? `$${estimate}` : "Calculating..."}
                    </li>
                  </ul>
                  <button type="button" className="btn mr-2" onClick={prevStep}>
                    Back
                  </button>
                  <button type="submit" className="btn bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 transition-all">
                    Submit Request
                  </button>
                </section>
              )}
            </form>
          </div>
        </div>
      </main>
    </>
  );
}