
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const manifestoLines = [
  [
    { text: "We don't make", accent: false },
    { text: "more NOISE.", accent: true },
  ],
  [
    { text: "We make", accent: false },
    { text: "Our work", accent: true },
  ],
  [
    { text: "make NOISE", accent: true },
  ],
];

export default function Manifesto() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const intro = section.querySelectorAll("[data-manifesto-intro]");
      const words = section.querySelectorAll("[data-manifesto-word]");
      const closing = section.querySelector("[data-manifesto-closing]");

      if (reduceMotion) {
        gsap.set([...intro, ...words, closing].filter(Boolean), {
          autoAlpha: 1,
          y: 0,
          clearProps: "transform",
        });
        return;
      }

      // Small introductory details reveal as they enter the viewport.
      intro.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Words reveal progressively with scroll, and reverse naturally.
      gsap.fromTo(
        words,
        {
          autoAlpha: 0.15,
          y: 22,
        },
        {
          autoAlpha: 1,
          y: 0,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section.querySelector("[data-manifesto-statement]"),
            start: "top 78%",
            end: "bottom 48%",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        }
      );

      // Closing statement has its own reveal.
      if (closing) {
        gsap.fromTo(
          closing,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: closing,
              start: "top 88%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative z-10 overflow-hidden bg-[#EFEFEF] px-5 py-24 text-[#151515] sm:px-8 sm:py-32 md:py-10 lg:px-16 lg:py-18"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Intro */}
        <div className="mb-16 flex items-center justify-between gap-4 sm:mb-24">
          <p
            data-manifesto-intro
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.23em] text-black/60 sm:text-xs"
          >
            <span className="h-2 w-2 rounded-full bg-[#D253B6]" />
            A little about what moves us
          </p>

          <span
            data-manifesto-intro
            className="text-[10px] uppercase tracking-[0.2em] text-black/40 sm:text-xs"
          >
            The MONO manifesto / 01
          </span>
        </div>

        {/* Main statement */}
        <div
          data-manifesto-statement
          className="max-w-[1350px]"
        >
          {manifestoLines.map((line, lineIndex) => (
            <div
              key={lineIndex}
              className="flex flex-wrap items-baseline gap-x-[0.22em] overflow-hidden pb-[0.06em] font-[var(--font-syne)] text-[clamp(3.1rem,9.2vw,9rem)] font-semibold leading-[0.98] tracking-[-0.085em]"
            >
              {line.map((word, wordIndex) => (
                <span
                  key={`${lineIndex}-${wordIndex}`}
                  data-manifesto-word
                  className={
                    word.accent
                      ? "inline-block text-[#D253B6]"
                      : "inline-block"
                  }
                >
                  {word.text}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Supporting statement */}
        <div className="mt-16 grid gap-8 border-t border-black/15 pt-6 sm:mt-24 sm:grid-cols-2 sm:pt-8 md:mt-12">
          <p
            data-manifesto-closing
            className="max-w-xl text-lg leading-relaxed tracking-[-0.035em] sm:text-2xl md:text-3xl"
          >
            We turn ambitious ideas into brands and digital experiences
            people remember.
          </p>

          <div className="flex flex-col justify-between gap-6 sm:items-end sm:text-right">
            <p
              data-manifesto-intro
              className="max-w-sm text-sm leading-7 text-black/55 sm:text-base"
            >
              Independent thinking. Unexpected ideas. Work with a point
              of view. We believe the best creative work doesnt follow
              the noise — it gives people something worth noticing.
            </p>

            <a
              href="#services"
              className="group inline-flex items-center gap-4 self-start border-b border-black/30 pb-3 text-sm transition-colors duration-300 hover:border-[#A11882] hover:text-[#A11882] sm:self-end"
            >
              See what we do
              <span
                aria-hidden="true"
                className="inline-block text-lg transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
