
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const links = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Services", href: "/services" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const panelRef = useRef(null);
  const backdropRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;

    if (!panel || !backdrop) return;

    const menuLinks = panel.querySelectorAll(".menu-link");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.set([panel, backdrop], {
        autoAlpha: 0,
        pointerEvents: "none",
      });

      gsap.set(menuLinks, {
        y: 14,
        autoAlpha: 0,
      });

      timelineRef.current = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      timelineRef.current
        .to(backdrop, {
          autoAlpha: 1,
          duration: reduceMotion ? 0 : 0.3,
          pointerEvents: "auto",
        })
        .to(
          panel,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: reduceMotion ? 0 : 0.45,
            pointerEvents: "auto",
          },
          reduceMotion ? 0 : "-=0.12"
        )
        .to(
          menuLinks,
          {
            y: 0,
            autoAlpha: 1,
            duration: reduceMotion ? 0 : 0.35,
            stagger: reduceMotion ? 0 : 0.055,
          },
          reduceMotion ? 0 : "-=0.2"
        );
    });

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!timelineRef.current) return;

    if (menuOpen) {
      gsap.set(panelRef.current, {
        y: -12,
        scale: 0.98,
        transformOrigin: "top right",
      });

      gsap.set(
        panelRef.current.querySelectorAll(".menu-link"),
        { y: 14, autoAlpha: 0 }
      );

      timelineRef.current.play(0);
    } else {
      timelineRef.current.reverse();
    }
  }, [menuOpen]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Menu backdrop */}
      <button
        ref={backdropRef}
        type="button"
        aria-label="Close navigation"
        onClick={() => setMenuOpen(false)}
        className="fixed inset-0 z-[90] cursor-default bg-black/25 backdrop-blur-[3px]"
      />

      {/* Shared floating header */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-5 md:px-9 md:py-7">

        {/* Logo */}
        <Link
          href="/"
          aria-label="MONO home"
          onClick={() => setMenuOpen(false)}
          className="pointer-events-auto flex h-[46px] w-[46px] items-center justify-center border-2 border-[#151515] bg-[#EFEFEF]/95 text-lg font-extrabold tracking-[-2px] text-[#151515] shadow-[0_4px_18px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-[#A11882] hover:text-[#A11882] md:h-[54px] md:w-[54px] md:text-xl"
        >
          M<span className="text-[#D253B6]">.</span>
        </Link>

        {/* Header actions */}
        <div className="pointer-events-auto flex items-center gap-2.5 md:gap-3">

          {/* Hire us */}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="group inline-flex items-center gap-2 rounded-full border border-[#151515]/10 bg-[#EFEFEF]/95 px-4 py-3 text-sm font-medium text-[#151515] shadow-[0_4px_18px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-[#A11882] hover:bg-[#A11882] hover:text-white md:px-6 md:py-3.5 md:text-base"
          >
            Hire us
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          {/* Menu toggle */}
          <button
            type="button"
            aria-controls="mono-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[#151515]/10 bg-[#EFEFEF]/95 text-[#151515] shadow-[0_4px_18px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-[#A11882] hover:bg-[#A11882] hover:text-white md:h-[48px] md:w-[48px]"
          >
            <span className="relative flex h-4 w-6 items-center justify-center">
              <span
                className={`absolute h-[2px] w-full bg-current transition-transform duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-[5px]"
                }`}
              />
              <span
                className={`absolute h-[2px] w-full bg-current transition-transform duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-[5px]"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Dropdown navigation */}
        <nav
          id="mono-navigation"
          ref={panelRef}
          aria-label="Main navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          className="pointer-events-none invisible fixed right-4 top-4 z-[110] w-[min(370px,calc(100vw-2rem))] rounded-[26px] border border-black/5 bg-[#EFEFEF] px-[30px] pb-[30px] pt-[24px] text-[#151515] shadow-[0_20px_70px_rgba(0,0,0,0.2)] md:right-5 md:top-5 md:w-[370px]"
        >
          <div className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="menu-link block py-[5px] font-[var(--font-syne)] text-[29px] font-normal leading-[1.2] tracking-[-1.3px] transition-colors hover:text-[#A11882]"
              >
                {link.label}
                {link.label === "Services" && (
                  <span className="ml-1 text-[25px]">+</span>
                )}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="menu-link mt-[28px] flex items-center justify-between gap-3 rounded-full border-[1.5px] border-[#151515] px-[22px] py-[12px] text-[20px] leading-none tracking-[-0.5px] transition-colors hover:bg-[#151515] hover:text-white"
          >
            Start your project
            <span className="text-[28px] font-light">→</span>
          </Link>
        </nav>
      </header>
    </>
  );
}
