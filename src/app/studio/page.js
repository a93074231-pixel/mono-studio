
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    number: "01",
    title: "Think independently.",
    description:
      "We question the expected, look beyond the obvious, and search for the idea that makes a brand genuinely different.",
  },
  {
    number: "02",
    title: "Make it mean something.",
    description:
      "Good design is more than decoration. Every detail should have a purpose, every decision should have a reason.",
  },
  {
    number: "03",
    title: "Stay curious.",
    description:
      "We bring strategy, design, technology, and culture together to discover possibilities that others might miss.",
  },
  {
    number: "04",
    title: "Move with intention.",
    description:
      "From the first conversation to the final detail, we focus on making work that moves businesses and people forward.",
  },
];

export default function StudioPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const introItems = page.querySelectorAll("[data-studio-intro]");
      const statementWords = page.querySelectorAll("[data-studio-word]");
      const rows = page.querySelectorAll("[data-studio-principle]");

      if (reduceMotion) {
        gsap.set(
          [...introItems, ...statementWords, ...rows],
          { autoAlpha: 1, y: 0, clearProps: "transform" }
        );
        return;
      }

      gsap.fromTo(
        introItems,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: page.querySelector("[data-studio-hero]"),
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        statementWords,
        { autoAlpha: 0.18, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: page.querySelector("[data-studio-statement]"),
            start: "top 78%",
            end: "bottom 48%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );

      rows.forEach((row) => {
        const number = row.querySelector("[data-principle-number]");
        const title = row.querySelector("[data-principle-title]");
        const description = row.querySelector(
          "[data-principle-description]"
        );
        const divider = row.querySelector("[data-principle-divider]");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        });

        timeline
          .fromTo(
            number,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.4 }
          )
          .fromTo(
            divider,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.55,
              transformOrigin: "left center",
            },
            "-=0.2"
          )
          .fromTo(
            title,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.55 },
            "-=0.3"
          )
          .fromTo(
            description,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.25"
          );
      });
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen overflow-hidden bg-[#EFEFEF] text-[#151515]"
    >
      {/* Studio hero */}
      <section
        data-studio-hero
        className="px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40 lg:px-16 lg:pb-36 lg:pt-48"
      >
        <div className="mx-auto max-w-[1600px]">
          <p
            data-studio-intro
            className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.23em] text-black/55 sm:text-xs"
          >
            <span className="h-2 w-2 rounded-full bg-[#D253B6]" />
            Meet MONO / Independent by nature
          </p>

          <h1
            data-studio-intro
            className="max-w-[1300px] font-[var(--font-syne)] text-[clamp(4rem,12vw,11rem)] font-semibold leading-[0.8] tracking-[-0.09em]"
          >
            We see things
            <br />
            <span className="text-[#D253B6]">differently.</span>
          </h1>

          <div className="mt-12 grid gap-8 border-t border-black/15 pt-6 sm:mt-16 sm:grid-cols-2 sm:pt-8">
            <p
              data-studio-intro
              className="max-w-xl text-lg leading-relaxed tracking-[-0.035em] sm:text-2xl"
            >
              MONO is an independent creative studio for brands ready
              to think bigger, move forward, and stand apart.
            </p>

            <p
              data-studio-intro
              className="max-w-md text-sm leading-7 text-black/60 sm:justify-self-end sm:text-base sm:leading-8"
            >
              We bring clear thinking and expressive creativity together
              to build identities, digital experiences, and campaigns
              with a point of view.
            </p>
          </div>
        </div>
      </section>

      {/* Studio statement */}
      <section
        data-studio-statement
        className="bg-[#151515] px-5 py-24 text-[#EFEFEF] sm:px-8 sm:py-32 lg:px-16 lg:py-40"
      >
        <div className="mx-auto max-w-[1500px]">
          <p className="mb-10 text-[10px] uppercase tracking-[0.23em] text-white/50 sm:text-xs">
            What we believe
          </p>

          <h2 className="font-[var(--font-syne)] text-[clamp(3rem,8.8vw,8.5rem)] font-semibold leading-[0.94] tracking-[-0.085em]">
            <span data-studio-word className="inline-block">
              Less
            </span>{" "}
            <span
              data-studio-word
              className="inline-block text-[#D253B6]"
            >
              ordinary.
            </span>
            <br />
            <span data-studio-word className="inline-block">
              More
            </span>{" "}
            <span
              data-studio-word
              className="inline-block text-[#D253B6]"
            >
              meaning.
            </span>
          </h2>

          <p className="mt-10 max-w-lg text-sm leading-7 text-white/55 sm:mt-14 sm:text-base sm:leading-8">
            We believe the strongest creative work comes from asking
            better questions, making brave choices, and caring about
            the details that others overlook.
          </p>
        </div>
      </section>

      {/* Studio principles */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-14 flex flex-col justify-between gap-5 sm:mb-20 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.23em] text-black/50 sm:text-xs">
                Our point of view
              </p>

              <h2 className="font-[var(--font-syne)] text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.86] tracking-[-0.08em]">
                What drives us<span className="text-[#D253B6]">.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-black/55 sm:text-base">
              A few principles shape the way we think, collaborate,
              and bring ideas into the world.
            </p>
          </div>

          <div>
            {principles.map((principle) => (
              <article
                key={principle.number}
                data-studio-principle
                className="grid gap-5 py-7 sm:grid-cols-[80px_1fr] sm:gap-8 sm:py-10 md:grid-cols-[100px_1.1fr_0.9fr] md:gap-12"
              >
                <span
                  data-principle-number
                  className="font-mono text-xs text-[#A11882]"
                >
                  / {principle.number}
                </span>

                <div>
                  <div
                    data-principle-divider
                    className="mb-6 h-px w-full bg-black/20"
                  />

                  <h3
                    data-principle-title
                    className="font-[var(--font-syne)] text-[clamp(1.8rem,4vw,3.7rem)] font-medium leading-tight tracking-[-0.06em]"
                  >
                    {principle.title}
                  </h3>
                </div>

                <p
                  data-principle-description
                  className="max-w-md text-sm leading-7 text-black/60 sm:text-base sm:leading-8 md:pt-7"
                >
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-16 lg:pb-40">
        <div className="mx-auto max-w-[1500px] bg-[#D253B6] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <p className="mb-6 text-[10px] uppercase tracking-[0.22em] text-black/65 sm:text-xs">
            Good things start with a conversation
          </p>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-4xl font-[var(--font-syne)] text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.08em]">
              Have a good
              <br />
              feeling about this?
            </h2>

            <a
              href="/contact"
              className="group inline-flex items-center gap-4 self-start border-b border-black/50 pb-3 text-sm transition-colors hover:border-black md:self-end"
            >
              Lets talk
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
