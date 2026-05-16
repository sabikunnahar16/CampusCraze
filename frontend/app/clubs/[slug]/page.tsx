import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '../../../components/site-header';
import { getClub, getClubs } from '../../../lib/platform';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const clubs = await getClubs();
  return clubs.map((club) => ({ slug: club.slug }));
}

export default async function ClubPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const club = await getClub(slug);

    return (
      <div className="min-h-screen text-white">
        <SiteHeader />
        <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
          <Link href="/clubs" className="text-sm font-semibold text-cyan-100">
            ← Back to clubs
          </Link>

          <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-7 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-100/70">{club.category}</p>
              <h1 className="mt-3 text-4xl font-black sm:text-5xl">{club.name}</h1>
              <p className="mt-4 text-lg leading-8 text-slate-300">{club.about}</p>
              <div className="mt-6 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/70">Slogan</p>
                <p className="mt-2 text-base leading-7 text-cyan-50">{club.slogan}</p>
              </div>
            </div>

            <div className="grid gap-4">
              <InfoCard title="Mission" body={club.mission} />
              <InfoCard title="Vision" body={club.vision} />
              <InfoCard title="Upcoming event" body={club.upcomingEvents[0]?.description ?? 'No event is scheduled yet.'} />
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <Panel title="Achievements" items={club.achievements} />
            <Panel title="Memories" items={club.memories} />
          </section>

          <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/6 p-7 backdrop-blur-xl">
            <h2 className="text-2xl font-bold">Committee</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {club.committee.map((member) => (
                <div key={`${member.role}-${member.name}`} className="rounded-[1.25rem] border border-white/10 bg-slate-950/50 p-4">
                  <p className="text-sm font-semibold text-cyan-100">{member.role}</p>
                  <p className="mt-2 text-base font-medium">{member.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{member.department}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/6 p-7 backdrop-blur-xl">
            <h2 className="text-2xl font-bold">Upcoming events</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {club.upcomingEvents.map((event) => (
                <article key={event.title} className="rounded-[1.25rem] border border-white/10 bg-slate-950/50 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/70">{event.date}</p>
                  <h3 className="mt-2 text-xl font-semibold">{event.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{event.description}</p>
                  <p className="mt-4 text-sm text-slate-400">{event.location}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  } catch {
    notFound();
  }
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5">
      <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/70">{title}</p>
      <p className="mt-3 text-sm leading-7 text-slate-300">{body}</p>
    </article>
  );
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/6 p-7 backdrop-blur-xl">
      <h2 className="text-2xl font-bold">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}