
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: 1,
    category: "Brand Strategy",
    date: "OCT 22, 2026",
    readTime: "6 MIN READ",
    title: "The brands that matter don't follow the noise.",
    excerpt:
      "In a world fighting for attention, the strongest brands know exactly what to say — and what to leave unsaid.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    featured: true,
  },
  {
    id: 2,
    category: "Digital",
    date: "OCT 14, 2026",
    readTime: "4 MIN READ",
    title: "Digital experiences should feel like something.",
    excerpt:
      "Moving beyond functional interfaces to create digital spaces people remember.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    category: "Design",
    date: "OCT 08, 2026",
    readTime: "5 MIN READ",
    title: "A little less perfect. A lot more human.",
    excerpt:
      "Why character, contrast, and imperfection can make a visual identity more distinctive.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    category: "Culture",
    date: "SEP 29, 2026",
    readTime: "3 MIN READ",
    title: "Curiosity is a creative advantage.",
    excerpt:
      "Better questions lead to unexpected ideas. Here's why staying curious is part of the process.",
    image:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    category: "Brand Strategy",
    date: "SEP 18, 2026",
    readTime: "7 MIN READ",
    title: "Building a brand people can believe in.",
    excerpt:
      "A closer look at the relationship between a brand's promises, its personality, and the experience it delivers.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    category: "Digital",
    date: "SEP 05, 2026",
    readTime: "4 MIN READ",
    title: "The internet doesn't need more of the same.",
    excerpt:
      "Distinctive digital work starts by challenging familiar patterns and finding a more interesting point of view.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
  },
];

const categories = [
  "All",
  "Brand Strategy",
  "Digital",
  "Design",
  "Culture",
];

export default function JournalPage() {
  const pageRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredArticle = articles.find((article) => article.featured);

  const filteredArticles = articles.filter(
    (article) =>
      !article.featured &&
      (activeCategory === "All" || article.category === activeCategory)
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".journal-hero-item",
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.13,
          ease: "power3.out",
          clearProps: "all",
        }
      );

      gsap.utils.toArray(".journal-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.fromTo(
        ".featured-image",
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".featured-image-wrap",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".article-card",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#EFEFEF] text-[#151515]"
    >
      {/* Hero */}
      <section className="px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44 lg:px-12 lg:pt-48">
        <div className="mx-auto max-w-[1600px]">
          <div className="journal-hero-item mb-7 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D253B6]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] sm:text-xs">
              Thoughts, ideas & perspectives
            </p>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h1 className="journal-hero-item max-w-5xl font-[var(--font-syne)] text-[clamp(4rem,12vw,11rem)] font-bold leading-[0.82] tracking-[-0.085em]">
              The
              <br />
              Journal<span className="text-[#D253B6]">.</span>
            </h1>

            <p className="journal-hero-item max-w-sm pb-2 text-sm leading-7 text-[#151515]/65 sm:text-base">
              Ideas worth exploring. Perspectives worth sharing. A closer look
              at the thinking behind the work we make.
            </p>
          </div>

          <div className="journal-hero-item mt-12 flex items-center justify-between border-t border-[#151515]/20 pt-5 sm:mt-16">
            <span className="text-[10px] uppercase tracking-[0.2em] sm:text-xs">
              Independent thinking, occasionally published
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] sm:text-xs">
              01 — 06
            </span>
          </div>
        </div>
      </section>

      {/* Featured article */}
      {featuredArticle && (
        <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
          <div className="journal-reveal mx-auto max-w-[1600px]">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs">
                <span className="mr-2 text-[#D253B6]">●</span>
                Editor pick
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#151515]/50 sm:text-xs">
                {featuredArticle.readTime}
              </span>
            </div>

            <Link
              href="/contact"
              aria-label={`Discuss this topic: ${featuredArticle.title}`}
              className="group grid overflow-hidden rounded-[1.5rem] bg-[#151515] text-[#EFEFEF] md:grid-cols-2 md:rounded-[2rem]"
            >
              <div className="featured-image-wrap relative min-h-[300px] overflow-hidden sm:min-h-[420px] lg:min-h-[570px]">
                <img
                  src={featuredArticle.image}
                  alt="Creative studio workspace"
                  className="featured-image absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/50 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-white sm:left-7 sm:top-7">
                  Featured story
                </span>
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-14">
                <div>
                  <div className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/55 sm:text-xs">
                    <span>{featuredArticle.category}</span>
                    <span>—</span>
                    <span>{featuredArticle.date}</span>
                  </div>

                  <h2 className="max-w-xl font-[var(--font-syne)] text-3xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-4xl lg:text-6xl">
                    {featuredArticle.title}
                  </h2>

                  <p className="mt-6 max-w-md text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="mt-12 flex items-center justify-between border-t border-white/20 pt-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] sm:text-xs">
                    Explore the idea
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-xl transition-all duration-300 group-hover:border-[#D253B6] group-hover:bg-[#D253B6] group-hover:text-white">
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Article library */}
      <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="journal-reveal mb-9 flex flex-col justify-between gap-7 border-t border-[#151515]/20 pt-7 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A11882] sm:text-xs">
                From our minds to yours
              </p>
              <h2 className="font-[var(--font-syne)] text-3xl font-semibold tracking-[-0.06em] sm:text-5xl">
                Latest thinking<span className="text-[#D253B6]">.</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`rounded-full border px-4 py-2.5 text-[10px] uppercase tracking-[0.12em] transition-colors duration-300 sm:text-xs ${
                    activeCategory === category
                      ? "border-[#151515] bg-[#151515] text-white"
                      : "border-[#151515]/20 text-[#151515]/65 hover:border-[#D253B6] hover:text-[#A11882]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
              {filteredArticles.map((article, index) => (
                <article
                  key={article.id}
                  className="article-card group"
                  style={{ opacity: 0 }}
                >
                  <Link
                    href="/contact"
                    aria-label={`Discuss this topic: ${article.title}`}
                    className="block"
                  >
                    <div className="relative aspect-[1.15/1] overflow-hidden rounded-[1.25rem] bg-[#D9D5D0] sm:rounded-[1.5rem]">
                      <img
                        src={article.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />

                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                      <span className="absolute left-4 top-4 rounded-full bg-[#EFEFEF] px-3 py-2 text-[9px] font-medium uppercase tracking-[0.14em] text-[#151515]">
                        {article.category}
                      </span>

                      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#EFEFEF] text-lg transition-all duration-300 group-hover:bg-[#D253B6] group-hover:text-white">
                        ↗
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.16em] text-[#151515]/50 sm:text-[10px]">
                      <span>{article.date}</span>
                      <span>—</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="mt-4 max-w-lg font-[var(--font-syne)] text-2xl font-semibold leading-[1.12] tracking-[-0.045em] transition-colors duration-300 group-hover:text-[#A11882] sm:text-3xl">
                      {article.title}
                    </h3>

                    <p className="mt-3 max-w-lg text-sm leading-7 text-[#151515]/60">
                      {article.excerpt}
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                      <span className="h-px w-8 bg-[#D253B6] transition-all duration-300 group-hover:w-14" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.17em]">
                        Read the story
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="font-[var(--font-syne)] text-2xl font-semibold">
                More thoughts coming soon.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className="mt-5 text-sm text-[#A11882] underline underline-offset-4"
              >
                View all articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#D253B6] px-5 py-20 text-[#151515] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="journal-reveal mx-auto max-w-[1600px]">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs">
            Have something on your mind?
          </p>

          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <h2 className="max-w-5xl font-[var(--font-syne)] text-5xl font-bold leading-[0.9] tracking-[-0.075em] sm:text-7xl lg:text-[7.5rem]">
              Lets make
              <br />
              something matter.
            </h2>

            <Link
              href="/contact"
              className="group flex w-fit items-center gap-5 border-b border-[#151515]/40 pb-4 text-sm font-semibold transition-colors hover:border-[#151515] sm:text-base"
            >
              Start a conversation
              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
