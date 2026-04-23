import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { IoClose } from "react-icons/io5";

// Initialize EmailJS with your public key
emailjs.init("CU7apBG1IJ-akGZY9");

export const QueryPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const form = formRef.current!;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    const templateParams = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      title: "New Query from Portfolio",
      message: phone ? `Phone: ${phone}\n\n${message}` : message,
    };

    emailjs
      .send("service_aston3931d", "template_dsnushy", templateParams)
      .then(
        (result) => {
          setLoading(false);
          setSuccess(true);
          form.reset();
          setTimeout(() => {
            onClose();
            setSuccess(false);
          }, 3000);
        },
        (err) => {
          setLoading(false);
          setError(err?.text || err?.message || JSON.stringify(err) || "Something went wrong.");
          console.error("EmailJS Error:", err);
        }
      );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md relative bg-[#151513]/90 glass-card rounded-2xl p-8 border border-white/10 shadow-[0_0_40px_rgba(119,123,126,0.2)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-white">Send Query</h2>

        {success ? (
          <div className="text-center py-8">
            <div className="text-emerald-400 text-xl font-medium mb-2">Message Sent Successfully!</div>
            <p className="text-white/60">I will get back to you as soon as possible.</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm text-white/70">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#777B7E] transition-colors"
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm text-white/70">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#777B7E] transition-colors"
                placeholder="Your email address"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-sm text-white/70">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#777B7E] transition-colors"
                placeholder="Your phone number (optional)"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-sm text-white/70">Description</label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#777B7E] transition-colors resize-none"
                placeholder="How can we collaborate?"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-[#777B7E] hover:bg-[#5b5b5c] text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
