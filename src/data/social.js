// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH FOR ALL LINKS
// Replace the "#" placeholders below as soon as you have the
// real URLs — every button and link in the site reads from here.
// ─────────────────────────────────────────────────────────────

export const PROFILE = {
  name: 'NIMBLEFLEA',
  displayName: '𝑵𝒊𝒎𝒃𝒍𝒆𝑭𝒍𝒆𝒂',
  username: '26.yt',
  brandName: 'Nimble',
  roles: [
    'Discord Bot Developer',
    'Web Developer',
    'Open Source Developer',
    'Creative Developer',
  ],
  github: {
    username: 'nibirbaruah2000-netizen',
    url: 'https://github.com/nibirbaruah2000-netizen/',
  },
  discord: {
    username: '26.yt',
    server: 'N/A',
    url: 'https://discord.gg/---',
  },
};

export const SOCIAL_LINKS = {
  github: 'https://github.com/nibirbaruah2000-netizen/',
  discord: 'https://discord.gg/----',
  linkedin: '#',
  instagram: '#',
  youtube: '#',
  twitter: '#',
  email: 'nibir.baruah2000@gmail.com',
};

// Links equal to "#" are not live yet. Use isPlaceholder() to guard
// clicks/navigation so nothing appears broken to a visitor.
export const isPlaceholder = (url) => !url || url === '#';
