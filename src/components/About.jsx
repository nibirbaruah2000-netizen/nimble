import { Bot, Globe, Sparkles } from 'lucide-react';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import TechIcon from './TechIcon';
import { PROFILE } from '../data/social';

const CARDS = [
  {
    icon: Bot,
    title: 'Discord Systems',
    tags: [
      { name: 'Discord.js', id: 'discordjs' },
      { name: 'Automation', id: 'nodejs' },
      { name: 'Dashboards', id: 'react' },
    ],
  },
  {
    icon: Globe,
    title: 'Web Experiences',
    tags: [
      { name: 'React', id: 'react' },
      { name: 'Next.js', id: 'nextjs' },
      { name: 'Tailwind CSS', id: 'tailwind' },
    ],
  },
  {
    icon: Sparkles,
    title: '3D & Motion',
    tags: [
      { name: 'Three.js', id: 'threejs' },
      { name: 'JavaScript', id: 'javascript' },
      { name: 'Interactive UI', id: 'react' },
    ],
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <Reveal>
              <span className="eyebrow">About</span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ice-light sm:text-4xl">
                Building digital
                <br />
                experiences.
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-6 max-w-md">
              <p className="text-sm leading-relaxed text-ice-light/65 sm:text-base">
                I&apos;m {PROFILE.displayName}, a {PROFILE.roles[0].toLowerCase()},{' '}
                {PROFILE.roles[1].toLowerCase()} and {PROFILE.roles[2].toLowerCase()}.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ice-light/65 sm:text-base">
                I build Discord bots, web applications and interactive digital experiences with a
                focus on clean engineering, automation and modern UI.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-2">
              {PROFILE.roles.map((role) => (
                <span
                  key={role}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ice-light/60 transition-colors hover:border-ice/30 hover:text-ice-light"
                >
                  <TechIcon
                    name={
                      role.toLowerCase().includes('discord')
                        ? 'discordjs'
                        : role.toLowerCase().includes('web')
                        ? 'react'
                        : 'git'
                    }
                    size={13}
                    className="text-ice/70 group-hover:text-ice"
                  />
                  {role}
                </span>
              ))}
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {CARDS.map((card, i) => (
              <Reveal
                key={card.title}
                delay={i * 0.1}
                className={i === 2 ? 'sm:col-span-2' : ''}
              >
                <TiltCard className="h-full rounded-2xl">
                  <div className="glass-panel relative h-full overflow-hidden rounded-2xl p-7">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-ice/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                    <card.icon className="text-ice" size={26} strokeWidth={1.5} />
                    <h3 className="mt-5 font-display text-lg font-semibold text-ice-light">
                      {card.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag.name}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] text-ice-light/50"
                        >
                          <TechIcon name={tag.id} size={11} className="text-ice/60" />
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
