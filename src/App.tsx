import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Calendar,
  Check,
  Heart,
  Menu,
  PawPrint,
  ShieldCheck,
  Stethoscope,
  Weight,
  X,
} from "lucide-react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeMcRsYgHyPg6P_VDt_CCp-SDmGdkO0Al2U_TNtxCgbXEN0-Q/viewform";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#eligibility", label: "Eligibility" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

const eligibilityItems = [
  {
    icon: Heart,
    title: "Healthy and Active",
    desc: "Your cat or dog should be in good general health with no active illness.",
  },
  {
    icon: Calendar,
    title: "Suitable Age Range",
    desc: "Most donor pets should be within a safe adult age range, confirmed by a vet.",
  },
  {
    icon: Weight,
    title: "Safe Weight Range",
    desc: "Weight suitability differs for cats and dogs and must be confirmed professionally.",
  },
  {
    icon: Award,
    title: "Vaccinated",
    desc: "Up-to-date vaccination records are recommended before donation.",
  },
  {
    icon: ShieldCheck,
    title: "Consent Based",
    desc: "Registration does not force donation. The final decision is always yours.",
  },
  {
    icon: Check,
    title: "Vet Confirmed",
    desc: "Final eligibility is always confirmed by veterinary professionals.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Fill the Google Form",
    desc: "Submit owner details and basic information about your cat or dog.",
  },
  {
    num: "02",
    title: "Team Review",
    desc: "The organising team checks the submitted information and contacts you if needed.",
  },
  {
    num: "03",
    title: "Vet Guidance",
    desc: "Veterinary professionals confirm whether your pet is suitable and safe to donate.",
  },
  {
    num: "04",
    title: "Help During Need",
    desc: "Eligible owners may be contacted when a cat or dog urgently needs blood support.",
  },
];

const faqs = [
  {
    q: "Is cat and dog blood donation safe?",
    a: "Yes, when it is done under proper veterinary supervision and only with cats or dogs that meet the required health criteria.",
  },
  {
    q: "Will registration force my pet to donate?",
    a: "No. Registration only allows the team to contact you. The final decision is always yours.",
  },
  {
    q: "Can I register more than one pet?",
    a: "Yes. Please submit a separate Google Form response for each pet.",
  },
  {
    q: "Who will contact me after registration?",
    a: "The organising team will contact you using the details you provide in the form.",
  },
];

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const duration = 1000;
    const increment = Math.max(1, Math.ceil(end / (duration / 16)));

    const timer = window.setInterval(() => {
      current += increment;

      if (current >= end) {
        setCount(end);
        window.clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);

    return () => window.clearInterval(timer);
  }, [end]);

  return (
    <span className="stat-number">
      {count}
      {suffix}
    </span>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: "-90px 0px -50% 0px" }
    );

    document
      .querySelectorAll("section[id]")
      .forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);

    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    setIsMenuOpen(false);
  };

  const openGoogleForm = () => {
    window.location.href = GOOGLE_FORM_URL;
    setIsMenuOpen(false);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white selection:bg-rose-700 selection:text-white">
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-black/75 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 text-left"
            aria-label="Go to homepage"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-800 shadow-lg shadow-rose-950/40">
              <PawPrint className="h-5 w-5" />
            </span>

            <span>
              <span className="block text-lg font-bold tracking-tight">
                Paw Pulse LK
              </span>
              <span className="hidden text-xs text-white/45 sm:block">
                Cat & Dog Blood Donation
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`nav-link text-sm font-medium transition ${
                  activeSection === link.href.slice(1)
                    ? "active text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openGoogleForm}
              className="hidden rounded-full bg-rose-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-950/30 transition hover:bg-rose-600 md:inline-flex"
            >
              Register Pet
            </button>

            <button
              onClick={() => setIsMenuOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10 bg-black/95 px-5 py-5 md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="rounded-2xl px-4 py-3 text-left text-white/70 hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </button>
                ))}

                <button
                  onClick={openGoogleForm}
                  className="mt-2 rounded-2xl bg-rose-700 px-4 py-3 font-bold hover:bg-rose-600"
                >
                  Fill Google Form
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section
        id="home"
        className="relative px-5 pb-20 pt-32 md:px-6 md:pb-28 md:pt-36"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_20%,rgba(225,29,72,0.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(136,19,55,0.18),transparent_35%)]" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-7 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/65 sm:tracking-[0.2em]">
              <Heart className="h-4 w-4 shrink-0 text-rose-500" />
              <span>Initiated by Leo Club of Colombo City 306D5</span>
            </div>

            <h1 className="gradient-text text-[3.25rem] font-black leading-[0.95] tracking-[-0.07em] sm:text-6xl md:text-8xl">
              Save a life.
              <br />
              Let your pet be a hero.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/60 sm:text-lg md:text-xl">
              Paw Pulse LK is building a trusted network of healthy donor cats
              and dogs to support pets in urgent medical need. One form
              submission can help create a life-saving connection.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={openGoogleForm}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-extrabold text-black transition hover:bg-rose-100 sm:w-auto"
              >
                Fill Registration Form <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => scrollToSection("#eligibility")}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-7 py-4 font-bold text-white/80 transition hover:bg-white/5 hover:text-white sm:w-auto"
              >
                Check Eligibility
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative w-full"
          >
            <div className="glass-card rounded-[2rem] p-4 shadow-2xl shadow-rose-950/20">
              <div className="relative flex aspect-[4/3.2] items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-zinc-900 to-black">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:18px_18px] opacity-[0.06]" />

                <div className="relative px-4 text-center">
                  <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-rose-900/30 ring-1 ring-rose-500/20 sm:h-28 sm:w-28">
                    <PawPrint className="h-12 w-12 text-rose-500 sm:h-14 sm:w-14" />
                  </div>

                  <p className="text-xl font-black tracking-tight sm:text-2xl">
                    One pet. Multiple lives.
                  </p>
                  <p className="mt-2 text-sm text-white/45 sm:text-base">
                    A simple registration can create real impact.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-zinc-950 px-6 py-4 text-left shadow-xl md:absolute md:-bottom-6 md:left-2 md:mt-0 sm:md:-left-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                Goal
              </p>
              <p className="mt-1 text-4xl font-black tracking-tight">
                <AnimatedCounter end={100} />
              </p>
              <p className="text-sm text-white/45">donor pets</p>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-zinc-950 px-6 py-4 text-left shadow-xl md:absolute md:-right-2 md:-top-5 md:mt-0 md:text-right sm:md:-right-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                Cost
              </p>
              <p className="mt-1 text-4xl font-black tracking-tight text-rose-500">
                <AnimatedCounter end={0} />
              </p>
              <p className="text-sm text-white/45">free to register</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/40 px-5 py-12 md:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 text-center sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {[
            { value: 100, suffix: "%", label: "Free Registration" },
            { value: 4, suffix: "", label: "Simple Steps" },
            { value: 0, suffix: "", label: "Forced Commitment" },
            { value: 1, suffix: "+", label: "Life to Save" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/5 bg-white/[0.03] p-5"
            >
              <p className="text-4xl font-black tracking-tight md:text-5xl">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-white/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-500">
              About the initiative
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Why cat and dog blood donation matters.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-white/60 sm:text-lg">
            <p>
              Cats and dogs may need blood during accidents, surgeries, severe
              illness, poisoning cases, or emergency treatment. In those
              moments, finding a suitable donor quickly is critical.
            </p>

            <p>
              Initiated by Leo Club of Colombo City 306D5, this website helps
              collect potential cat and dog donor details through a Google Form
              so the organising team can build a reliable contact network for
              urgent cases.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="glass-card rounded-3xl p-5">
                <Stethoscope className="mb-3 h-6 w-6 text-rose-500" />
                <b className="text-white">Vet-guided</b>
                <p className="mt-1 text-sm text-white/50">
                  Final suitability must be confirmed professionally.
                </p>
              </div>

              <div className="glass-card rounded-3xl p-5">
                <ShieldCheck className="mb-3 h-6 w-6 text-rose-500" />
                <b className="text-white">Consent-based</b>
                <p className="mt-1 text-sm text-white/50">
                  Registration does not force donation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="eligibility"
        className="bg-zinc-950 px-5 py-20 md:px-6 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-500">
              Eligibility
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Is your pet ready to help?
            </h2>

            <p className="mt-5 text-base leading-8 text-white/60 sm:text-lg">
              These are general guidelines. Final eligibility should always be
              confirmed by veterinary professionals.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {eligibilityItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="card-hover rounded-3xl border border-white/10 bg-black p-7"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-900/25 text-rose-500">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-black tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-2 leading-7 text-white/55">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-500">
              How it works
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              Simple. Safe. Meaningful.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="card-hover rounded-3xl border border-white/10 bg-white/[0.03] p-7"
              >
                <p className="font-mono text-5xl font-black tracking-[-0.08em] text-rose-700">
                  {step.num}
                </p>

                <h3 className="mt-8 text-xl font-black tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-white/55">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={openGoogleForm}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-rose-700 px-8 py-4 font-bold transition hover:bg-rose-600 sm:w-auto"
            >
              Register Through Google Form <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="border-y border-white/10 bg-zinc-950 px-5 py-20 md:px-6 md:py-28"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-500">
              FAQ
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              Questions answered.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-3xl border border-white/10 bg-black px-6 py-2"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-bold sm:text-lg">
                  {faq.q}
                  <span className="text-2xl text-rose-500 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="pb-5 leading-7 text-white/55">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 text-center md:px-6 md:py-28">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-rose-500/20 bg-rose-950/20 p-6 sm:p-8 md:p-12">
          <PawPrint className="mx-auto h-12 w-12 text-rose-500" />

          <h2 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
            Ready to register your pet?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/60 sm:text-lg">
            The form is quick, free, and helps us build a life-saving donor
            network for cats and dogs.
          </p>

          <button
            onClick={openGoogleForm}
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 font-black text-black transition hover:bg-rose-100 sm:w-auto"
          >
            Fill Google Form <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-10 md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center text-white/45 md:flex-row md:items-center md:justify-between md:text-left">
          <div className="flex items-center gap-3 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-800">
              <PawPrint className="h-4 w-4" />
            </span>

            <span className="font-bold">Paw Pulse LK</span>
          </div>

          <p className="text-sm">
            © 2026 Paw Pulse LK. Cat & dog blood donation initiative by Leo
            Club of Colombo City 306D5.
          </p>
        </div>
      </footer>
    </main>
  );
}