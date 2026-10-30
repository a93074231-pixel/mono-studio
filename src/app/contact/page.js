
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projectTypes = [
  "Brand identity",
  "Website design",
  "Web development",
  "Digital experience",
  "Campaign / Art direction",
  "Something else",
];

const budgets = [
  "Under ₹1 lakh",
  "₹1–3 lakh",
  "₹3–5 lakh",
  "₹5–10 lakh",
  "₹10 lakh+",
  "Let's discuss",
];

export default function ContactPage() {
  const pageRef = useRef(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-hero-item",
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
        }
      );

      gsap.utils.toArray(".contact-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  function toggleProjectType(type) {
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type]
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const company = formData.get("company") || "Not provided";
    const message = formData.get("message");
    const timeline = formData.get("timeline") || "Not specified";

    const subject = encodeURIComponent(
      `New project inquiry from ${name}`
    );

    const body = encodeURIComponent(
      `Hello MONO,\n\nI'd like to discuss a project.\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Company: ${company}\n` +
        `Project type: ${selectedTypes.join(", ") || "Not specified"}\n` +
        `Budget: ${budget || "Not specified"}\n` +
        `Timeline: ${timeline}\n\n` +
        `Project details:\n${message}\n`
    );

    window.location.href = `mailto:hello@mono.studio?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#EFEFEF] text-[#151515]"
    >
      {/* Hero */}
      <section className="bg-[#D253B6] px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44 lg:px-12 lg:pt-25">
        <div className="mx-auto max-w-[1600px]">
          <div className="contact-hero-item mb-7 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#151515]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs">
              Have a good one in mind?
            </p>
          </div>

          <h1 className="contact-hero-item font-[var(--font-syne)] text-[clamp(4rem,13vw,12rem)] font-bold leading-[0.8] tracking-[-0.09em]">
            Lets talk
            <br />
            about it<span className="text-[#EFEFEF]"></span>
          </h1>

          <div className="contact-hero-item mt-12 flex flex-col justify-between gap-6 border-t border-[#151515]/30 pt-6 sm:mt-16 md:flex-row md:items-end">
            <p className="max-w-xl text-base leading-7 text-[#151515]/75 sm:text-lg sm:leading-8">
              Big idea, small beginning, or something in between? Tell us
              what you are thinking. We will take it from there.
            </p>

            <span className="text-[10px] uppercase tracking-[0.2em] sm:text-xs">
              New business enquiries — 01
            </span>
          </div>
        </div>
      </section>

      {/* Contact details and form */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          {/* Left column */}
          <aside className="contact-reveal">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A11882] sm:text-xs">
              The first step
            </p>

            <h2 className="max-w-lg font-[var(--font-syne)] text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-5xl lg:text-6xl">
              Good things start with a conversation.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#151515]/60 sm:text-base sm:leading-8">
              Share a little about your project, where you want to go, and
              what you are hoping to make happen. No complicated process.
              Just a good conversation.
            </p>

            <div className="mt-12 border-t border-[#151515]/20 pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#151515]/45">
                Email us directly
              </p>

              <a
                href="mailto:hello@mono.studio"
                className="mt-3 inline-block break-all font-[var(--font-syne)] text-xl font-semibold tracking-[-0.04em] transition-colors hover:text-[#A11882] sm:text-2xl"
              >
                hello@mono.studio
              </a>
            </div>

            <div className="mt-9 border-t border-[#151515]/20 pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#151515]/45">
                Based in
              </p>

              <p className="mt-3 font-[var(--font-syne)] text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
                Hyderabad, India
              </p>
              <p className="mt-2 text-sm text-[#151515]/55">
                Working everywhere.
              </p>
            </div>

            <div className="mt-9 border-t border-[#151515]/20 pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#151515]/45">
                The kind of work we do
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Branding", "Digital", "Creative", "Development"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#151515]/20 px-4 py-2 text-xs"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </aside>

          {/* Right column: project form */}
          <div className="contact-reveal">
            <div className="mb-8 flex items-center justify-between border-b border-[#151515]/20 pb-5">
              <h2 className="font-[var(--font-syne)] text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                Tell us about it.
              </h2>

              <span className="text-[10px] uppercase tracking-[0.18em] text-[#151515]/45">
                Project enquiry
              </span>
            </div>

            {submitted && (
              <div
                role="status"
                className="mb-6 rounded-xl border border-[#A11882]/30 bg-[#D253B6]/10 p-4 text-sm leading-6"
              >
                Your email app should open with your project details. Please
                send the prepared email to complete your enquiry.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-9">
              {/* Name and email */}
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em]"
                  >
                    Your name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="What should we call you?"
                    autoComplete="name"
                    required
                    className="w-full border-b border-[#151515]/25 bg-transparent py-4 text-sm outline-none transition-colors placeholder:text-[#151515]/35 focus:border-[#A11882]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em]"
                  >
                    Email address *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full border-b border-[#151515]/25 bg-transparent py-4 text-sm outline-none transition-colors placeholder:text-[#151515]/35 focus:border-[#A11882]"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em]"
                >
                  Company or brand
                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Where are you creating from?"
                  autoComplete="organization"
                  className="w-full border-b border-[#151515]/25 bg-transparent py-4 text-sm outline-none transition-colors placeholder:text-[#151515]/35 focus:border-[#A11882]"
                />
              </div>

              {/* Project type */}
              <fieldset>
                <legend className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em]">
                  What do you need help with?
                </legend>

                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type) => {
                    const selected = selectedTypes.includes(type);

                    return (
                      <button
                        key={type}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleProjectType(type)}
                        className={`rounded-full border px-4 py-3 text-xs transition-all duration-300 sm:text-sm ${
                          selected
                            ? "border-[#151515] bg-[#151515] text-[#EFEFEF]"
                            : "border-[#151515]/20 bg-transparent hover:border-[#A11882] hover:text-[#A11882]"
                        }`}
                      >
                        {selected && (
                          <span className="mr-2 text-[#D253B6]">✓</span>
                        )}
                        {type}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Budget */}
              <fieldset>
                <legend className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em]">
                  Estimated project budget
                </legend>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {budgets.map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={budget === item}
                      onClick={() => setBudget(item)}
                      className={`border px-3 py-3.5 text-left text-xs transition-all duration-300 ${
                        budget === item
                          ? "border-[#A11882] bg-[#D253B6]/15 text-[#A11882]"
                          : "border-[#151515]/20 hover:border-[#A11882]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Timeline */}
              <div>
                <label
                  htmlFor="timeline"
                  className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em]"
                >
                  When are you looking to start?
                </label>

                <select
                  id="timeline"
                  name="timeline"
                  defaultValue=""
                  className="w-full appearance-none border-b border-[#151515]/25 bg-transparent py-4 text-sm outline-none transition-colors focus:border-[#A11882]"
                >
                  <option value="" disabled>
                    Select a rough timeline
                  </option>
                  <option value="As soon as possible">As soon as possible</option>
                  <option value="Within a month">Within a month</option>
                  <option value="Within 1–3 months">Within 1–3 months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em]"
                >
                  Tell us a little more *
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="What's the idea, the challenge, or the ambition?"
                  className="w-full resize-y border-b border-[#151515]/25 bg-transparent py-4 text-sm leading-7 outline-none transition-colors placeholder:text-[#151515]/35 focus:border-[#A11882]"
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col items-start justify-between gap-5 border-t border-[#151515]/20 pt-7 sm:flex-row sm:items-center">
                <p className="max-w-xs text-xs leading-6 text-[#151515]/50">
                  By submitting, you will prepare an email with your project
                  details in your default email application.
                </p>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-between gap-8 rounded-full bg-[#151515] px-6 py-4 text-sm text-white transition-colors duration-300 hover:bg-[#A11882] sm:w-auto"
                >
                  Send your enquiry
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Closing section */}
      <section className="bg-[#151515] px-5 py-16 text-[#EFEFEF] sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="contact-reveal mx-auto flex max-w-[1600px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-white/50 sm:text-xs">
              Until then
            </p>

            <h2 className="max-w-3xl font-[var(--font-syne)] text-4xl font-semibold leading-[0.95] tracking-[-0.065em] sm:text-6xl lg:text-7xl">
              Good work starts
              <br />
              with good people<span className="text-[#D253B6]">.</span>
            </h2>
          </div>

          <Link
            href="/work"
            className="group flex w-fit items-center gap-4 border-b border-white/30 pb-3 text-sm transition-colors hover:border-[#D253B6] hover:text-[#D253B6]"
          >
            See what we do
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
