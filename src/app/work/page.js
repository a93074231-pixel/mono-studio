
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "A different kind of bold.",
    category: "Branding",
    discipline: "Brand identity / Art direction",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=85",
    alt: "Contemporary art installation with expressive lighting",
    layout: "large",
    tone: "light",
  },
  {
    id: "02",
    title: "Digital with a pulse.",
    category: "Digital",
    discipline: "Digital experience / Motion",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1400&q=85",
    alt: "Immersive digital installation with colorful lights",
    layout: "small",
    tone: "dark",
  },
  {
    id: "03",
    title: "Built to move people.",
    category: "Campaigns",
    discipline: "Campaign / Creative direction",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=85",
    alt: "Colorful creative artwork and materials",
    layout: "small",
    tone: "light",
  },
  {
    id: "04",
    title: "A world of its own.",
    category: "Branding",
    discipline: "Visual identity / Packaging",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1400&q=85",
    alt: "Minimal architectural forms and modern visual composition",
    layout: "large",
    tone: "dark",
  },
  {
    id: "05",
    title: "Made for what comes next.",
    category: "Digital",
    discipline: "Web design / Development",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    alt: "Contemporary creative workspace with modern architecture",
    layout: "large",
    tone: "light",
  },
  {
    id: "06",
    title: "Colour outside the lines.",
    category: "Campaigns",
    discipline: "Art direction / Content",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1400&q=85",
    alt: "Bold abstract art with vivid colors",
    layout: "small",
    tone: "dark",
  },
];

const filters = ["All", "Branding", "Digital", "Campaigns"];

export default function WorkPage() {
  const pageRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeFilter
        );

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const introItems = page.querySelectorAll("[data-work-intro]");
      const cards = gsap.utils.toArray(
        page.querySelectorAll("[data-project-card]")
      );

      if (reduceMotion) {
        gsap.set([...introItems, ...cards], {
          autoAlpha: 1,
          y: 0,
          clearProps: "transform",
        });
        return;
      }

      // Hero introduction reveal.
      gsap.fromTo(
        introItems,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: page.querySelector("[data-work-hero]"),
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Reveal project cards when they enter the viewport.
      cards.forEach((card, index) => {
        const image = card.querySelector("[data-project-image]");
        const details = card.querySelector("[data-project-details]");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play reverse play reverse",
          },
        });

        timeline
          .fromTo(
            card,
            { autoAlpha: 0, y: 38 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              delay: (index % 2) * 0.08,
              ease: "power3.out",
            }
          )
          .fromTo(
            image,
            { scale: 1.06 },
            { scale: 1, duration: 0.9, ease: "power2.out" },
            "-=0.65"
          )
          .fromTo(
            details,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
            },
            "-=0.45"
          );
      });
    }, page);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen overflow-hidden bg-[#EFEFEF] text-[#151515]"
    >
      {/* Hero */}
      <section
        data-work-hero
        className="px-5 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:px-16 lg:pb-24 lg:pt-18"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-8 flex items-center justify-between gap-4">
            {/* <p
              data-work-intro
              className="flex items-center gap-3 text-[10px] uppercase tracking-[0.23em] text-black/55 sm:text-xs"
            >
              <span className="h-2 w-2 rounded-full bg-[#D253B6]" />
              MONO / Selected work
            </p>

            <p
              data-work-intro
              className="text-[10px] uppercase tracking-[0.18em] text-black/45 sm:text-xs"
            >
              Independent creative studio
            </p> */}
          </div>

          <h1
            data-work-intro
            className="max-w-[1300px] font-[var(--font-syne)] text-[clamp(4rem,12vw,11rem)] font-semibold leading-[0.8] tracking-[-0.09em]"
          >
            Work that
            <br />
            <span className="text-[#D253B6]">moves people.</span>
          </h1>

          <div className="mt-12 flex flex-col justify-between gap-6 border-t border-black/15 pt-6 sm:mt-16 md:flex-row md:items-end">
            <p
              data-work-intro
              className="max-w-lg text-sm leading-7 text-black/60 sm:text-base sm:leading-8"
            >
              A collection of ideas made tangible. We build identities,
              digital experiences, and campaigns that give ambitious
              brands a distinctive point of view.
            </p>

            <p
              data-work-intro
              className="text-xs uppercase tracking-[0.16em] text-black/50"
            >
              Selected projects / 2025—26
            </p>
          </div>
        </div>
      </section>

      {/* Project gallery */}
      <section
        aria-label="Portfolio projects"
        className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-16 lg:pb-40"
      >
        <div className="mx-auto max-w-[1600px]">
          {/* Filters */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-5 border-b border-black/15 pb-5 sm:mb-14">
            <div
              className="flex flex-wrap gap-2"
              aria-label="Filter projects"
            >
              {filters.map((filter) => {
                const selected = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full border px-4 py-2.5 text-xs transition-colors duration-300 sm:text-sm ${
                      selected
                        ? "border-[#151515] bg-[#151515] text-white"
                        : "border-black/20 text-black/65 hover:border-[#A11882] hover:text-[#A11882]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-black/50">
              {String(filteredProjects.length).padStart(2, "0")} projects
            </p>
          </div>

          {/* Asymmetrical editorial grid */}
          <div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:gap-y-20 md:grid-cols-2 md:gap-x-10 md:gap-y-24">
            {filteredProjects.map((project, index) => (
              <article
                key={project.id}
                data-project-card
                className={`group min-w-0 ${
                  project.layout === "small" ? "md:mt-20" : ""
                }`}
              >
                <a
                  href="/contact"
                  aria-label={`Enquire about a project like ${project.title}`}
                  className="block"
                >
                  {/* Artwork */}
                  <div
                    className={`relative isolate overflow-hidden bg-[#D8D2D7] ${
                      project.layout === "large"
                        ? "aspect-[1.12/1]"
                        : "aspect-[0.92/1]"
                    }`}
                  >
                    <img
                      data-project-image
                      src={project.image}
                      alt={project.alt}
                      loading={index < 2 ? "eager" : "lazy"}
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute left-4 right-4 top-4 flex items-center justify-between sm:left-6 sm:right-6 sm:top-6">
                      <span className="rounded-full border border-white/50 bg-black/10 px-3 py-2 text-[9px] uppercase tracking-[0.15em] text-white backdrop-blur-md sm:text-[10px]">
                        {project.category}
                      </span>

                      <span className="font-mono text-xs text-white">
                        / {project.id}
                      </span>
                    </div>

                    <span
                      aria-hidden="true"
                      className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/75 text-white transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-white group-hover:text-[#151515] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <path
                          d="M5 19 19 5M7 5h12v12"
                          stroke="currentColor"
                          strokeWidth="1.35"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Project details */}
                  <div
                    data-project-details
                    className="flex items-start justify-between gap-4 pt-5 sm:pt-7"
                  >
                    <div>
                      <p className="mb-3 text-[10px] uppercase tracking-[0.17em] text-black/45 sm:text-xs">
                        {project.discipline}
                      </p>

                      <h2 className="max-w-xl font-[var(--font-syne)] text-[clamp(1.8rem,3.5vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.065em] transition-colors duration-300 group-hover:text-[#A11882]">
                        {project.title}
                      </h2>
                    </div>

                    <span className="pt-1 text-xs text-black/45">
                      {project.year}
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>

          {/* Closing CTA */}
          <div className="mt-24 overflow-hidden bg-[#151515] px-6 py-12 text-[#EFEFEF] sm:mt-32 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <p className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/55 sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-[#D253B6]" />
              Have something in mind?
            </p>

            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <h2 className="max-w-4xl font-[var(--font-syne)] text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.08em]">
                Lets make
                <br />
                <span className="text-[#D253B6]">your next move.</span>
              </h2>

              <a
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-4 self-start border-b border-white/40 pb-3 text-sm transition-colors hover:border-[#D253B6] hover:text-[#D253B6] md:self-end"
              >
                Start a project
                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
