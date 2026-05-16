'use client';

import { useEffect, useMemo, useState } from 'react';
import { SiteHeader } from '../../components/site-header';
import {
  AuthUser,
  ClubProfile,
  getClubs,
  getCurrentAdmin,
  loginAdmin,
  updateClub,
} from '../../lib/platform';

const emptyClub: ClubProfile = {
  slug: '',
  name: '',
  slogan: '',
  category: '',
  about: '',
  mission: '',
  vision: '',
  achievements: [],
  memories: [],
  committee: [],
  upcomingEvents: [],
};

export default function AdminPage() {
  const [accessToken, setAccessToken] = useState('');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loginEmail, setLoginEmail] = useState('admin@jnucraze.local');
  const [loginPassword, setLoginPassword] = useState('SuperAdmin@2026!');
  const [clubs, setClubs] = useState<ClubProfile[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [form, setForm] = useState(emptyClub);
  const [status, setStatus] = useState('Sign in to manage clubs.');
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const storedToken = window.localStorage.getItem('jnucraze-admin-token');

    if (!storedToken) {
      setAuthLoading(false);
      return;
    }

    setAccessToken(storedToken);

    getCurrentAdmin(storedToken)
      .then((user) => {
        setCurrentUser(user);
        setStatus(`Signed in as ${user.name}.`);
      })
      .catch(() => {
        window.localStorage.removeItem('jnucraze-admin-token');
        setAuthError('Your session expired. Please sign in again.');
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    getClubs()
      .then((items) => {
        const visibleClubs =
          currentUser.role === 'club-admin' && currentUser.clubSlug
            ? items.filter((club) => club.slug === currentUser.clubSlug)
            : items;

        setClubs(visibleClubs);

        const initialClub =
          visibleClubs.find((club) => club.slug === selectedSlug) ?? visibleClubs[0] ?? emptyClub;

        setSelectedSlug(initialClub.slug);
        setForm(initialClub);
        setStatus(`Managing ${visibleClubs.length} club${visibleClubs.length === 1 ? '' : 's'}.`);
      })
      .catch((error: Error) => {
        setStatus(error.message);
      });
  }, [currentUser]);

  const selectedClub = useMemo(
    () => clubs.find((club) => club.slug === selectedSlug) ?? emptyClub,
    [clubs, selectedSlug],
  );

  useEffect(() => {
    if (selectedClub.slug) {
      setForm(selectedClub);
    }
  }, [selectedClub]);

  const updateField = <Key extends keyof ClubProfile>(key: Key, value: ClubProfile[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSave = async () => {
    if (!selectedSlug) {
      return;
    }

    setSaving(true);
    setStatus('Saving changes...');

    try {
      const saved = await updateClub(selectedSlug, form, accessToken);
      setClubs((current) => current.map((club) => (club.slug === saved.slug ? saved : club)));
      setForm(saved);
      setStatus(`Saved ${saved.name}.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogin = async () => {
    setAuthError('');
    setStatus('Signing in...');

    try {
      const response = await loginAdmin(loginEmail, loginPassword);
      window.localStorage.setItem('jnucraze-admin-token', response.accessToken);
      setAccessToken(response.accessToken);
      setCurrentUser(response.user);
      setStatus(`Signed in as ${response.user.name}.`);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Sign in failed.');
      setStatus('Sign in required.');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('jnucraze-admin-token');
    setAccessToken('');
    setCurrentUser(null);
    setClubs([]);
    setSelectedSlug('');
    setForm(emptyClub);
    setStatus('Signed out.');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen text-white">
        <SiteHeader />
        <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 text-center backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">Admin dashboard</p>
            <h1 className="mt-3 text-3xl font-black">Checking admin session...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen text-white">
        <SiteHeader />
        <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-14">
          <section className="space-y-5">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">Admin login</p>
            <h1 className="text-4xl font-black sm:text-5xl">Sign in to edit club profiles</h1>
            <p className="text-lg leading-8 text-slate-300">
              Club admins can manage mission, vision, achievements, memories, committee members,
              and upcoming events once authenticated.
            </p>
            {authError ? <p className="text-sm text-red-300">{authError}</p> : null}
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
            <div className="grid gap-4">
              <Field label="Email" value={loginEmail} onChange={setLoginEmail} />
              <Field
                label="Password"
                value={loginPassword}
                onChange={setLoginPassword}
                type="password"
              />
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="mt-6 rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Sign in
            </button>
            <p className="mt-4 text-xs leading-6 text-slate-400">
              Demo accounts are seeded in the backend for local development.
            </p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <section className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">Admin dashboard</p>
          <h1 className="text-4xl font-black sm:text-5xl">Edit every club profile from one dashboard</h1>
          <p className="text-lg leading-8 text-slate-300">
            Club admins can update mission, vision, achievements, memories, committee members, and
            upcoming events directly against the backend API.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span>Signed in as {currentUser.name}</span>
            <span>Role: {currentUser.role}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-white/15 px-4 py-2 text-white/80 transition hover:border-cyan-300/50 hover:text-cyan-100"
            >
              Sign out
            </button>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
            <label className="text-sm font-semibold text-cyan-100" htmlFor="club-select">
              Select club
            </label>
            <select
              id="club-select"
              value={selectedSlug}
              onChange={(event) => setSelectedSlug(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
            >
              {clubs.map((club) => (
                <option key={club.slug} value={club.slug} className="bg-slate-950">
                  {club.name}
                </option>
              ))}
            </select>

            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <p>Status: {status}</p>
              <p>Current club: {selectedClub.name || 'No club selected'}</p>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Club name" value={form.name} onChange={(value) => updateField('name', value)} />
              <Field label="Slogan" value={form.slogan} onChange={(value) => updateField('slogan', value)} />
              <Field label="Category" value={form.category} onChange={(value) => updateField('category', value)} />
              <Field label="About" value={form.about} onChange={(value) => updateField('about', value)} />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <FieldArea label="Mission" value={form.mission} onChange={(value) => updateField('mission', value)} />
              <FieldArea label="Vision" value={form.vision} onChange={(value) => updateField('vision', value)} />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <FieldArea
                label="Achievements"
                value={form.achievements.join('\n')}
                onChange={(value) => updateField('achievements', value.split('\n').filter(Boolean))}
              />
              <FieldArea
                label="Memories"
                value={form.memories.join('\n')}
                onChange={(value) => updateField('memories', value.split('\n').filter(Boolean))}
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <FieldArea
                label="Committee"
                value={form.committee
                  .map((member) => `${member.role}|${member.name}|${member.department}`)
                  .join('\n')}
                onChange={(value) =>
                  updateField(
                    'committee',
                    value
                      .split('\n')
                      .filter(Boolean)
                      .map((line) => {
                        const [role = '', name = '', department = ''] = line.split('|');
                        return { role, name, department };
                      }),
                  )
                }
              />
              <FieldArea
                label="Upcoming events"
                value={form.upcomingEvents
                  .map((event) => `${event.title}|${event.date}|${event.location}|${event.description}`)
                  .join('\n')}
                onChange={(value) =>
                  updateField(
                    'upcomingEvents',
                    value
                      .split('\n')
                      .filter(Boolean)
                      .map((line) => {
                        const [title = '', date = '', location = '', description = ''] = line.split('|');
                        return { title, date, location, description };
                      }),
                  )
                }
              />
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !selectedSlug}
              className="mt-6 rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-cyan-100">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
      />
    </label>
  );
}

function FieldArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-cyan-100">{label}</span>
      <textarea
        rows={6}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none"
      />
      <span className="mt-2 block text-xs text-slate-400">Use one line per entry. Committee and events are pipe-separated.</span>
    </label>
  );
}