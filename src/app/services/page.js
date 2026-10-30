
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Brand worlds.",
    subtitle: "Make your difference visible.",
    description:
      "We build distinctive brand identities that give ambitious businesses a clear point of view. From the first strategic question to the smallest visual detail, every choice has a purpose.",
    capabilities: [
      "Brand strategy",
      "Visual identity",
      "Art direction",
      "Brand guidelines",
    ],
    accent: "#D253B6",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=85",
    alt: "Colorful artwork and creative materials",
    shape: "rounded-tl-[70px] rounded-br-[70px]",
  },
  {
    number: "02",
    title: "Digital places.",
    subtitle: "Make every interaction count.",
    description:
      "We design and develop thoughtful digital experiences that balance visual character with usability. Every interaction should feel intuitive, purposeful, and memorable.",
    capabilities: [
      "Website design",
      "Web development",
      "Interactive experiences",
      "Motion design",
    ],
    accent: "#A11882",
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1400&q=85",
    alt: "Immersive digital art installation",
    shape: "rounded-tr-[70px] rounded-bl-[70px]",
  },
  {
    number: "03",
    title: "Creative momentum.",
    subtitle: "Give good ideas room to travel.",
    description:
      "We bring stories to life through campaigns and creative content that help brands connect with people, build recognition, and keep moving beyond launch day.",
    capabilities: [
      "Campaign concepts",
      "Creative direction",
      "Content systems",
      "Digital storytelling",
    ],
    accent: "#D253B6",
    image:
      "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1400&q=85",
    alt: "Colorful contemporary art and visual composition",
    shape: "rounded-tl-[70px] rounded-br-[70px]",
  },
];

export default function ServicesPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const intro = page.querySelectorAll("[data-services-page-intro]");
      const rows = gsap.utils.toArray(
        page.querySelectorAll("[data-service-feature]")
      );

      if (reduceMotion) {
        gsap.set([...intro, ...rows], {
          autoAlpha: 1,
          y: 0,
          clearProps: "transform",
        });
        return;
      }

      gsap.fromTo(
        intro,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: page.querySelector("[data-services-page-hero]"),
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      rows.forEach((row) => {
        const media = row.querySelector("[data-service-feature-image]");
        const content = row.querySelector("[data-service-feature-content]");
        const divider = row.querySelector("[data-service-feature-divider]");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            toggleActions: "play reverse play reverse",
          },
        });

        timeline
          .fromTo(
            media,
            { autoAlpha: 0, y: 30, scale: 0.97 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
            }
          )
          .fromTo(
            divider,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.55,
              transformOrigin: "left center",
            },
            "-=0.5"
          )
          .fromTo(
            content,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.35"
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
      {/* Hero */}
      <section
        data-services-page-hero
        className="px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:px-16 lg:pb-28 lg:pt-28"
      >
        <div className="mx-auto max-w-[1600px]">
          {/* <p
            data-services-page-intro
            className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.23em] text-black/55 sm:text-xs"
          >
            <span className="h-2 w-2 rounded-full bg-[#D253B6]" />
            What we do / Our capabilities
          </p> */}

          <h1
            data-services-page-intro
            className="font-[var(--font-syne)] text-[clamp(3.5rem,11vw,10rem)] font-semibold leading-[0.82] tracking-[-0.09em]"
          >
            Good thinking.
            <br />
            <span className="text-[#D253B6]">Better making.</span>
          </h1>

          <div className="mt-12 grid gap-8 border-t border-black/15 pt-6 sm:mt-16 sm:grid-cols-2 sm:pt-8">
            <p
              data-services-page-intro
              className="max-w-xl text-lg leading-relaxed tracking-[-0.035em] sm:text-2xl"
            >
              Strategy, design, and technology working together to
              move brands forward.
            </p>

            <p
              data-services-page-intro
              className="max-w-md text-sm leading-7 text-black/60 sm:justify-self-end sm:text-base sm:leading-8"
            >
              We connect clear thinking with expressive creativity to
              make brands more distinctive, digital experiences more
              engaging, and ideas more useful.
            </p>
          </div>
        </div>
      </section>

      {/* Service features */}
      <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-16 lg:pb-40">
        <div className="mx-auto max-w-[1500px]">
          <div className="space-y-20 md:space-y-28">
            {services.map((service, index) => (
              <article
                key={service.number}
                data-service-feature
                className="grid items-center gap-8 md:grid-cols-12 md:gap-12"
              >
                {/* Visual */}
                <div
                  data-service-feature-image
                  className={`relative aspect-[1.05/1] overflow-hidden bg-white/60 md:col-span-7 md:aspect-[1.15/1] ${
                    index % 2 === 1 ? "md:order-2" : ""
                  } ${service.shape}`}
                >
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.035]"
                  />

                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/50 bg-black/10 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-md sm:left-7 sm:top-7">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: service.accent }}
                    />
                    MONO / {service.number}
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-0.12em] right-5 font-[var(--font-syne)] text-[clamp(7rem,17vw,15rem)] font-semibold leading-none tracking-[-0.1em] text-white/35"
                  >
                    {service.number}
                  </span>
                </div>

                {/* Content */}
                <div
                  data-service-feature-content
                  className={`md:col-span-5 ${
                    index % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <div
                    data-service-feature-divider
                    className="mb-7 h-px w-full bg-black/20"
                  />

                  <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-black/50 sm:text-xs">
                    {service.subtitle}
                  </p>

                  <h2 className="font-[var(--font-syne)] text-[clamp(2.6rem,5vw,5.2rem)] font-semibold leading-[0.88] tracking-[-0.08em]">
                    {service.title.split(".")[0]}
                    <span style={{ color: service.accent }}>.</span>
                  </h2>

                  <p className="mt-6 max-w-lg text-sm leading-7 text-black/65 sm:text-base sm:leading-8">
                    {service.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {service.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="rounded-full border border-black/15 px-3 py-2 text-[10px] text-black/70 sm:text-xs"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>

                  <a
                    href="/contact"
                    className="group mt-8 inline-flex items-center gap-4 border-b border-black/35 pb-3 text-sm transition-colors hover:border-[#A11882] hover:text-[#A11882]"
                  >
                    Lets discuss your project
                    <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#151515] px-5 py-20 text-[#EFEFEF] sm:px-8 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1500px]">
          <p className="mb-7 text-[10px] uppercase tracking-[0.22em] text-white/50 sm:text-xs">
            A good place to start
          </p>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="font-[var(--font-syne)] text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.08em]">
              Have a good
              <br />
              <span className="text-[#D253B6]">idea brewing?</span>
            </h2>

            <a
              href="/contact"
              className="group inline-flex items-center gap-4 self-start border-b border-white/40 pb-3 text-sm transition-colors hover:border-[#D253B6] hover:text-[#D253B6] md:self-end"
            >
              Tell us about it
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
