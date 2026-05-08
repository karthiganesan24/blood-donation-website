import { useEffect, useState } from "react";
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

const DONORS = [
  { id: 0, angle: -90,  label: "Rex",   species: "dog" },
  { id: 1, angle: -30,  label: "Luna",  species: "cat" },
  { id: 2, angle:  30,  label: "Bruno", species: "dog" },
  { id: 3, angle:  90,  label: "Mochi", species: "cat" },
  { id: 4, angle: 150,  label: "Balu",  species: "dog" },
  { id: 5, angle: 210,  label: "Lily",  species: "cat" },
] as const;

const RADIUS = 105;
const CX = 200;
const CY = 155;

function toXY(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function DonorNetworkCard() {
  const [active, setActive] = useState(0);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 900;

    function step(ts: number) {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      setPulse(t);
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setActive((a) => (a + 1) % DONORS.length);
          setPulse(0);
          start = null;
          raf = requestAnimationFrame(step);
        }, 320);
      }
    }

    let raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="w-full select-none overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900/80 to-black/90 shadow-2xl shadow-rose-950/25">
      <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_0%,rgba(225,29,72,0.1),transparent_60%)]" />

      <div className="relative p-5 pb-0">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
            Donor Network
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-950/60 px-2.5 py-1 text-[11px] font-bold text-emerald-400 ring-1 ring-emerald-500/20">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live
          </span>
        </div>

        <svg viewBox="0 0 400 310" className="w-full" aria-hidden="true">
          <circle cx={CX} cy={CY} r={RADIUS} fill="none"
            stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 6" />

          {DONORS.map((d) => {
            const { x: x2, y: y2 } = toXY(d.angle, RADIUS);
            const isActive = d.id === active;
            const px = isActive ? CX + (x2 - CX) * (1 - pulse) : null;
            const py = isActive ? CY + (y2 - CY) * (1 - pulse) : null;
            const iconColor = isActive ? "#fb7185" : "rgba(255,255,255,0.38)";
            const { x: lx, y: ly } = toXY(d.angle, RADIUS + 33);

            return (
              <g key={d.id}>
                <line x1={CX} y1={CY} x2={x2} y2={y2}
                  stroke={isActive ? "rgba(225,29,72,0.45)" : "rgba(255,255,255,0.07)"}
                  strokeWidth={isActive ? "1.5" : "1"} strokeLinecap="round" />

                {isActive && px !== null && py !== null && (
                  <circle cx={px} cy={py} r="3.5" fill="#e11d48"
                    opacity={0.85 - pulse * 0.3} />
                )}

                <circle cx={x2} cy={y2} r="20"
                  fill={isActive ? "rgba(225,29,72,0.15)" : "rgba(255,255,255,0.04)"}
                  stroke={isActive ? "rgba(225,29,72,0.55)" : "rgba(255,255,255,0.1)"}
                  strokeWidth="1" />

                {d.species === "dog" ? (
                  /* Lucide PawPrint — 24×24 viewbox, centred on node */
                  <g transform={`translate(${x2 - 12},${y2 - 12})`}
                    fill="none" stroke={iconColor} strokeWidth="1.75"
                    strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="4" r="2" />
                    <circle cx="18" cy="8" r="2" />
                    <circle cx="20" cy="16" r="2" />
                    <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
                  </g>
                ) : (
                  /* Lucide Cat — 24×24 viewbox, centred on node */
                  <g transform={`translate(${x2 - 12},${y2 - 12})`}
                    fill="none" stroke={iconColor} strokeWidth="1.75"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
                    <path d="M8 14v.5" />
                    <path d="M16 14v.5" />
                    <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
                  </g>
                )}

                <text x={lx} y={ly + 4} textAnchor="middle"
                  fontSize="11" fontWeight="600"
                  fill={isActive ? "rgba(251,113,133,0.9)" : "rgba(255,255,255,0.28)"}
                  fontFamily="Inter, system-ui, sans-serif">
                  {d.label}
                </text>
              </g>
            );
          })}

          <circle cx={CX} cy={CY} r="40" fill="rgba(225,29,72,0.06)"
            stroke="rgba(225,29,72,0.18)" strokeWidth="1">
            <animate attributeName="r" values="38;43;38" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.35;1" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx={CX} cy={CY} r="28" fill="rgba(225,29,72,0.14)"
            stroke="rgba(225,29,72,0.45)" strokeWidth="1.5" />
          {/* Lucide Heart — 24×24 viewbox centred on (CX, CY) */}
          <g transform={`translate(${CX - 12},${CY - 12})`}
            fill="#fb7185" stroke="#fb7185" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </g>
          <text x={CX} y={CY + 52} textAnchor="middle"
            fontSize="9.5" fontWeight="700"
            fill="rgba(251,113,133,0.55)"
            fontFamily="Inter, system-ui, sans-serif"
            letterSpacing="0.12em">
            NEEDS BLOOD
          </text>
        </svg>
      </div>

      <div className="relative grid grid-cols-3 divide-x divide-white/[0.07] border-t border-white/[0.07]">
        <div className="px-4 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Donor</p>
          <p className="mt-1 text-sm font-bold leading-tight text-white/85">{DONORS[active].label}</p>
          <p className="mt-0.5 text-[11px] capitalize text-white/35">{DONORS[active].species}</p>
        </div>
        <div className="px-4 py-4 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Goal</p>
          <p className="mt-1 text-2xl font-black tracking-tight text-white">100</p>
          <p className="mt-0.5 text-[11px] text-white/35">donor pets</p>
        </div>
        <div className="px-4 py-4 text-right">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Cost</p>
          <p className="mt-1 text-2xl font-black tracking-tight text-rose-400">Free</p>
          <p className="mt-0.5 text-[11px] text-white/35">to register</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 300);
    };
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
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 100,
          behavior: "smooth",
        });
      }
    }, 120);
  };

  const openGoogleForm = () => {
    window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
    setIsMenuOpen(false);
  };

  const backToTop = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white selection:bg-rose-700 selection:text-white">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <div className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-6 md:pt-5">
        <nav className={`liquid-glass-nav w-full max-w-6xl transition-all duration-500 ${scrolled ? "scrolled" : ""}`}>
          <div className="flex h-16 items-center justify-between px-4 md:px-5">
            <button type="button" onClick={backToTop}
              className="flex items-center gap-2.5 text-left" aria-label="Go to homepage">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-800/80 shadow-lg shadow-rose-950/50 ring-1 ring-white/10">
                <PawPrint className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-base font-bold tracking-tight">Paw Pulse LK</span>
                <span className="hidden text-[11px] text-white/40 sm:block">Cat & Dog Blood Donation</span>
              </span>
            </button>

            <div className="hidden items-center gap-7 md:flex">
              {navLinks.map((link) => (
                <button type="button" key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`nav-link text-sm font-medium transition ${
                    activeSection === link.href.slice(1)
                      ? "active text-white"
                      : "text-white/55 hover:text-white"
                  }`}>
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <button type="button" onClick={openGoogleForm}
                className="hidden rounded-full bg-rose-700/90 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-rose-950/40 ring-1 ring-white/10 transition hover:bg-rose-600 md:inline-flex">
                Register Pet
              </button>
              <button type="button" onClick={() => setIsMenuOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition active:bg-white/10 md:hidden"
                aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      <div className={`mobile-drawer liquid-glass-drawer fixed left-4 right-4 top-24 z-[60] md:hidden ${isMenuOpen ? "open" : ""}`}>
        <div className="flex flex-col gap-1 p-3">
          {navLinks.map((link) => (
            <button type="button" key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="w-full rounded-2xl px-4 py-3.5 text-left text-base font-semibold text-white/80 transition hover:bg-white/5 active:bg-white/10">
              {link.label}
            </button>
          ))}
          <button type="button" onClick={openGoogleForm}
            className="mt-1 w-full rounded-2xl bg-rose-700/90 px-4 py-3.5 text-base font-bold text-white ring-1 ring-white/10 transition active:bg-rose-800">
            Fill Google Form
          </button>
        </div>
      </div>

      <section id="home" className="relative px-5 pb-20 pt-32 md:px-6 md:pb-28 md:pt-36">
        <span id="main-content" className="sr-only" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_20%,rgba(225,29,72,0.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(136,19,55,0.18),transparent_35%)]" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hero-left">
            <div className="mb-7 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/65 sm:tracking-[0.2em]">
              <Heart className="h-4 w-4 shrink-0 text-rose-500" />
              <span>Initiated by Leo Club of Colombo City 306D5</span>
            </div>

            <h1 className="gradient-text text-[3.25rem] font-black leading-[0.95] tracking-[-0.07em] sm:text-6xl md:text-8xl">
              Save a life.
              <br />
              Let your pet<br className="hidden sm:block" /> be a hero.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/60 sm:text-lg md:text-xl">
              Paw Pulse LK is building a trusted network of healthy donor cats
              and dogs to support pets in urgent medical need. One form
              submission can help create a life-saving connection.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={openGoogleForm}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-extrabold text-black transition hover:bg-rose-100 sm:w-auto">
                Fill Registration Form <ArrowRight className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => scrollToSection("#eligibility")}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-7 py-4 font-bold text-white/80 transition hover:bg-white/5 hover:text-white sm:w-auto">
                Check Eligibility
              </button>
            </div>
          </div>

          <div className="hero-right relative w-full">
            <DonorNetworkCard />
          </div>
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

      <section id="eligibility" className="bg-zinc-950 px-5 py-20 md:px-6 md:py-28">
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
                <div key={item.title} className="card-hover rounded-3xl border border-white/10 bg-black p-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-900/25 text-rose-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight">{item.title}</h3>
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
              <div key={step.num} className="card-hover rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                <p className="font-mono text-5xl font-black tracking-[-0.08em] text-rose-700">
                  {step.num}
                </p>
                <h3 className="mt-8 text-xl font-black tracking-tight">{step.title}</h3>
                <p className="mt-3 leading-7 text-white/55">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button type="button" onClick={openGoogleForm}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-rose-700 px-8 py-4 font-bold transition hover:bg-rose-600 sm:w-auto">
              Register Through Google Form <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="faq" className="border-y border-white/10 bg-zinc-950 px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-500">FAQ</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              Questions answered.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-3xl border border-white/10 bg-black px-6 py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-bold sm:text-lg">
                  {faq.q}
                  <span className="text-2xl text-rose-500 transition group-open:rotate-45">+</span>
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
          <button type="button" onClick={openGoogleForm}
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 font-black text-black transition hover:bg-rose-100 sm:w-auto">
            Fill Google Form <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-10 md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center text-white/45 md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-800">
              <PawPrint className="h-4 w-4" />
            </span>
            <span className="font-bold">Paw Pulse LK</span>
          </div>
          <p className="text-sm">
            © 2026 Paw Pulse LK. Cat & dog blood donation initiative by Leo Club of Colombo City 306D5.
          </p>
        </div>
      </footer>

      <button type="button" onClick={backToTop} aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-30 h-12 w-12 items-center justify-center rounded-full border border-rose-500/30 bg-rose-700 text-xl font-black text-white shadow-2xl shadow-rose-950/50 transition-all duration-300 hover:bg-rose-600 active:scale-[0.98] md:bottom-6 md:right-6 ${
          showBackToTop ? "flex" : "hidden"
        }`}>
        ↑
      </button>
    </main>
  );
}
