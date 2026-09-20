import { useEffect, useState } from 'react';

const ROLES = [
  'Discord Bot Developer',
  'Web Developer',
  'Open Source Developer',
  'Creative Developer',
];

export default function TypewriterRole({ reducedMotion = false }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(ROLES[0]);
      return;
    }

    const currentRole = ROLES[roleIndex];
    let timer;

    if (!isDeleting && displayText === currentRole) {
      // Pause at full word for 1.5 seconds
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && displayText === '') {
      // Move to next word after deletion
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    } else {
      // Typing or deleting characters
      const speed = isDeleting ? 38 : 70;
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1);
        setDisplayText(nextText);
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, reducedMotion]);

  if (reducedMotion) {
    return (
      <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-ice">
        Discord Bot & Web Developer
      </span>
    );
  }

  return (
    <span className="inline-flex items-center font-mono text-xs sm:text-sm tracking-wider text-ice drop-shadow-[0_0_12px_rgba(125,211,252,0.4)]">
      <span>{displayText}</span>
      <span className="ml-1 inline-block w-2 sm:w-2.5 text-ice font-bold animate-pulse">
        _
      </span>
    </span>
  );
}
