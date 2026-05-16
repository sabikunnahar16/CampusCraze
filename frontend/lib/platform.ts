export type ClubCommitteeMember = {
  role: string;
  name: string;
  department: string;
};

export type ClubEvent = {
  title: string;
  date: string;
  location: string;
  description: string;
};

export type ClubProfile = {
  slug: string;
  name: string;
  slogan: string;
  category: string;
  about: string;
  mission: string;
  vision: string;
  achievements: string[];
  memories: string[];
  committee: ClubCommitteeMember[];
  upcomingEvents: ClubEvent[];
};

export type BusRoute = {
  slug: string;
  name: string;
  description: string;
  keyStops: string[];
};

export type WelfareZone = {
  slug: string;
  name: string;
  supportFocus: string;
  contactLine: string;
};

export type PlatformData = {
  clubs: ClubProfile[];
  busRoutes: BusRoute[];
  welfareZones: WelfareZone[];
};

export type AuthUser = {
  id: number;
  email: string;
  name: string;
  role: string;
  clubSlug: string | null;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

const fallbackPlatformData: PlatformData = {
  clubs: [
    {
      slug: 'badhon',
      name: 'Badhon',
      slogan: 'Blood donation, awareness, and compassionate service.',
      category: 'Health and social service',
      about: 'Badhon coordinates student blood donation support and emergency awareness.',
      mission: 'Build a fast, reliable student network for safe blood donation and humanitarian response.',
      vision: 'Create a culture where every student can find help, donate, and serve without delay.',
      achievements: [
        'Organized recurring blood donation drives with verified donor records.',
        'Built emergency response contacts for students and alumni.',
        'Ran awareness campaigns on donation safety and health literacy.',
      ],
      memories: ['Campus-wide donor registry launch day', 'Late-night emergency support chain during exams', 'Volunteer recognition circle for new donors'],
      committee: [
        { role: 'President', name: 'Nusrat Jahan', department: 'Public Administration' },
        { role: 'General Secretary', name: 'Rafsan Karim', department: 'Economics' },
        { role: 'Coordinator', name: 'Tania Islam', department: 'Biochemistry' },
      ],
      upcomingEvents: [
        {
          title: 'Campus Blood Donation Drive',
          date: '2026-05-18',
          location: 'Jahangirnagar Hall Ground',
          description: 'Voluntary donor sign-up, screening, and awareness booth for new members.',
        },
      ],
    },
    {
      slug: 'udichi',
      name: 'Udichi',
      slogan: 'Culture, performance, and the creative voice of students.',
      category: 'Cultural club',
      about: 'Udichi supports music, drama, recitation, and cultural activism.',
      mission: 'Nurture artistic expression that connects campus culture with social responsibility.',
      vision: 'Be the stage where new performers learn, collaborate, and represent the university with pride.',
      achievements: ['Hosted annual cultural nights with student-led productions.', 'Mentored first-year performers in stagecraft.', 'Produced inter-department cultural showcases and festivals.'],
      memories: ['Open-mic poetry at the auditorium foyer', 'Festival rehearsal after sunset', 'First inter-club drama collaboration'],
      committee: [
        { role: 'President', name: 'Shampa Akter', department: 'Bangla' },
        { role: 'General Secretary', name: 'Mehedi Hasan', department: 'Music' },
        { role: 'Programme Lead', name: 'Rumana Sultana', department: 'Theatre' },
      ],
      upcomingEvents: [
        {
          title: 'Spring Cultural Showcase',
          date: '2026-05-24',
          location: 'Central Auditorium',
          description: 'Dance, theatre, and recitation lineup with open audition slots.',
        },
      ],
    },
    {
      slug: 'ranger-unit',
      name: 'Ranger Unit',
      slogan: 'Leadership, discipline, and service in action.',
      category: 'Scouting and leadership',
      about: 'Ranger Unit trains students in service ethics, campus safety, teamwork, and outdoor leadership.',
      mission: 'Develop disciplined volunteers who can lead events, support safety, and guide peers.',
      vision: 'Build a campus culture where leadership is practical, service-oriented, and visible.',
      achievements: ['Supported major university events with volunteer logistics.', 'Conducted first-aid practice sessions.', 'Ran leadership bootcamps for new recruits.'],
      memories: ['Flag ceremony before orientation week', 'Volunteer drill on rainy morning practice', 'Leadership camp at the fieldhouse'],
      committee: [
        { role: 'Captain', name: 'Aminul Haque', department: 'Management' },
        { role: 'Deputy Captain', name: 'Nadia Rahman', department: 'Law' },
        { role: 'Training Lead', name: 'Sabbir Hossain', department: 'Accounting' },
      ],
      upcomingEvents: [
        {
          title: 'Leadership and Safety Drill',
          date: '2026-05-29',
          location: 'North Field',
          description: 'Safety briefing, team coordination practice, and volunteer orientation.',
        },
      ],
    },
    {
      slug: 'rover-scout',
      name: 'Rover Scout',
      slogan: 'Practical service for a stronger campus community.',
      category: 'Scouting and service',
      about: 'Rover Scout contributes to event management, welfare support, and disciplined volunteer service.',
      mission: 'Create dependable student volunteers for logistics, safety, and outreach.',
      vision: 'Build a campus where service teams are trained, responsive, and respected.',
      achievements: ['Managed volunteer desks for orientation and public programs.', 'Created a service roster for event logistics.', 'Coordinated with welfare teams for student assistance.'],
      memories: ['Volunteer mapping board during annual festival', 'Evening campsite storytelling circle', 'First aid station during sports day'],
      committee: [
        { role: 'Rover Scout Leader', name: 'Sumaya Noor', department: 'Sociology' },
        { role: 'Assistant Leader', name: 'Fahim Ahmed', department: 'History' },
        { role: 'Operations Lead', name: 'Mahiya Tabassum', department: 'Botany' },
      ],
      upcomingEvents: [
        {
          title: 'Service and Logistics Workshop',
          date: '2026-06-01',
          location: 'Student Activity Center',
          description: 'Planning session for volunteers assigned to large campus programs.',
        },
      ],
    },
    {
      slug: 'jnu-reporters-unity',
      name: 'JnU Reporters Unity',
      slogan: 'Student storytelling, verified reporting, and campus transparency.',
      category: 'Media and journalism',
      about: 'JnU Reporters Unity gathers students interested in reporting, fact-checking, event coverage, and campus media.',
      mission: 'Publish accurate, timely, and student-centered coverage of university life.',
      vision: 'Become the most trusted student media community on campus.',
      achievements: ['Published event recaps and interview features.', 'Hosted fact-checking and media literacy sessions.', 'Built a contributor pool for department and club coverage.'],
      memories: ['First newsroom meetup after class hours', 'Live coverage desk during cultural fest', 'Interview circle with new reporters'],
      committee: [
        { role: 'Editor-in-Chief', name: 'Muntasir Rahman', department: 'Mass Communication' },
        { role: 'Managing Editor', name: 'Sadia Khatun', department: 'English' },
        { role: 'Reporter Coordinator', name: 'Oishee Islam', department: 'Political Science' },
      ],
      upcomingEvents: [
        {
          title: 'Campus Reporting Bootcamp',
          date: '2026-06-05',
          location: 'Media Lab',
          description: 'Intro to ethical reporting, short-form writing, and interview practice.',
        },
      ],
    },
  ],
  busRoutes: [
    { slug: 'ulka-1', name: 'ulka1', description: 'Morning route connecting the main campus gate with nearby student housing.', keyStops: ['Campus Gate', 'Press Club Corner', 'Shahbagh Link'] },
    { slug: 'ulka-2', name: 'ulka-2', description: 'Midday shuttle for students moving between classes and hostels.', keyStops: ['Campus Gate', 'Bakshibazar', 'Sadarghat Link'] },
    { slug: 'ulka-3', name: 'ulka-3', description: 'Evening route for club meetings, exams, and late returns.', keyStops: ['Campus Gate', 'New Market Link', 'Dhakeshwari Junction'] },
    { slug: 'uttoron', name: 'uttoron', description: 'Longer-range campus commute designed for special event traffic.', keyStops: ['Campus Gate', 'Old Dhaka Hub', 'University Corner'] },
    { slug: 'projonmo', name: 'projonmo', description: 'Flexible route for student welfare trips and major event support.', keyStops: ['Campus Gate', 'Medical Center', 'Library Junction'] },
  ],
  welfareZones: [
    { slug: 'cumilla', name: 'Cumilla', supportFocus: 'Travel coordination, accommodation support, and alumni guidance.', contactLine: 'Cumilla students help desk' },
    { slug: 'barishal', name: 'Barishal', supportFocus: 'First-year mentoring and event support for newcomers.', contactLine: 'Barishal support circle' },
    { slug: 'mymensingh', name: 'Mymensingh', supportFocus: 'Emergency referral contacts and hostel guidance.', contactLine: 'Mymensingh student welfare desk' },
    { slug: 'dhaka', name: 'Dhaka', supportFocus: 'Urban commute, campus navigation, and event volunteer links.', contactLine: 'Dhaka campus liaison' },
    { slug: 'chattogram', name: 'Chattogram', supportFocus: 'Community networking and peer support during exams.', contactLine: 'Chattogram peer support desk' },
  ],
};

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      ...init,
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    });

  export function loginAdmin(email: string, password: string) {
    return fetchJson<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  export function getCurrentAdmin(accessToken: string) {
    return fetchJson<AuthUser>('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
    export function updateClub(slug: string, payload: Partial<ClubProfile>, accessToken: string) {
    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Request failed with status ${response.status}`);
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    return response.json() as Promise<T>;
  } catch {
    if (path === '/') {
      return fallbackPlatformData as T;
    }

    if (path === '/clubs') {
      return fallbackPlatformData.clubs as T;
    }

    if (path.startsWith('/clubs/')) {
      const slug = path.slice('/clubs/'.length);
      const club = fallbackPlatformData.clubs.find((item) => item.slug === slug);

      if (!club) {
        throw new Error(`Club "${slug}" was not found.`);
      }

      return club as T;
    }

    if (path === '/bus-routes') {
      return fallbackPlatformData.busRoutes as T;
    }

    if (path === '/welfare-zones') {
      return fallbackPlatformData.welfareZones as T;
    }

    throw new Error('Unable to reach the platform API.');
  }
}

export function getPlatformData() {
  return fetchJson<PlatformData>('/');
}

export function getClubs() {
  return fetchJson<ClubProfile[]>('/clubs');
}

export function getClub(slug: string) {
  return fetchJson<ClubProfile>(`/clubs/${slug}`);
}

export function updateClub(slug: string, payload: Partial<ClubProfile>) {
  return fetchJson<ClubProfile>(`/clubs/${slug}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function getBusRoutes() {
  return fetchJson<BusRoute[]>('/bus-routes');
}

export function getWelfareZones() {
  return fetchJson<WelfareZone[]>('/welfare-zones');
}