
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    eyebrow: "Find the difference",
    title: "Brand worlds",
    tags: ["Positioning", "Identity systems", "Art direction"],
    description:
      "A point of view people can recognise. We turn what makes you different into a clear strategy and a visual identity with staying power.",
    video: "/videos/Branding-1.mp4",
    accent: "#D253B6",
    shape: "rounded-tl-[64px] rounded-br-[64px]",
  },
  {
    number: "02",
    eyebrow: "Make it useful",
    title: "Digital places",
    tags: ["Web design", "Development", "Motion systems"],
    description:
      "Digital experiences with a little more feeling and a lot more intention — designed to be explored, understood and remembered.",
    video: "/videos/Branding%202.mp4",
    accent: "#A11882",
    shape: "rounded-tl-[64px] rounded-br-[64px]",
  },
  {
    number: "03",
    eyebrow: "Keep it moving",
    title: "Creative momentum",
    tags: ["Campaigns", "Content", "Growth strategy"],
    description:
      "Big ideas should travel. We create the stories, campaigns and digital moments that help brands build momentum beyond launch day.",
    video: "/videos/Brand%203.mp4",
    accent: "#D253B6",
    shape: "rounded-tl-[64px] rounded-br-[64px]"
    // shape: "rounded-tl-[100px] rounded-br-[100px]",
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (
      !section ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-services-intro]"),
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play reverse play reverse"
          },
        }
      );

      section.querySelectorAll("[data-service-row]").forEach((row) => {
        const media = row.querySelector("[data-service-media]");
        const copy = row.querySelector("[data-service-copy]");
        const isReverse = row.dataset.reverse === "true";

        gsap.fromTo(
          media,
          {
            clipPath: isReverse
              ? "inset(0 0 0 100%)"
              : "inset(0 100% 0 0)",
            scale: 0.96,
          },
          {
            clipPath: "inset(0 0% 0 0%)",
            scale: 1,
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              toggleActions: "play reverse play reverse"
            },
          }
        );

        gsap.fromTo(
          copy,
          { x: isReverse ? -34 : 34, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, section);
    

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative px-5 pb-20 pt-16 text-[#151515] sm:px-8 md:px-[7.5%] md:pb-28 md:pt-24"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex items-end justify-between gap-5 border-b border-black/20 pb-7 md:mb-20 md:pb-10">
          <div>
            <p
              data-services-intro
              className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-black/60 sm:text-xs"
            >
              <span className="h-2 w-2 rounded-full bg-[#D253B6]" />
              What we bring to the table
            </p>

            <h2
              data-services-intro
              className="font-[var(--font-syne)] text-[clamp(3rem,9vw,9rem)] font-semibold leading-[0.8] tracking-[-0.085em]"
            >
              SERVICES<span className="text-[#D253B6]">.</span>
            </h2>
          </div>

          <p
            data-services-intro
            className="hidden max-w-[220px] pb-1 text-sm leading-6 text-black/60 sm:block md:text-base"
          >
            Three connected disciplines. One unmistakable point of view.
          </p>
        </div>

        <div className="space-y-20 md:space-y-28">
          {services.map((service, index) => (
            <article
              key={service.number}
              data-service-row
              data-reverse={index % 2 === 1 ? "true" : "false"}
              className="grid gap-8 md:grid-cols-12 md:items-center md:gap-10"
            >
              <div
                data-service-media
                className={`relative min-h-[260px] overflow-hidden bg-white/70 ${service.shape} md:col-span-7 md:min-h-[380px] lg:min-h-[440px] ${
                index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-black/10 bg-[#EFEFEF]/80 px-3 py-2 text-[10px] uppercase tracking-[0.16em] backdrop-blur sm:left-7 sm:top-7 sm:text-xs">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: service.accent }}
                  />
                  MONO / {service.number}
                </div>

                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={service.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`${service.title} creative showcase`}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                <span
                  aria-hidden="true"
                  className="absolute bottom-4 right-6 font-[var(--font-syne)] text-[clamp(5rem,12vw,11rem)] font-semibold leading-none tracking-[-0.1em] text-white/80 mix-blend-screen md:bottom-7 md:right-9"
                >
                  {service.number}
                </span>
              </div>

              <div
                data-service-copy
                className={`flex flex-col items-start md:col-span-5 ${
                  index % 2 === 1 ? "md:order-1 md:pl-3" : "md:pl-3"
                }`}
              >
                <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-black/50 sm:text-xs">
                  {service.eyebrow}
                </p>

                <h3 className="max-w-[560px] font-[var(--font-syne)] text-[clamp(2.5rem,4.5vw,4.8rem)] font-semibold leading-[0.9] tracking-[-0.075em]">
                  {service.title}
                  <span style={{ color: service.accent }}>.</span>
                </h3>

                <div className="mt-7 flex  flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border bg-[#FFE4F6]  border-black/15 px-3 py-2 text-[10px] text-black/70 sm:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-7 max-w-[440px] text-sm leading-7 text-black/65 sm:text-base sm:leading-8">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="group mt-8 inline-flex items-center gap-5 border-b border-black/40 pb-3 text-sm transition-colors hover:border-[#A11882] hover:text-[#A11882] sm:text-base"
                >
                  Let&apos;s make something
                  <span
    aria-hidden="true"
    className="inline-block text-xl font-light transition-transform duration-300 ease-out group-hover:translate-x-1"
  >
    ↗
  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
