import { useEffect, useState, type ReactNode } from "react";

import koalaHero from "./imports/koala-hero.webp";
import koalaPeek from "./imports/koala-peek.webp";
import koalaJump from "./imports/koala-jump.webp";
import screenOffice from "./imports/screen-office.webp";
import screenScan from "./imports/screen-scan.webp";
import screenInLine from "./imports/screen-in-line.webp";
import screenYourTurn from "./imports/screen-your-turn.webp";
import screenTicket from "./imports/screen-ticket.webp";
import {
  ArrowDown,
  Banknote,
  Bell,
  Building,
  ClipboardList,
  Download,
  GraduationCap,
  KeyRound,
  Megaphone,
  Pause,
  Play,
  Printer,
  QrCode,
  Ticket,
  Timer,
  UserRound,
  Users,
} from "lucide-react";

// Point this at the real APK once it's hosted.
const APK_URL =
  "https://expo.dev/accounts/roni.dev/projects/mobile/builds/a27ee220-ae6e-448e-a149-a3ce0be2d384";

const BUTTON_MOTION =
  "transition-[transform,background-color,box-shadow] duration-200 ease-q-out hover:-translate-y-0.5 motion-reduce:transition-none";
const BUTTON_WHITE = `${BUTTON_MOTION} bg-white text-q-blue no-underline hover:bg-q-cream hover:text-q-link-hover`;
const BUTTON_BLUE = `${BUTTON_MOTION} bg-q-blue text-white no-underline hover:bg-q-blue-hover hover:text-white hover:shadow-q-btn`;

// ─── Demo Ticket ──────────────────────────────────────────────────────────────
type DemoState = {
  ahead: number;
  turn: boolean;
  secs: number;
  hold: number;
  tick: number;
};

const DEMO_START: DemoState = {
  ahead: 6,
  turn: false,
  secs: 120,
  hold: 0,
  tick: 0,
};

function stepDemo(s: DemoState): DemoState {
  if (!s.turn) {
    const tick = s.tick + 1;
    if (tick % 2 !== 0) return { ...s, tick };
    if (s.ahead > 1) return { ...s, tick, ahead: s.ahead - 1 };
    return { ...s, tick, ahead: 0, turn: true, secs: 120, hold: 0 };
  }
  if (s.hold + 1 > 8) return DEMO_START;
  return { ...s, secs: s.secs - 1, hold: s.hold + 1 };
}

function DemoTicket() {
  const [demo, setDemo] = useState(DEMO_START);
  const [paused, setPaused] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setDemo(stepDemo), 1000);
    return () => clearInterval(timer);
  }, [paused]);

  const reminded = demo.ahead <= 3;
  const minutes = Math.floor(demo.secs / 60);
  const seconds = String(demo.secs % 60).padStart(2, "0");

  return (
    <figure className="m-0 mb-[clamp(28px,4vw,56px)] flex min-w-[260px] flex-[0_1_310px] flex-col gap-2.5">
      <div
        role="img"
        aria-label="Demo ticket: number 014 at the Registrar moves up the line until Qoala says it's your turn."
        className="overflow-hidden rounded-[28px] bg-white shadow-q-lift"
      >
        {demo.turn ? (
          <div
            aria-hidden="true"
            className="bg-q-blue-deep px-[22px] pt-[26px] pb-6 text-center text-white"
          >
            <div className="mx-auto flex size-[72px] items-center justify-center rounded-full bg-white/16">
              <Bell
                size={36}
                strokeWidth={2}
                className="animate-q-ring motion-reduce:animate-none"
              />
            </div>
            <div className="mt-3.5 text-[1.75rem] font-bold tracking-[-0.02em]">
              It's your turn!
            </div>
            <div className="mt-1 text-[0.9375rem] text-q-sky">
              Please proceed to Registrar now.
            </div>
            <div className="mx-auto mt-[18px] rounded-[18px] bg-white p-3.5 text-[2.5rem] leading-none font-extrabold tracking-[-0.03em] text-q-blue tabular-nums">
              #014
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-[0.9375rem]">
              <Timer size={18} strokeWidth={2} />
              <span>
                Time remaining:{" "}
                <strong className="tabular-nums">
                  0{minutes}:{seconds}
                </strong>
              </span>
            </div>
          </div>
        ) : (
          <div aria-hidden="true">
            <div className="relative bg-q-sun px-[22px] pt-5 pb-[18px] text-q-ink">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold tracking-[0.12em]">
                  REGISTRAR · MAIN HALL
                </span>
                <span className="rounded-[10px] border-2 border-q-ink px-2.5 py-1 text-xs font-bold tracking-[0.1em]">
                  WAITING
                </span>
              </div>
              <div className="mt-3 text-[3.5rem] leading-none font-extrabold tracking-[-0.03em] tabular-nums">
                #014
              </div>
              <div className="mt-3 flex gap-[18px] text-[0.9375rem] font-semibold">
                <span className="inline-flex items-center gap-1.5">
                  <Users size={18} strokeWidth={2} />#{demo.ahead + 1} ·{" "}
                  {demo.ahead} ahead
                </span>
              </div>
            </div>
            <div className="relative border-t-2 border-dashed border-q-line px-[22px] pt-[18px] pb-[22px]">
              <span className="absolute -top-3 -left-3 size-[22px] rounded-full bg-q-blue" />
              <span className="absolute -top-3 -right-3 size-[22px] rounded-full bg-q-blue" />
              <div className="text-[0.8125rem] font-medium text-q-muted">
                The line ahead of you
              </div>
              <div className="mt-2.5 flex min-h-9 flex-wrap items-center gap-1.5">
                {Array.from({ length: demo.ahead }, (_, i) => (
                  <span
                    key={i}
                    className="inline-flex size-8 animate-q-pop items-center justify-center rounded-full bg-q-token text-q-token-ink motion-reduce:animate-none"
                  >
                    <UserRound size={16} strokeWidth={2.2} />
                  </span>
                ))}
                <span className="inline-flex h-8 items-center rounded-2xl bg-q-blue px-3 text-[0.8125rem] font-semibold text-white">
                  You
                </span>
              </div>
              <div
                className={`mt-4 flex items-center gap-2.5 rounded-[14px] px-3.5 py-3 text-sm font-medium transition-colors duration-400 ${
                  reminded ? "bg-q-blue text-white" : "bg-q-bg text-q-body"
                }`}
              >
                <Bell size={18} strokeWidth={2} className="shrink-0" />
                <span>
                  {reminded
                    ? "Reminder sent at 3 ahead. Start walking."
                    : "I’ll remind you at 3 ahead."}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <figcaption className="flex items-center justify-between gap-2 text-[0.8125rem] text-q-sky">
        <span>Demo ticket, not a live queue</span>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-white/45 bg-transparent px-3 font-medium whitespace-nowrap text-white"
        >
          {paused ? (
            <>
              <Play size={14} fill="currentColor" aria-hidden="true" />
              Play demo
            </>
          ) : (
            <>
              <Pause size={14} fill="currentColor" aria-hidden="true" />
              Pause demo
            </>
          )}
        </button>
      </figcaption>
    </figure>
  );
}

// ─── Phone Frame ──────────────────────────────────────────────────────────────
function Phone({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div
      className={`rounded-[34px] bg-q-ink p-[7px] shadow-q-phone ${className}`}
    >
      <img src={src} alt={alt} className="block h-auto w-full rounded-[28px]" />
    </div>
  );
}

function PhonePair({
  back,
  front,
}: {
  back: { src: string; alt: string };
  front: { src: string; alt: string };
}) {
  return (
    <div className="flex min-w-0 flex-[1_1_420px] items-start justify-center pb-10">
      <Phone {...back} className="w-[clamp(170px,19vw,250px)] -rotate-3" />
      <Phone
        {...front}
        className="-ml-9 w-[clamp(170px,19vw,250px)] translate-y-10 rotate-4"
      />
    </div>
  );
}

// ─── Conversation Turn ────────────────────────────────────────────────────────
function Speech({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-[1_1_380px] items-start gap-4 max-[600px]:flex-col max-[600px]:gap-3.5">
      <span className="block size-16 flex-none overflow-hidden rounded-full bg-q-tint-blue">
        <img
          src={koalaPeek}
          alt=""
          className="block size-full object-cover object-[50%_0%]"
        />
      </span>
      <div className="relative min-w-0 flex-auto rounded-[28px] bg-white p-[clamp(22px,3vw,34px)] shadow-q-card">
        <span
          aria-hidden="true"
          className="absolute top-6 -left-[9px] size-[22px] rotate-45 rounded-[4px] bg-white max-[600px]:-top-[9px] max-[600px]:left-[26px]"
        />
        <h3 className="relative m-0 text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] font-bold tracking-[-0.025em]">
          {title}
        </h3>
        <p className="relative m-0 mt-3.5 text-[1.0625rem] leading-[1.65] text-q-body">
          {body}
        </p>
        <div className="relative mt-[18px] flex flex-wrap gap-2">
          {children}
        </div>
      </div>
    </div>
  );
}

function Chip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-xl bg-q-bg px-3 py-2 text-sm font-medium [&>svg]:text-q-blue">
      {icon}
      {label}
    </span>
  );
}

// ─── Promo Page ───────────────────────────────────────────────────────────────
const WINDOWS = [
  { name: "Cashier", icon: Banknote, tint: "bg-q-tint-yellow" },
  { name: "Registrar", icon: ClipboardList, tint: "bg-q-tint-blue" },
  { name: "Admin", icon: Building, tint: "bg-q-tint-coral" },
  { name: "Accounting", icon: Users, tint: "bg-q-tint-green" },
];

const AUDIENCES = [
  {
    name: "Students",
    body: "Sign in with your STI Microsoft account. Nothing new to remember.",
    icon: GraduationCap,
    tint: "bg-q-tint-blue",
  },
  {
    name: "Guests",
    body: "Parents, applicants and visitors sign in as a guest with a one-time code.",
    icon: KeyRound,
    tint: "bg-q-tint-yellow",
  },
  {
    name: "Office staff",
    body: "Staff log in with email and password and call the next number from their own screen.",
    icon: Megaphone,
    tint: "bg-q-tint-green",
  },
  {
    name: "No phone with you",
    body: "The kiosk prints a paper ticket with your number, so you're still in the same line.",
    icon: Printer,
    tint: "bg-q-tint-coral",
  },
];

const H2_CLASS =
  "m-0 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-bold tracking-[-0.03em]";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-q-bg font-sans text-q-ink">
      {/* ── HEADER ── */}
      <header className="relative bg-q-blue text-white">
        <div className="mx-auto box-border max-w-[1240px] px-[clamp(16px,4vw,48px)] pt-5">
          <nav
            aria-label="Main"
            className="flex min-h-14 flex-wrap items-center justify-between gap-4"
          >
            <a
              href="#top"
              className="flex items-center gap-3 text-white no-underline hover:text-q-sun-hover"
            >
              <span className="text-[1.75rem] leading-none font-extrabold tracking-[-0.03em]">
                Qoala
              </span>
              <span className="border-l border-white/35 pl-3 text-[0.8125rem] leading-[1.2] font-normal text-q-sky">
                STI College
                <br />
                Malolos
              </span>
            </a>
            <div className="flex items-center gap-[clamp(16px,3vw,36px)]">
              <div className="flex gap-7 text-[0.9375rem] font-medium max-[760px]:hidden">
                {[
                  { label: "How it works", id: "how" },
                  { label: "Windows", id: "windows" },
                  { label: "Who can join", id: "everyone" },
                ].map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="text-white no-underline underline-offset-4 hover:text-q-sun-hover hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                href={APK_URL}
                className={`inline-flex min-h-11 items-center gap-2 rounded-[14px] px-[18px] text-[0.9375rem] font-semibold ${BUTTON_WHITE}`}
              >
                <Download size={18} strokeWidth={2.2} aria-hidden="true" />
                Get the app
              </a>
            </div>
          </nav>

          <div
            id="top"
            className="flex flex-wrap items-end gap-[clamp(20px,3vw,40px)] pt-[clamp(28px,5vw,64px)]"
          >
            <div className="flex min-w-0 flex-[1_1_620px] flex-wrap items-end gap-x-5 gap-y-2">
              <img
                src={koalaHero}
                alt="Qoala the koala, in a blue Q cap, pointing at a tablet with a megaphone on its back"
                className="-mb-0.5 block h-auto w-[clamp(160px,17vw,240px)] flex-none max-[760px]:w-[150px]"
              />
              <div className="relative mb-[clamp(28px,4vw,56px)] min-w-0 flex-[1_1_400px] rounded-[32px] bg-white p-[clamp(24px,3.4vw,44px)] text-q-ink shadow-q-lift">
                <span
                  aria-hidden="true"
                  className="absolute bottom-16 -left-[11px] size-[26px] rotate-45 rounded-[4px] bg-white max-[760px]:-top-[11px] max-[760px]:bottom-auto max-[760px]:left-14"
                />
                <h1 className="relative m-0 text-[clamp(2.25rem,4.2vw,3.6rem)] leading-[1.04] font-bold tracking-[-0.035em] text-balance">
                  Skip the hallway line. I'll hold your spot.
                </h1>
                <p className="relative m-0 mt-[18px] max-w-[34em] text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.6] text-q-body">
                  Qoala is the digital queue for the Cashier, Registrar, Admin
                  and Accounting windows at STI College Malolos. Scan the kiosk
                  QR once, then go eat, study or finish your requirements. I'll
                  call you when it's your turn.
                </p>
                <div className="relative mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={APK_URL}
                    className={`inline-flex min-h-14 items-center gap-2.5 rounded-2xl px-[26px] text-[1.0625rem] font-semibold ${BUTTON_BLUE}`}
                  >
                    <Download size={20} strokeWidth={2.2} aria-hidden="true" />
                    Download for Android
                  </a>
                  <a
                    href="#how"
                    className="inline-flex min-h-11 items-center gap-2 font-semibold text-q-blue underline underline-offset-4 hover:text-q-link-hover"
                  >
                    See how it works
                    <ArrowDown size={18} strokeWidth={2.2} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            <DemoTicket />
          </div>
        </div>
      </header>

      <main>
        {/* ── HOW IT WORKS ── */}
        <section
          id="how"
          aria-labelledby="how-title"
          className="mx-auto box-border max-w-[1240px] px-[clamp(16px,4vw,48px)] pt-[clamp(64px,9vw,120px)] pb-[clamp(40px,6vw,80px)]"
        >
          <h2
            id="how-title"
            className={`${H2_CLASS} max-w-[14em] text-balance`}
          >
            Here's how I hold your spot while you're somewhere else.
          </h2>

          <div className="mt-[clamp(40px,6vw,72px)] flex flex-col gap-[clamp(56px,8vw,104px)]">
            <div className="flex flex-wrap items-center gap-[clamp(32px,5vw,72px)]">
              <Speech
                title="Find me at the guard's table."
                body="Pick the window you need in the app, then scan the QR on the Qoala kiosk by the guard's table and confirm. You can only join by scanning on campus, so everyone in the line is actually here."
              >
                <Chip icon={<QrCode size={16} />} label="Scan Kiosk QR" />
                <Chip
                  icon={<Users size={16} />}
                  label="See who's in line first"
                />
              </Speech>
              <PhonePair
                back={{
                  src: screenOffice,
                  alt: "Qoala app: Registrar's Office screen showing 0 in queue, now serving none, and a Scan Kiosk QR button",
                }}
                front={{
                  src: screenScan,
                  alt: "Qoala app: Scan Successful screen with Registrar selected and a Confirm and Join Queue button",
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-[clamp(32px,5vw,72px)] min-[900px]:flex-row-reverse">
              <Speech
                title="You're in line. Now go do something useful."
                body="You get a ticket number, your place in line and how many people are ahead of you, updated live. Tell me when to nudge you: when 10, 5 or 3 people are left. Then grab lunch, review for your quiz, or sit somewhere with a fan."
              >
                <span className="rounded-xl border-[1.5px] border-q-line px-3.5 py-2 text-sm font-semibold text-q-body">
                  10 ahead
                </span>
                <span className="rounded-xl bg-q-blue px-3.5 py-2 text-sm font-semibold text-white">
                  5 ahead
                </span>
                <span className="rounded-xl border-[1.5px] border-q-line px-3.5 py-2 text-sm font-semibold text-q-body">
                  3 ahead
                </span>
              </Speech>
              <div className="flex min-w-0 flex-[1_1_420px] items-center justify-center">
                <Phone
                  src={screenInLine}
                  alt="Qoala app: You're in Line screen for Registrar with ticket #001, queue position 1, 0 people ahead, and reminder options for 10, 5 or 3 ahead"
                  className="w-[clamp(190px,21vw,270px)]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-[clamp(32px,5vw,72px)]">
              <Speech
                title="It's your turn. Head to the window."
                body="When the staff calls your number, your phone gets a push notification and a two-minute countdown to reach the window. Tap “I'm on my way”, then show the ticket ID on your ticket at the counter."
              >
                <Chip icon={<Bell size={16} />} label="Push alert" />
                <Chip icon={<Timer size={16} />} label="2:00 to arrive" />
                <Chip
                  icon={<Ticket size={16} />}
                  label="Ticket ID for the counter"
                />
              </Speech>
              <PhonePair
                back={{
                  src: screenYourTurn,
                  alt: "Qoala app: It's Your Turn screen with a push notification, ticket #001 for Registrar at Main Hall, and a two-minute countdown",
                }}
                front={{
                  src: screenTicket,
                  alt: "Qoala app: My Tickets screen with ticket #001 details, joined time, and the ticket ID to show at the counter",
                }}
              />
            </div>
          </div>
        </section>

        {/* ── WINDOWS ── */}
        <section
          id="windows"
          aria-labelledby="windows-title"
          className="mx-auto box-border max-w-[1240px] px-[clamp(16px,4vw,48px)] pt-[clamp(40px,6vw,80px)] pb-[clamp(72px,10vw,128px)]"
        >
          <div className="relative rounded-[32px] bg-white shadow-q-card">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 px-[clamp(24px,4vw,52px)] py-[clamp(28px,4vw,48px)]">
              <h2 id="windows-title" className={H2_CLASS}>
                Four windows, one app.
              </h2>
              <p className="m-0 max-w-[30em] text-[1.0625rem] leading-[1.6] text-q-body">
                Each window has its own live line: how many are waiting, who's
                being served and your estimated wait, right on your dashboard.
              </p>
            </div>
            <div className="relative border-t-2 border-dashed border-q-line">
              <span
                aria-hidden="true"
                className="absolute -top-4 -left-4 size-[30px] rounded-full bg-q-bg"
              />
              <span
                aria-hidden="true"
                className="absolute -top-4 -right-4 size-[30px] rounded-full bg-q-bg"
              />
            </div>
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-6 gap-y-7 px-[clamp(24px,4vw,52px)] pt-[clamp(24px,4vw,44px)] pb-[clamp(28px,4vw,48px)]">
              {WINDOWS.map(({ name, icon: Icon, tint }) => (
                <li key={name} className="flex items-center gap-4">
                  <span
                    className={`flex size-[60px] flex-none items-center justify-center rounded-[18px] text-q-blue ${tint}`}
                  >
                    <Icon size={28} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="text-[1.375rem] font-semibold tracking-[-0.02em]">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── WHO CAN JOIN ── */}
        <section
          id="everyone"
          aria-labelledby="everyone-title"
          className="bg-q-blue text-white"
        >
          <div className="mx-auto box-border flex max-w-[1240px] flex-wrap items-start gap-[clamp(32px,5vw,72px)] px-[clamp(16px,4vw,48px)] py-[clamp(72px,10vw,128px)]">
            <div className="min-w-0 flex-[1_1_340px]">
              <h2 id="everyone-title" className={`${H2_CLASS} text-balance`}>
                No STI account? No phone? You still get a number.
              </h2>
              <p className="m-0 mt-5 max-w-[28em] text-[1.0625rem] leading-[1.65] text-q-sky">
                Students, parents, applicants and the people behind the windows
                each have their own way in.
              </p>
            </div>
            <div className="relative min-w-0 flex-[1_1_520px] pt-[118px]">
              <img
                src={koalaPeek}
                alt="Qoala the koala peeking over the list"
                className="absolute top-0.5 left-[clamp(24px,4vw,48px)] block h-auto w-[118px]"
              />
              <ul className="relative m-0 list-none rounded-[32px] bg-white px-[clamp(22px,3.4vw,40px)] py-2 text-q-ink shadow-q-lift">
                {AUDIENCES.map(({ name, body, icon: Icon, tint }) => (
                  <li
                    key={name}
                    className="flex items-start gap-4 border-b-2 border-dashed border-q-line-soft py-[22px] last:border-b-0"
                  >
                    <span
                      className={`flex size-12 flex-none items-center justify-center rounded-[14px] text-q-blue ${tint}`}
                    >
                      <Icon size={24} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="m-0 text-xl font-semibold tracking-[-0.015em]">
                        {name}
                      </h3>
                      <p className="m-0 mt-1.5 text-base leading-[1.6] text-q-body">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── DOWNLOAD ── */}
        <section
          id="download"
          aria-labelledby="download-title"
          className="mx-auto box-border max-w-[1240px] px-[clamp(16px,4vw,48px)] pt-[clamp(72px,10vw,128px)] pb-[clamp(48px,6vw,72px)]"
        >
          <div className="relative flex flex-wrap items-center gap-[clamp(24px,4vw,56px)] rounded-[36px] bg-q-blue p-[clamp(32px,5vw,64px)] text-white shadow-q-phone">
            <span
              aria-hidden="true"
              className="absolute top-1/2 -left-[18px] -mt-[18px] size-9 rounded-full bg-q-bg"
            />
            <span
              aria-hidden="true"
              className="absolute top-1/2 -right-[18px] -mt-[18px] size-9 rounded-full bg-q-bg"
            />
            <img
              src={koalaJump}
              alt="Qoala the koala jumping with both fists up"
              className="block h-auto w-[clamp(150px,18vw,240px)] flex-none"
            />
            <div className="min-w-0 flex-[1_1_380px]">
              <h2
                id="download-title"
                className="m-0 text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.04] font-bold tracking-[-0.035em] text-balance"
              >
                Your spot's saved. Go live your day.
              </h2>
              <p className="m-0 mt-[18px] max-w-[32em] text-[1.0625rem] leading-[1.6] text-q-sky">
                Install Qoala before your next trip to the Registrar or Cashier.
                Next time, the line waits for you.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={APK_URL}
                  className={`inline-flex min-h-[60px] items-center gap-2.5 rounded-[18px] px-[30px] text-lg font-bold ${BUTTON_WHITE}`}
                >
                  <Download size={22} strokeWidth={2.2} aria-hidden="true" />
                  Download for Android
                </a>
                <span className="text-[0.9375rem] text-q-sky">
                  Android app · Made for STI College Malolos
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="mx-auto box-border flex max-w-[1240px] flex-wrap justify-between gap-3 px-[clamp(16px,4vw,48px)] pb-12 text-[0.9375rem] text-q-muted">
        <span>
          <strong className="font-bold text-q-ink">Qoala</strong> · A capstone
          project by DBTK, STI College Malolos
        </span>
        <span>© 2026 Qoala</span>
      </footer>
    </div>
  );
}
