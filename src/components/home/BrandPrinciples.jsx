
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    number: "01",
    title: "Make it mean something.",
    description:
      "Strategy before decoration. We find the sharpest truth in your brand and build everything around it.",
  },
  {
    number: "02",
    title: "Make it impossible to ignore.",
    description:
      "A distinct visual world, confident words and details people remember long after the first look.",
  },
  {
    number: "03",
    title: "Make every move count.",
    description:
      "Useful digital experiences that connect creative ambition with real-world business momentum.",
  },
];

export default function BrandPrinciples() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const introItems = section.querySelectorAll("[data-principle-intro]");
      const rows = section.querySelectorAll("[data-principle-row]");

      if (reduceMotion) {
        gsap.set([...introItems, ...rows], {
          autoAlpha: 1,
          y: 0,
        });
        return;
      }

      // Keep content visible until its own reveal animation starts.
      gsap.set(introItems, {
        autoAlpha: 1,
        y: 0,
      });

      gsap.set(rows, {
        autoAlpha: 1,
        y: 0,
      });

      // Animate each introductory element only when it approaches view.
      introItems.forEach((item) => {
        gsap.fromTo(
          item,
          {
            autoAlpha: 0,
            y: 32,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Each principle enters independently and replays on return.
      rows.forEach((row) => {
        const title = row.querySelector("[data-principle-title]");
        const description = row.querySelector(
          "[data-principle-description]"
        );
        const number = row.querySelector("[data-principle-number]");
        const line = row.querySelector("[data-principle-line]");

        const rowTimeline = gsap.timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
          },
        });

        rowTimeline
          .fromTo(
            number,
            { autoAlpha: 0, x: -16 },
            { autoAlpha: 1, x: 0, duration: 0.45 }
          )
          .fromTo(
            line,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.5 },
            "-=0.25"
          )
          .fromTo(
            title,
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.65 },
            "-=0.2"
          )
          .fromTo(
            description,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            "-=0.35"
          );

        ScrollTrigger.create({
          trigger: row,
          start: "top 82%",
          end: "bottom 18%",
          onEnter: () => rowTimeline.restart(),
          onEnterBack: () => rowTimeline.restart(),
          onLeave: () => rowTimeline.pause(0),
          onLeaveBack: () => rowTimeline.pause(0),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="agency"
      className="relative px-5 py-24 text-[#151515] sm:px-8 md:px-[7.5%] md:py-16"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Section introduction */}
        <div className="grid gap-8 border-b border-black/20 pb-12 md:grid-cols-12 md:gap-10 md:pb-16">
          <div className="md:col-span-8">
            <p
              data-principle-intro
              className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-black/60 sm:text-xs"
            >
              <span className="h-2 w-2 rounded-full bg-[#D253B6]" />
              The MONO point of view
            </p>

            <h2
              data-principle-intro
              className="max-w-[980px] font-[var(--font-syne)] text-[clamp(2.7rem,7.5vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.075em]"
            >
              Good work looks good.
              <span className="block text-[#A11882]">
                Great work moves people.
              </span>
            </h2>
          </div>

          <div className="flex items-end md:col-span-4 md:justify-end">
            <p
              data-principle-intro
              className="max-w-[350px] text-sm leading-7 text-black/65 sm:text-base"
            >
              We bring strategy, identity and digital craft into one connected
              process — made for brands ready to go somewhere new.
            </p>
          </div>
        </div>

        {/* Principles */}
        <div className="mt-5">
          {principles.map((principle) => (
            <article
              key={principle.number}
              data-principle-row
              className="group grid gap-5 border-b border-black/20 py-8 transition-colors duration-500 hover:bg-white/35 sm:py-10 md:grid-cols-12 md:items-center md:gap-8 md:py-12"
            >
              <div className="flex items-center gap-4 md:col-span-2">
                <span
                  data-principle-number
                  className="text-xs tabular-nums text-black/50"
                >
                  {principle.number}
                </span>

                <span
                  data-principle-line
                  className="h-px w-8 origin-left bg-[#D253B6] transition-[width] duration-500 group-hover:w-14"
                />
              </div>

              <h3
                data-principle-title
                className="font-[var(--font-syne)] text-[clamp(1.8rem,4vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.065em] md:col-span-6"
              >
                {principle.title}
              </h3>

              <p
                data-principle-description
                className="max-w-[390px] text-sm leading-6 text-black/60 sm:text-base sm:leading-7 md:col-span-3"
              >
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
