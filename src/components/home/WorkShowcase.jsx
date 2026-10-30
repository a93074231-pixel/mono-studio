
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    name: "A different kind of bold.",
    category: "Brand identity / Art direction",
    label: "Brand worlds",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Expressive contemporary art installation",
    background: "#D253B6",
    text: "#151515",
    size: "wide",
  },
  {
    number: "02",
    name: "Digital with a pulse.",
    category: "Digital experience / Motion",
    label: "Digital places",
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Immersive digital art and light installation",
    background: "#252124",
    text: "#FFFFFF",
    size: "tall",
  },
  {
    number: "03",
    name: "Built to move people.",
    category: "Campaign / Creative direction",
    label: "Creative momentum",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Bold visual art direction for a creative campaign",
    background: "#E7DDE5",
    text: "#151515",
    size: "wide",
  },
  {
    number: "04",
    name: "Make room for more.",
    category: "Creative strategy / Experience",
    label: "New perspectives",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Colorful creative artwork and materials",
    background: "#A11882",
    text: "#FFFFFF",
    size: "tall",
  },
];

export default function WorkShowcase() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;

    if (!section || !stage || !track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    let horizontalTween;

    const ctx = gsap.context(() => {
      const headingItems = section.querySelectorAll(
        "[data-work-heading]"
      );

      const cards = gsap.utils.toArray(
        section.querySelectorAll("[data-work-card]")
      );

      // Reveal the section introduction when it enters the viewport.
      headingItems.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
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

      // The horizontal track is driven by vertical scrolling.
      const getTravelDistance = () =>
        Math.max(0, track.scrollWidth - stage.clientWidth);

      horizontalTween = gsap.to(track, {
        x: () => -getTravelDistance(),
        ease: "none",
        scrollTrigger: {
          id: "mono-horizontal-work",
          trigger: stage,
          start: "top top",
          end: () => `+=${getTravelDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, {
                scaleX: self.progress,
              });
            }

            if (counterRef.current) {
              const activeIndex = Math.min(
                cards.length,
                Math.floor(self.progress * cards.length) + 1
              );

              counterRef.current.textContent = String(
                activeIndex
              ).padStart(2, "0");
            }
          },
        },
      });

      // Gentle image parallax as each project travels across the screen.
      cards.forEach((card) => {
        const image = card.querySelector("[data-work-image]");
        const details = card.querySelector("[data-work-details]");

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.12, xPercent: -3 },
            {
              scale: 1,
              xPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left right",
                end: "right left",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        if (details) {
          gsap.fromTo(
            details,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 78%",
                end: "left 38%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      // Recalculate distances after responsive layout changes.
      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative z-10 bg-[#151515] text-[#EFEFEF]"
    >
      {/* Section introduction */}
      <div className="px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12 lg:px-16 lg:pt-16">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p
              data-work-heading
              className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-white/60 sm:text-xs"
            >
              <span className="h-2 w-2 rounded-full bg-[#D253B6]" />
              MONO / Selected work
            </p>

            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45 sm:text-xs">
              Independent thinking. Distinctive work.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2
              data-work-heading
              className="max-w-5xl font-[var(--font-syne)] text-[clamp(3.5rem,10vw,10rem)] font-semibold leading-[0.82] tracking-[-0.09em]"
            >
              Made to
              <br />
              <span className="text-[#D253B6]">stand out .</span>
            </h2>

            <p
              data-work-heading
              className="max-w-[280px] text-sm leading-7 text-white/60 md:pb-2"
            >
              A collection of ideas, identities and experiences
              built to make people look twice.
            </p>
          </div>
        </div>
      </div>

      {/* Pinned horizontal portfolio */}
      <div
        ref={stageRef}
        className="relative flex min-h-[68svh] flex-col justify-between overflow-hidden py-5 sm:min-h-[72svh] sm:py-6 md:min-h-[76svh] md:py-8"
      >
        <div
          ref={trackRef}
          className="flex w-max items-center gap-5 px-5 sm:gap-8 sm:px-8 lg:gap-10 lg:px-16"
        >
          {projects.map((project, index) => (
            <article
              key={project.number}
              data-work-card
              className="relative w-[72vw] max-w-[620px] shrink-0 sm:w-[58vw] md:w-[48vw] lg:w-[42vw]"
            >
              {/* Artwork */}
              <a
                href="#contact"
                aria-label={`Discuss a project like ${project.name}`}
                className="group block"
              >
                <div
                  className={`relative isolate overflow-hidden ${
                    project.size === "tall"
                      ? "aspect-[0.9/1] md:aspect-[0.9/1]"
                      : "aspect-[1.15/1] md:aspect-[1.2/1]"
                  }`}
                  style={{ backgroundColor: project.background }}
                >
                  <img
                    data-work-image
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Top label */}
                  <div className="absolute left-4 right-4 top-4 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7">
                    <span className="rounded-full border border-white/50 bg-black/10 px-3 py-2 text-[9px] uppercase tracking-[0.17em] text-white backdrop-blur-md sm:text-[10px]">
                      {project.label}
                    </span>

                    <span className="text-xs tracking-[0.15em] text-white">
                      {project.number} / 04
                    </span>
                  </div>

                  {/* Oversized editorial number */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-[-0.16em] right-3 font-[var(--font-syne)] text-[clamp(8rem,22vw,18rem)] font-semibold leading-none tracking-[-0.12em] text-white/20 transition-transform duration-700 ease-out group-hover:-translate-y-3 sm:right-6"
                  >
                    {project.number}
                  </span>

                  {/* Circular arrow */}
                  <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/75 text-white transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-white group-hover:text-[#151515] sm:bottom-7 sm:right-7 sm:h-16 sm:w-16">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                      aria-hidden="true"
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

                {/* Project title and category */}
                <div
                  data-work-details
                  className="flex items-start justify-between gap-4 py-5 sm:py-7"
                  style={{ color: project.text }}
                >
                  <div>
                    <h3 className="max-w-[600px] font-[var(--font-syne)] text-[clamp(1.8rem,4.2vw,4rem)] font-medium leading-[0.98] tracking-[-0.065em]">
                      {project.name}
                    </h3>

                    <p className="mt-3 text-xs tracking-wide text-white/55 sm:text-sm">
                      {project.category}
                    </p>
                  </div>
                </div>
              </a>
            </article>
          ))}

          {/* Final panel */}
          <div className="flex w-[72vw] max-w-[520px] shrink-0 flex-col justify-between self-stretch bg-[#D253B6] p-6 text-[#151515] sm:w-[58vw] md:w-[48vw] lg:w-[42vw] sm:p-8 lg:p-10">
            <p className="text-[10px] uppercase tracking-[0.2em]">
              Your project could be next
            </p>

            <div>
              <h3 className="font-[var(--font-syne)] text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.85] tracking-[-0.08em]">
                Let&apos;s
                <br />
                make
                <br />
                a mark.
              </h3>

              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-4 border-b border-[#151515]/60 pb-3 text-sm"
              >
                Start a conversation
                <span aria-hidden="true" className="text-xl">
                  ↗
                </span>
              </a>
            </div>

            <p className="text-xs tracking-wide">
              MONO® — Independent creative studio
            </p>
          </div>
        </div>

        {/* Scroll progress */}
        <div className="mx-5 mt-6 flex items-center gap-4 sm:mx-8 lg:mx-16">
          <span className="text-[10px] tracking-[0.18em] text-white/50">
            EXPLORE
          </span>

          <div className="relative h-px flex-1 overflow-hidden bg-white/20">
            <div
              ref={progressRef}
              className="absolute inset-0 origin-left scale-x-0 bg-[#D253B6]"
            />
          </div>

          <span className="font-mono text-[10px] text-white/60">
            <span ref={counterRef}>01</span>
            <span className="px-1">/</span>
            05
          </span>
        </div>
      </div>
    </section>
  );
}
