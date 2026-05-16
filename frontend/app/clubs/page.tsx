import Link from 'next/link';
import { SiteHeader } from '../../components/site-header';
import { getClubs } from '../../lib/platform';

export default async function ClubsPage() {
  const clubs = await getClubs();

  return (
    <div className="min-h-screen text-white">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <section className="mb-10 max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">Clubs directory</p>
          <h1 className="text-4xl font-black sm:text-5xl">Every club in one consistent layout</h1>
          <p className="text-lg leading-8 text-slate-300">
            Select any club to open a dedicated page showing the same core information: mission,
            vision, achievements, memories, committee, and upcoming events.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {clubs.map((club) => (
            <Link
              key={club.slug}
              href={`/clubs/${club.slug}`}
              className="rounded-[1.5rem] border border-white/10 bg-white/6 p-6 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/10"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/70">{club.category}</p>
              <h2 className="mt-3 text-2xl font-bold">{club.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{club.slogan}</p>
              <p className="mt-6 text-sm font-semibold text-cyan-100">Open club page →</p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}