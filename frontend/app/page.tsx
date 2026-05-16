import Link from 'next/link';
import { SiteHeader } from '../components/site-header';
import { getPlatformData } from '../lib/platform';

export default async function Home() {
  const platform = await getPlatformData();

  return (
    <div className="min-h-screen text-white">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-10 lg:px-8 lg:py-14">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-medium tracking-[0.28em] text-cyan-100 uppercase">
              Jagannath University club network
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              JnUCraze connects clubs, JnUBus, and student welfare in one living campus platform.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Explore clubs like Badhon, Udichi, Ranger Unit, Rover Scout, and JnU Reporters Unity.
              Each club has a dedicated page for mission, vision, achievements, memories, committee,
              and upcoming events, with admin tools ready for updates.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/clubs" className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200">
                Browse clubs
              </Link>
              <Link href="/admin" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white/90 transition hover:border-cyan-300/50 hover:bg-white/8">
                Open admin dashboard
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">Live platform status</p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/6 p-4">
                  <p className="text-2xl font-black text-cyan-100">{platform.clubs.length}</p>
                  <p className="text-xs text-slate-400">clubs</p>
                </div>
                <div className="rounded-2xl bg-white/6 p-4">
                  <p className="text-2xl font-black text-cyan-100">{platform.busRoutes.length}</p>
                  <p className="text-xs text-slate-400">JnUBus routes</p>
                </div>
                <div className="rounded-2xl bg-white/6 p-4">
                  <p className="text-2xl font-black text-cyan-100">{platform.welfareZones.length}</p>
                  <p className="text-xs text-slate-400">welfare zones</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {platform.clubs.slice(0, 4).map((club) => (
                <Link
                  key={club.slug}
                  href={`/clubs/${club.slug}`}
                  className="rounded-[1.25rem] border border-white/10 bg-slate-900/80 p-4 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-slate-900"
                >
                  <p className="text-sm font-semibold text-cyan-100">{club.name}</p>
                  <p className="mt-2 text-sm text-slate-300">{club.slogan}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">Clubs</p>
            <h2 className="mt-3 text-2xl font-bold">One page for every club</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              The clubs dropdown points to a complete club directory. Each club page keeps the same
              structure so updates stay consistent.
            </p>
            <Link href="/clubs" className="mt-5 inline-flex text-sm font-semibold text-cyan-100">
              View all clubs →
            </Link>
          </article>
          <article className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">JnUBus</p>
            <h2 className="mt-3 text-2xl font-bold">Routes that students actually use</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              ulka1, ulka-2, ulka-3, uttoron, and projonmo are listed with route notes so the bus
              dropdown is not just decorative.
            </p>
            <Link href="/jnubus" className="mt-5 inline-flex text-sm font-semibold text-cyan-100">
              Explore JnUBus →
            </Link>
          </article>
          <article className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">Student welfare</p>
            <h2 className="mt-3 text-2xl font-bold">Regional support groups</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Cumilla, Barishal, Mymensingh, and other zones can surface support contacts and peer
              help for new students.
            </p>
            <Link href="/student-welfare" className="mt-5 inline-flex text-sm font-semibold text-cyan-100">
              Open welfare hub →
            </Link>
          </article>
        </section>
      </main>
    </div>
  );
}
