import Link from 'next/link';

const clubLinks = [
  { href: '/clubs/badhon', label: 'Badhon' },
  { href: '/clubs/udichi', label: 'Udichi' },
  { href: '/clubs/ranger-unit', label: 'Ranger Unit' },
  { href: '/clubs/rover-scout', label: 'Rover Scout' },
  { href: '/clubs/jnu-reporters-unity', label: 'JnU Reporters Unity' },
];

const busLinks = [
  { href: '/jnubus#ulka-1', label: 'ulka1' },
  { href: '/jnubus#ulka-2', label: 'ulka-2' },
  { href: '/jnubus#ulka-3', label: 'ulka-3' },
  { href: '/jnubus#uttoron', label: 'uttoron' },
  { href: '/jnubus#projonmo', label: 'projonmo' },
];

const welfareLinks = [
  { href: '/student-welfare#cumilla', label: 'Cumilla' },
  { href: '/student-welfare#barishal', label: 'Barishal' },
  { href: '/student-welfare#mymensingh', label: 'Mymensingh' },
  { href: '/student-welfare#dhaka', label: 'Dhaka' },
  { href: '/student-welfare#chattogram', label: 'Chattogram' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-400/40 bg-cyan-300/10 text-lg font-black text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.24)]">
              J
            </span>
            <span className="text-lg font-semibold tracking-[0.28em] text-white uppercase">
              JnUCraze
            </span>
          </Link>
          <Link
            href="/admin"
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-cyan-300/50 hover:text-cyan-100 lg:hidden"
          >
            Admin
          </Link>
        </div>

        <nav className="flex flex-wrap items-center gap-3 text-sm text-white/80">
          <Link href="/" className="rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white">
            Home
          </Link>
          <Link href="/clubs" className="rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white">
            Clubs
          </Link>
          <details className="group relative">
            <summary className="cursor-pointer list-none rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white">
              JnUBus
            </summary>
            <div className="absolute left-0 mt-2 w-48 rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl shadow-black/30">
              {busLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-3 py-2 text-white/70 transition hover:bg-white/8 hover:text-cyan-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
          <details className="group relative">
            <summary className="cursor-pointer list-none rounded-full px-4 py-2 transition hover:bg-white/8 hover:text-white">
              Student Welfare
            </summary>
            <div className="absolute left-0 mt-2 w-52 rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl shadow-black/30">
              {welfareLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-3 py-2 text-white/70 transition hover:bg-white/8 hover:text-cyan-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
          <Link href="/admin" className="hidden rounded-full border border-cyan-300/30 px-4 py-2 text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10 lg:inline-flex">
            Admin Dashboard
          </Link>
        </nav>
      </div>

      <div className="border-t border-white/5 bg-white/5 px-4 py-2 text-center text-xs tracking-[0.24em] text-cyan-100/70 uppercase">
        Connected clubs, buses, and student welfare on one platform
      </div>
    </header>
  );
}