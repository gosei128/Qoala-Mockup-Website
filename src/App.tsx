import { useState, useEffect, useRef } from "react";

import startMockup from "./imports/start_mockup.png";
import joinMockup from "./imports/join_mockup.png";
import turnMockup from "./imports/turn_mockup.png";
import logo from "./imports/logo.png";
import stiLogo from "./imports/STI_LOGO.jpg";

// ─── Mini App Screens (rendered inside phone mockups) ─────────────────────────

// ─── Phone Mockup ─────────────────────────────────────────────────────────────

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({
  icon,
  title,
  body,
  accent,
}: {
  icon: string;
  title: string;
  body: string;
  accent: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-3xl p-7 cursor-default transition-all duration-250 border-[1.5px] ${
        hovered
          ? "bg-white border-[#2D52F5]/20 shadow-[0_20px_48px_rgba(45,82,245,0.15)] -translate-y-1"
          : "bg-white/6 border-white/10 translate-y-0"
      }`}
    >
      <div
        className="w-13 h-13 rounded-2xl flex items-center justify-center text-2xl mb-4"
        style={{ background: accent }}
      >
        {icon}
      </div>
      <h3
        className={`m-0 mb-2 text-[17px] font-black tracking-tight transition-colors ${
          hovered ? "text-[#0C0E1A]" : "text-white"
        }`}
      >
        {title}
      </h3>
      <p
        className={`m-0 text-sm leading-relaxed transition-colors ${
          hovered ? "text-[#64748B]" : "text-white/60"
        }`}
      >
        {body}
      </p>
    </div>
  );
}

// ─── Step Card ────────────────────────────────────────────────────────────────
function Step({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-5 items-start">
      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2D52F5] to-[#4B6AFF] flex items-center justify-center flex-shrink-0 font-black text-lg text-white shadow-[0_6px_20px_rgba(45,82,245,0.35)]">
        {num}
      </div>
      <div>
        <h3 className="m-0 mb-1.5 text-[17px] font-black text-[#0C0E1A] tracking-tight">
          {title}
        </h3>
        <p className="m-0 text-sm text-[#64748B] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

// ─── Stat Badge ───────────────────────────────────────────────────────────────
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="m-0 mb-1 text-4xl font-black text-[#2D52F5] tracking-tighter">
        {value}
      </p>
      <p className="m-0 text-sm text-[#64748B] font-semibold">{label}</p>
    </div>
  );
}

// ─── Promo Page ───────────────────────────────────────────────────────────────
export default function App() {
  const [activePhone, setActivePhone] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(
      () => setActivePhone((p) => (p + 1) % 3),
      3200,
    );
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const phones = [
    {
      content: (
        <img
          src={startMockup}
          alt="Start"
          className="h-[260px] sm:h-[320px] md:h-[420px] w-auto block"
        />
      ),
      label: "Get Started",
    },
    {
      content: (
        <img
          src={joinMockup}
          alt="Join"
          className="h-[260px] sm:h-[320px] md:h-[420px] w-auto block"
        />
      ),
      label: "Join Queue",
    },
    {
      content: (
        <img
          src={turnMockup}
          alt="Turn"
          className="h-[260px] sm:h-[320px] md:h-[420px] w-auto block"
        />
      ),
      label: "Your Turn",
    },
  ];

  return (
    <div className="font-['Plus_Jakarta_Sans'] bg-white overflow-x-hidden min-h-screen">
      {/* ── NAV ── */}
      <nav className="fixed w-full top-0 z-50 bg-white/88 backdrop-blur-md border-b border-[#F0F2F8] px-[clamp(16px,5vw,80px)] flex items-center justify-between h-16">
        <div className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="logo"
            className="h-[32px] sm:h-[32px] md:h-[40px] w-auto block"
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: "Features", id: "features" },
              { label: "How it Works", id: "how-it-works" },
              { label: "About", id: "about" },
            ].map((link) => (
              <a
                key={link.label}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(link.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-semibold text-[#64748B] hover:text-[#2D52F5] no-underline transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            onClick={() =>
              document
                .getElementById("cta")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="h-9 px-4 rounded-[10px] bg-gradient-to-br from-[#2D52F5] to-[#4B6AFF] text-white text-xs font-bold shadow-[0_4px_14px_rgba(45,82,245,0.3)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            Download App
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#0A1A80] via-[#1A38D4] via-[#2D52F5] to-[#4B6AFF] min-h-screen flex items-center relative overflow-hidden py-[clamp(80px,12vh,140px)] px-[clamp(16px,5vw,80px)]">
        {/* Decorative blobs */}
        <div className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[80px] -left-[60px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(100,130,255,0.2)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.04)_0%,_transparent_70%)] pointer-events-none" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.04)_1px,_transparent_1px)] [background-size:48px_48px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full max-w-[1200px] mx-auto">
          {/* Left copy */}
          <div>
            {/* Badge */}

            <h1 className="m-0 mb-5 text-[clamp(36px,5vw,58px)] font-black text-white leading-[1.1] tracking-tight">
              Skip the Line.
              <br />
              <span className="bg-gradient-to-r from-[#93AEFF] to-[#C7D4FF] bg-clip-text text-transparent">
                Join the Queue
              </span>
              <br />
              using Qoala App.
            </h1>

            <p className="m-0 mb-9 text-lg text-white/72 leading-relaxed max-w-[480px]">
              Qoala is the smart queue management app built for STI College of
              Malolos students. No more waiting in line — join, track, and get
              notified from your phone.
            </p>

            {/* CTAs */}
            <div className="flex gap-3.5 flex-wrap">
              <button className="h-[54px] px-8 rounded-2xl bg-white text-[#2D52F5] text-base font-extrabold shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center gap-2.5 hover:bg-white/95 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#2D52F5">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.37c1.32.07 2.22.74 2.98.8 1.13-.23 2.22-.93 3.43-.84 1.45.12 2.54.72 3.27 1.84-2.99 1.83-2.47 5.81.36 6.94-.43 1.02-.99 2.03-2.04 3.17zM13 3.5c.73-2.43 3.41-2.92 3.5-.04-2.63.48-3.5 2.14-3.5.04z" />
                </svg>
                App Store
              </button>
              <button className="h-[54px] px-8 rounded-2xl border-2 border-white/30 bg-white/10 text-white text-base font-extrabold backdrop-blur-md flex items-center gap-2.5 hover:bg-white/15 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M3.18 23.76c.3.17.65.18.96.04L14.88 12 3.14.2c-.31-.13-.66-.12-.96.04C1.66.63 1.22 1.37 1.22 2.2v19.6c0 .83.44 1.57 1.96 1.96zM15.93 12.94l2.48 2.48-8.37 4.78zm0-1.88-5.89-5.89 8.37 4.78zm4.5 3.5L18.15 16.3l2.28 1.3c.92.53 1.57.37 1.57-.6V7c0-.97-.65-1.13-1.57-.6L18.15 7.7l2.28 2.28z" />
                </svg>
                Google Play
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 mt-9">
              <div className="flex">
                {["🧑‍🎓", "👩‍🎓", "🧑", "👩", "🎓"].map((e, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center text-sm"
                    style={{
                      background: `hsl(${220 + i * 15}, 60%, ${55 + i * 5}%)`,
                      marginLeft: i === 0 ? 0 : -8,
                    }}
                  >
                    {e}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-[#FCD34D] text-xs">
                      ★
                    </span>
                  ))}
                </div>
                <p className="m-0 text-xs text-white/70">
                  Loved by{" "}
                  <strong className="text-white font-bold">1,000+</strong>{" "}
                  students
                </p>
              </div>
            </div>
          </div>

          {/* Right — image carousel */}
          <div className="flex justify-center items-end gap-2 sm:gap-4 md:gap-6 relative mt-12 lg:mt-0 w-full py-8">
            {phones.map((p, i) => {
              const isActive = i === activePhone;
              const offset = i - activePhone;
              return (
                <div
                  key={i}
                  onClick={() => setActivePhone(i)}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(.34,1.56,.64,1)",
                    transform: `rotate(${offset * 8}deg) scale(${isActive ? 1.1 : 0.82})`,
                    transformOrigin: "center bottom",
                    filter: isActive
                      ? "drop-shadow(0 20px 40px rgba(15,30,100,0.18))"
                      : "none",
                    flexShrink: 0,
                  }}
                >
                  {p.content}
                </div>
              );
            })}
            {/* Dots */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
              {phones.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhone(i)}
                  style={{
                    width: i === activePhone ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    border: "none",
                    cursor: "pointer",
                    background:
                      i === activePhone ? "#fff" : "rgba(255,255,255,0.3)",
                    transition: "all 0.3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      {/* <section className="bg-white py-12 px-[clamp(16px,5vw,60px)] border-b border-[#F0F2F8]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center max-w-[900px] mx-auto w-full">
          <Stat value="12K+" label="Active Students" />
          <Stat value="8" label="Universities" />
          <Stat value="98%" label="Queue Accuracy" />
          <Stat value="4.8★" label="App Store Rating" />
        </div>
      </section> */}

      {/* ── FEATURES ── */}
      <section
        id="features"
        className="bg-[#0C0E1A] py-[clamp(50px,7vw,90px)] px-[clamp(16px,5vw,80px)] scroll-mt-16"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-11">
            <span className="text-xs font-bold tracking-widest text-[#6B82F8] uppercase">
              Why Students Love It
            </span>
            <h2 className="m-0 mt-3 text-[clamp(26px,4vw,40px)] font-black text-white tracking-tight leading-[1.15]">
              Qoala transforms waiting time <br /> into productive time.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="📱"
              title="Real-Time Queue Tracking"
              body="See live queue counts, estimated wait times, and your exact position — all updated instantly."
              accent="rgba(45,82,245,0.25)"
            />
            <FeatureCard
              icon="🔔"
              title="Smart Notifications"
              body="Get push alerts the moment it's your turn. Never miss your slot or waste time sitting in line."
              accent="rgba(16,185,129,0.2)"
            />
            <FeatureCard
              icon="🏛️"
              title="Multi-Office Support"
              body="Cashier, Registrar, Admin, Accounting — manage queues across every campus office in one app."
              accent="rgba(251,191,36,0.2)"
            />
            <FeatureCard
              icon="🎫"
              title="Digital Tickets"
              body="Your ticket number lives on your phone. Check queue history and rejoin queues with one tap."
              accent="rgba(239,68,68,0.2)"
            />
            <FeatureCard
              icon="📢"
              title="Office Announcements"
              body="Stay in the loop with real-time notices about office hours, closures, and schedule changes."
              accent="rgba(139,92,246,0.2)"
            />
            <FeatureCard
              icon="🔒"
              title="Secure Student Login"
              body="Sign in with your university email or Google account. Your data stays private and protected."
              accent="rgba(236,72,153,0.2)"
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="bg-[#F4F6FB] py-[clamp(50px,7vw,90px)] px-[clamp(16px,5vw,80px)] scroll-mt-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1200px] mx-auto w-full">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#2D52F5] uppercase">
              How It Works
            </span>
            <h2 className="mt-3 mb-8 text-[clamp(26px,4vw,38px)] font-black text-[#0C0E1A] tracking-tight leading-[1.15]">
              Queue smarter in
              <br />
              four simple steps.
            </h2>
            <div className="flex flex-col gap-6">
              <Step
                num="1"
                title="Sign in with your student account"
                body="Use your student account. Secure, instant, and free for all enrolled students."
              />
              <div className="w-0.5 h-5 bg-gradient-to-b from-[#2D52F5] to-[#4B6AFF] rounded-sm ml-[21px]" />
              <Step
                num="2"
                title="Choose a service and join the queue"
                body="Pick from Cashier, Registrar, Admin, or Accounting. See wait times before you commit."
              />
              <div className="w-0.5 h-5 bg-gradient-to-b from-[#2D52F5] to-[#4B6AFF] rounded-sm ml-[21px]" />

              <Step
                num="3"
                title="Scan QR Code from KIOSK"
                body="Scan the QR code from the kiosk to verify student is within the proximity of the school."
              />
              <div className="w-0.5 h-5 bg-gradient-to-b from-[#2D52F5] to-[#4B6AFF] rounded-sm ml-[21px]" />
              <Step
                num="4"
                title="Get notified when it's your turn"
                body="Walk over only when your slot is ready. Qoala holds your spot for 2 minutes on arrival."
              />
            </div>
          </div>

          {/* Single image */}
          <div className="flex justify-center items-center mt-12 lg:mt-0 w-full overflow-hidden py-10">
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,_rgba(45,82,245,0.15)_0%,_transparent_70%)] pointer-events-none" />
              <img
                src={startMockup}
                alt="Join Queue"
                className="h-[300px] sm:h-[380px] md:h-[480px] w-auto block scale-115 origin-center drop-shadow-[0_30px_50px_rgba(15,30,100,0.2)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        id="about"
        className="bg-white py-[clamp(50px,7vw,90px)] px-[clamp(16px,5vw,80px)] scroll-mt-16"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-[#2D52F5] uppercase">
              Student Reviews
            </span>
            <h2 className="m-0 mt-3 text-[clamp(26px,4vw,38px)] font-black text-[#0C0E1A] tracking-tight">
              Real students, real time saved.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Ryza Deang",
                course: "BSIT 3B • STI College Malolos",
                stars: 5,
                text: '"I used to waste 2 hours queuing at the Registrar. Now I join from my dorm and walk over when it\'s my turn. Game changer."',
              },
              {
                name: "Roni Sore",
                course: "BSIT 3B • STI College Malolos",
                stars: 5,
                text: '"The notifications are super reliable. I\'ve never missed my slot. The app is clean and fast — exactly what students need."',
              },
              {
                name: "John Doe",
                course: "BSCS 3B • STI College Malolos",
                stars: 5,
                text: '"Finally an app that actually helps with uni life. The queue tracking is accurate and the design is so much better than before."',
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-[#F4F6FB] rounded-3xl p-6 border-[1.5px] border-[#F0F2F8]"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, idx) => (
                    <span key={idx} className="text-[#FCD34D] text-base">
                      ★
                    </span>
                  ))}
                </div>
                <p className="m-0 mb-5 text-[15px] text-[#374151] leading-relaxed italic">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{
                      background: `hsl(${220 + i * 40}, 60%, 60%)`,
                    }}
                  >
                    🧑‍🎓
                  </div>
                  <div>
                    <p className="m-0 mb-0.5 text-sm font-bold text-[#0C0E1A]">
                      {t.name}
                    </p>
                    <p className="m-0 text-xs text-[#94A3B8]">{t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="cta"
        className="bg-gradient-to-br from-[#0A1A80] via-[#1A38D4] via-[#2D52F5] to-[#4B6AFF] py-[clamp(50px,7vw,90px)] px-[clamp(16px,5vw,80px)] text-center relative overflow-hidden scroll-mt-16"
      >
        <div className="absolute -top-[60px] left-[20%] w-[300px] h-[300px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-[40px] right-[15%] w-[200px] h-[200px] rounded-full bg-white/6 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex justify-center  mb-4">
            <img src={logo} alt="" className="w-1/12 rounded-3xl shadow-lg" />
          </div>
          <h2 className="m-0 mb-4 text-[clamp(28px,4vw,46px)] font-black text-white tracking-tighter leading-[1.1]">
            Ready to skip the line?
          </h2>
          <p className="m-0 mb-10 text-lg text-white/72 max-w-[500px] mx-auto leading-relaxed">
            Download Qoala free. Available on Android & iOS. Built specifically
            for STI College Malolos.
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <button className="h-14 px-9 rounded-2xl bg-white text-[#2D52F5] text-base font-extrabold shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex items-center gap-2.5 hover:bg-white/95 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#2D52F5">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.37c1.32.07 2.22.74 2.98.8 1.13-.23 2.22-.93 3.43-.84 1.45.12 2.54.72 3.27 1.84-2.99 1.83-2.47 5.81.36 6.94-.43 1.02-.99 2.03-2.04 3.17zM13 3.5c.73-2.43 3.41-2.92 3.5-.04-2.63.48-3.5 2.14-3.5.04z" />
              </svg>
              Download on App Store
            </button>
            <button className="h-14 px-9 rounded-2xl border-2 border-white/35 bg-white/12 text-white text-base font-extrabold backdrop-blur-md flex items-center gap-2.5 hover:bg-white/18 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                <path d="M3.18 23.76c.3.17.65.18.96.04L14.88 12 3.14.2c-.31-.13-.66-.12-.96.04C1.66.63 1.22 1.37 1.22 2.2v19.6c0 .83.44 1.57 1.96 1.96zM15.93 12.94l2.48 2.48-8.37 4.78zm0-1.88-5.89-5.89 8.37 4.78zm4.5 3.5L18.15 16.3l2.28 1.3c.92.53 1.57.37 1.57-.6V7c0-.97-.65-1.13-1.57-.6L18.15 7.7l2.28 2.28z" />
              </svg>
              Get on Google Play
            </button>
          </div>
          <p className="m-0 mt-6 text-sm text-white/50 font-medium">
            Free to download · No credit card needed
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0C0E1A] py-10 px-[clamp(16px,5vw,80px)]">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 max-w-[1200px] mx-auto w-full text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2D52F5] to-[#4B6AFF] flex items-center justify-center text-base">
              <img src={stiLogo} alt="" className="rounded-lg" />
            </div>
            <span className="text-base font-extrabold text-white tracking-tight">
              STI College Malolos
            </span>
          </div>
          <p className="text-[#475569] text-xs m-0">
            © 2025 Qoala. Built for STI College Malolos. 🇵🇭
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Support"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs text-[#475569] hover:text-[#2D52F5] no-underline font-medium transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
