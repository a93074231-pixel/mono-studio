
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const visual = visualRef.current;

    if (!hero || !visual) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const ctx = gsap.context(() => {
      const revealItems = hero.querySelectorAll("[data-hero-reveal]");
      const titleLines = hero.querySelectorAll("[data-hero-line]");
      const sculpture = hero.querySelector("[data-hero-sculpture]");
      const emblem = hero.querySelector("[data-hero-emblem]");

      if (reduceMotion) {
        gsap.set(revealItems, { autoAlpha: 1, y: 0 });
        gsap.set(titleLines, {
          yPercent: 0,
          rotate: 0,
          autoAlpha: 1,
        });
        gsap.set([sculpture, emblem], {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          y: 0,
        });
        return;
      }

      // Initial hidden state
      gsap.set(revealItems, {
        autoAlpha: 0,
        y: 18,
      });

      gsap.set(titleLines, {
        yPercent: 110,
        rotate: 2,
        transformOrigin: "left bottom",
      });

      gsap.set([sculpture, emblem], {
        autoAlpha: 0,
        scale: 0.94,
      });

      // Create the intro without playing it immediately.
      const intro = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      intro
        .to(titleLines, {
          yPercent: 0,
          rotate: 0,
          duration: 0.95,
          stagger: 0.14,
          ease: "power4.out",
        })
        .to(
          [sculpture, emblem],
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.55"
        )
        .to(
          revealItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.35"
        );

      // Replay the intro every time the hero enters the viewport.
      ScrollTrigger.create({
        trigger: hero,
        start: "top 65%",
        end: "bottom 35%",

        onEnter: () => intro.restart(),
        onEnterBack: () => intro.restart(),

        onLeave: () => intro.pause(0),
        onLeaveBack: () => intro.pause(0),
      });

      // Gentle sculptural movement while the hero is visible.
      const sculptureMotion = gsap.timeline({
        paused: true,
        repeat: -1,
        yoyo: true,
      });

      if (sculpture) {
        sculptureMotion.to(sculpture, {
          rotate: 5,
          y: -7,
          duration: 4.5,
          ease: "sine.inOut",
        });
      }

      if (emblem) {
        sculptureMotion.to(
          emblem,
          {
            rotate: -4,
            y: 5,
            duration: 3.5,
            ease: "sine.inOut",
          },
          0
        );
      }

      ScrollTrigger.create({
        trigger: hero,
        start: "top 65%",
        end: "bottom 35%",

        onEnter: () => sculptureMotion.play(),
        onEnterBack: () => sculptureMotion.play(),

        onLeave: () => sculptureMotion.pause(0),
        onLeaveBack: () => sculptureMotion.pause(0),
      });
    }, hero);

    // Subtle pointer interaction on desktop.
    const handlePointerMove = (event) => {
      if (!canHover || reduceMotion) return;

      const rect = hero.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(visual, {
        x: x * 10,
        y: y * 10,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const handlePointerLeave = () => {
      gsap.to(visual, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);

      gsap.killTweensOf(visual);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-[#EFEFEF] px-5 pb-16 pt-24 text-[#151515] sm:px-8 sm:pt-28 md:h-[100svh] md:min-h-[680px] md:px-[6.5%] md:pb-14 md:pt-28"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-[18%] -z-10 h-72 w-72 rounded-full bg-[#D253B6]/10 blur-[90px] md:h-[460px] md:w-[460px]"
      />

      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-5 md:grid-cols-[1.08fr_0.92fr] md:gap-3 lg:gap-6">
        {/* Hero text */}
        <div className="relative z-10 min-w-0">
          {/* <div
            data-hero-reveal
            className="mb-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-black/55 sm:text-xs"
          >
            <span className="h-px w-8 bg-[#A11882]" />
            Independent creative studio
          </div> */}

          <h1 className="font-[var(--font-syne)] text-[clamp(3rem,7.1vw,7.2rem)] font-bold leading-[0.84] tracking-[-0.085em] xl:text-[7.5rem]">
            <span className="block overflow-hidden pb-[0.12em] pt-[0.06em]">
              <span data-hero-line className="inline-block">
                IDEAS
              </span>
            </span>

            <span className="block overflow-hidden pb-[0.12em] pt-[0.06em]">
              <span
                data-hero-line
                className="inline-block text-[#D253B6]"
              >
                MADE
              </span>
            </span>

            <span className="block overflow-hidden pb-[0.12em] pt-[0.06em]">
              <span data-hero-line className="inline-block">
                IN MOTION<span className="text-[#A11882]">.</span>
              </span>
            </span>
          </h1>

          <div className="mt-5 flex max-w-[650px] flex-col gap-6 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
            <p
              data-hero-reveal
              className="max-w-[330px] text-sm leading-7 text-black/65 sm:text-base sm:leading-8"
            >
              We turn ambitious thinking into distinctive brands and digital
              experiences people remember.
            </p>

            <a
              data-hero-reveal
              href="#services"
              className="group inline-flex w-fit items-center gap-5 border-b border-black/30 pb-3 text-sm font-medium transition-colors duration-300 hover:border-[#A11882] hover:text-[#A11882] sm:text-base"
            >
              Explore what we do
              <span
                aria-hidden="true"
                className="inline-block text-xl font-light transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
          </div>

          <div
            data-hero-reveal
            className="mt-7 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-black/45 sm:mt-10"
          >
            <span className="h-px w-10 bg-[#D253B6]" />
            Strategy / Identity / Digital
          </div>
        </div>

        {/* Sculptural MONO visual */}
        <div
          ref={visualRef}
          className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center md:-mr-[4%] md:max-w-none"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[12%] rounded-full bg-[#D253B6]/15 blur-[65px]"
          />

          <div
            data-hero-sculpture
            aria-hidden="true"
            className="absolute inset-[14%] rotate-[-12deg] rounded-[42%_58%_64%_36%/42%_35%_65%_58%] border border-white/70 bg-gradient-to-br from-[#F8D8EF] via-[#D253B6] to-[#A11882] shadow-[inset_18px_18px_45px_rgba(255,255,255,0.55),inset_-25px_-28px_55px_rgba(86,0,65,0.24),0_45px_100px_rgba(161,24,130,0.16)]"
          >
            <div className="absolute inset-[12%] rounded-[inherit] border border-white/30" />

            <div className="absolute left-[17%] top-[22%] h-[22%] w-[42%] rounded-full bg-white/35 blur-2xl" />

            <div className="absolute bottom-[17%] right-[17%] h-[32%] w-[32%] rounded-full bg-[#7C145F]/20 blur-2xl" />
          </div>

          <div
            data-hero-emblem
            className="relative flex h-[36%] w-[36%] items-center justify-center rounded-[38%_62%_57%_43%/42%_40%_60%_58%] border border-white/80 bg-gradient-to-br from-[#F9E6F4]/95 via-[#D253B6]/90 to-[#A11882] shadow-[inset_10px_10px_35px_rgba(255,255,255,0.42),inset_-14px_-18px_30px_rgba(86,0,65,0.22),0_25px_65px_rgba(161,24,130,0.2)]"
          >
            <span className="select-none font-[var(--font-syne)] text-[clamp(3rem,7vw,6.5rem)] font-bold tracking-[-0.12em] text-white">
              M<span className="text-[#151515]">.</span>
            </span>
          </div>

          <div
            data-hero-reveal
            className="absolute right-[3%] top-[19%] border-l border-[#A11882] pl-3 text-[9px] uppercase leading-5 tracking-[0.17em] text-black/60 sm:text-[10px]"
          >
            <span className="block text-black">MONO / 01</span>
            Ideas in motion
          </div>

          <div
            data-hero-reveal
            className="absolute bottom-[15%] left-[2%] flex items-center gap-3 bg-[#EFEFEF]/90 py-3 pr-4 text-[9px] uppercase tracking-[0.17em] text-black/65 backdrop-blur-sm sm:text-[10px]"
          >
            <span className="h-7 w-px bg-[#D253B6]" />
            Make it matter.
          </div>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-5 right-5 flex items-center justify-between text-[8px] uppercase tracking-[0.18em] text-black/45 sm:left-8 sm:right-8 md:bottom-7 md:left-[6.5%] md:right-[6.5%] md:text-[9px]">
        <span>Independent by nature</span>

        <span className="flex items-center gap-3">
          <span className="h-7 w-px bg-[#D253B6]" />
          Scroll to explore
        </span>

        <span className="hidden sm:inline">Built for what&apos;s next</span>
      </div>
    </section>
  );
}
