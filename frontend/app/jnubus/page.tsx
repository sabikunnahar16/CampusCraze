import { SiteHeader } from '../../components/site-header';
import { getBusRoutes } from '../../lib/platform';

export default async function JnubusPage() {
  const routes = await getBusRoutes();

  return (
    <div className="min-h-screen text-white">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <section className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">JnUBus</p>
          <h1 className="text-4xl font-black sm:text-5xl">Routes students can actually navigate</h1>
          <p className="text-lg leading-8 text-slate-300">
            The dropdown links to each named route so students can quickly check the commute style
            and main stops for ulka1, ulka-2, ulka-3, uttoron, and projonmo.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {routes.map((route) => (
            <article
              key={route.slug}
              id={route.slug}
              className="rounded-[1.5rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/70">Route</p>
              <h2 className="mt-3 text-2xl font-bold">{route.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{route.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {route.keyStops.map((stop) => (
                  <span key={stop} className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs text-cyan-50">
                    {stop}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}