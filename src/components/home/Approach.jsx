
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discover",
    accent: "Understand.",
    description:
      "Before we make anything, we get curious. We learn about your business, your audience, your ambitions, and the challenge hiding beneath the brief.",
    deliverable: "Research / Discovery",
  },
  {
    number: "02",
    title: "Define",
    accent: "Find the idea.",
    description:
      "We turn what we learn into a clear direction. The right strategy gives every creative decision a reason to exist and every idea a purpose.",
    deliverable: "Strategy / Direction",
  },
  {
    number: "03",
    title: "Create",
    accent: "Make it matter.",
    description:
      "This is where thinking becomes tangible. We bring identity, design, technology, and motion together to create experiences with character.",
    deliverable: "Design / Development",
  },
  {
    number: "04",
    title: "Deliver",
    accent: "Move forward.",
    description:
      "We bring the work into the world, refine the details, and help your brand make the most of every opportunity beyond launch day.",
    deliverable: "Launch / Evolution",
  },
];

export default function Approach() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const introItems = section.querySelectorAll(
        "[data-approach-intro]"
      );
      const rows = gsap.utils.toArray(
        section.querySelectorAll("[data-approach-step]")
      );

      if (reduceMotion) {
        gsap.set([...introItems, ...rows], {
          autoAlpha: 1,
          y: 0,
          clearProps: "transform",
        });

        if (progressRef.current) {
          gsap.set(progressRef.current, {
            scaleY: 1,
          });
        }

        return;
      }

      // Section heading reveals.
      introItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Draw the timeline line as the user scrolls through the section.
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 55%",
              end: "bottom 70%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Each process step reveals independently.
      rows.forEach((row) => {
        const number = row.querySelector("[data-step-number]");
        const content = row.querySelector("[data-step-content]");
        const line = row.querySelector("[data-step-divider]");

        const timeline = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });

        timeline
          .fromTo(
            number,
            { autoAlpha: 0.25, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.55 }
          )
          .fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.55,
              transformOrigin: "left center",
            },
            "-=0.3"
          )
          .fromTo(
            content,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.65 },
            "-=0.25"
          );

        ScrollTrigger.create({
          trigger: row,
          start: "top 82%",
          onEnter: () => timeline.restart(),
          onEnterBack: () => timeline.restart(),
          onLeave: () => timeline.pause(0),
          onLeaveBack: () => timeline.pause(0),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative z-10 overflow-hidden bg-[#151515] px-5 py-24 text-[#EFEFEF] sm:px-8 sm:py-32 md:py-40 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Section heading */}
        <div className="mb-20 flex flex-col justify-between gap-8 border-b border-white/20 pb-8 sm:mb-28 sm:pb-10 md:flex-row md:items-end">
          <div>
            <p
              data-approach-intro
              className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.23em] text-white/55 sm:text-xs"
            >
              <span className="h-2 w-2 rounded-full bg-[#D253B6]" />
              A good idea needs a good process
            </p>

            <h2
              data-approach-intro
              className="font-[var(--font-syne)] text-[clamp(3.5rem,9vw,8.5rem)] font-semibold leading-[0.85] tracking-[-0.085em]"
            >
              How we
              <br />
              <span className="text-[#D253B6]">make it happen.</span>
            </h2>
          </div>

          <p
            data-approach-intro
            className="max-w-sm text-sm leading-7 text-white/55 sm:text-base"
          >
            Good work doesnt happen by accident. We bring curiosity,
            clarity, and craft together to move every idea forward.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline track */}
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-[22px] top-0 w-px bg-white/15 sm:left-[31px] md:left-[47px]"
          >
            <div
              ref={progressRef}
              className="absolute inset-0 origin-top bg-[#D253B6]"
            />
          </div>

          <div className="space-y-16 sm:space-y-20 md:space-y-24">
            {steps.map((step) => (
              <article
                key={step.number}
                data-approach-step
                className="relative grid grid-cols-[46px_minmax(0,1fr)] gap-5 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-8 md:grid-cols-[96px_minmax(0,1fr)] md:gap-12"
              >
                {/* Number */}
                <div className="relative z-10 flex items-start justify-center">
                  <span
                    data-step-number
                    className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-white/20 bg-[#151515] font-mono text-xs text-[#D253B6] sm:h-[64px] sm:w-[64px] sm:text-sm md:h-[80px] md:w-[80px] md:text-base"
                  >
                    {step.number}
                  </span>
                </div>

                {/* Step content */}
                <div data-step-content className="min-w-0 pb-2">
                  <div
                    data-step-divider
                    className="mb-6 h-px w-full bg-white/20"
                  />

                  <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
                    <div>
                      <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-white/45 sm:text-xs">
                        {step.deliverable}
                      </p>

                      <h3 className="font-[var(--font-syne)] text-[clamp(2.7rem,6vw,6rem)] font-semibold leading-[0.9] tracking-[-0.075em]">
                        {step.title}
                        <span className="text-[#D253B6]">.</span>
                      </h3>

                      <p className="mt-4 text-sm font-medium text-[#D253B6] sm:text-base">
                        {step.accent}
                      </p>
                    </div>

                    <p className="max-w-lg text-sm leading-7 text-white/60 sm:text-base sm:leading-8 md:pt-8">
                      {step.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Closing line */}
        <div className="mt-12 border-t border-white/20 pt-6 sm:mt-16 sm:pt-8">
          <p className="max-w-3xl font-[var(--font-syne)] text-2xl leading-tight tracking-[-0.045em] sm:text-4xl md:text-5xl">
            Different stages. One shared ambition.{" "}
            <span className="text-[#D253B6]">Better work.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
