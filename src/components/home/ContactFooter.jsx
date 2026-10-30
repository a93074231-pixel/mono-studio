
export default function ContactFooter() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#151515] px-5 pb-8 pt-20 text-[#EFEFEF] sm:px-8 md:px-[7.5%] md:pt-32"
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[#A11882]/40 blur-[110px] md:h-[600px] md:w-[600px]" />

      <div className="relative mx-auto max-w-[1500px]">
        <p className="mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/60 sm:text-xs">
          <span className="h-2 w-2 rounded-full bg-[#D253B6]" />
          Have a good one in mind?
        </p>

        <h2 className="max-w-[1100px] font-[var(--font-syne)] text-[clamp(3.5rem,10vw,10rem)] font-semibold leading-[0.8] tracking-[-0.09em]">
          LET&apos;S MAKE
          <br />
          <span className="text-[#D253B6]">SOME NOISE.</span>
        </h2>

        <div className="mt-10 flex flex-col justify-between gap-8 border-b border-white/20 pb-12 sm:flex-row sm:items-end md:mt-14 md:pb-16">
          <p className="max-w-[360px] text-sm leading-7 text-white/60 sm:text-base">
            Tell us where you want to go. We&apos;ll help you find a way to make
            people look.
          </p>

          <a
  href="mailto:hello@mono.studio"
  className="group inline-flex w-fit items-center gap-6 border-b border-[#D253B6] py-4 text-sm font-medium text-[#EFEFEF] transition-colors duration-300 hover:text-[#D253B6] sm:text-base"
>
  Start a conversation
  <span
    aria-hidden="true"
    className="inline-block text-xl font-light transition-transform duration-300 ease-out group-hover:translate-x-1"
  >
    ↗
  </span>
</a>
        </div>

        <div className="flex flex-col justify-between gap-3 pt-5 text-[10px] uppercase tracking-[0.16em] text-white/45 sm:flex-row sm:items-center sm:text-xs">
          <a
            href="#home"
            className="w-fit font-[var(--font-syne)] text-xl font-semibold tracking-[-0.07em] text-white"
          >
            MONO<span className="text-[#D253B6]">.</span>
          </a>

          <span>Independent creative studio · India / Worldwide</span>
          <span>© 2026 MONO Studio</span>
        </div>
      </div>
    </footer>
  );
}
