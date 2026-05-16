import { SiteHeader } from '../../components/site-header';
import { getWelfareZones } from '../../lib/platform';

export default async function StudentWelfarePage() {
  const zones = await getWelfareZones();

  return (
    <div className="min-h-screen text-white">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <section className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">Student welfare</p>
          <h1 className="text-4xl font-black sm:text-5xl">Regional support groups and peer help</h1>
          <p className="text-lg leading-8 text-slate-300">
            Student welfare links students by region so the platform can surface relevant contacts,
            support, and campus assistance without making the directory feel generic.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {zones.map((zone) => (
            <article
              key={zone.slug}
              id={zone.slug}
              className="rounded-[1.5rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/70">{zone.name}</p>
              <h2 className="mt-3 text-2xl font-bold">{zone.contactLine}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{zone.supportFocus}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}