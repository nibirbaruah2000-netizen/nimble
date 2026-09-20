// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH FOR ALL LINKS
// Replace the "#" placeholders below as soon as you have the
// real URLs — every button and link in the site reads from here.
// ─────────────────────────────────────────────────────────────

export const PROFILE = {
  name: 'MOHSIN',
  displayName: 'Mohsin',
  username: 'Mohsin',
  brandName: 'MOHSIN',
  roles: [
    'Discord Bot Developer',
    'Web Developer',
    'Open Source Developer',
    'Creative Developer',
  ],
  github: {
    username: 'MohsinAli088',
    url: 'https://github.com/MohsinAli088/',
  },
  discord: {
    username: 'Mohsin.Exe',
    server: 'CODEx Development',
    url: 'https://discord.gg/codexdevs',
  },
};

export const SOCIAL_LINKS = {
  github: 'https://github.com/MohsinAli088/',
  discord: 'https://discord.gg/codexdevs',
  linkedin: '#',
  instagram: '#',
  youtube: '#',
  twitter: '#',
  email: '#',
};

// Links equal to "#" are not live yet. Use isPlaceholder() to guard
// clicks/navigation so nothing appears broken to a visitor.
export const isPlaceholder = (url) => !url || url === '#';
