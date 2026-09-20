import { useEffect, useState } from 'react';

/**
 * Returns { isMobile, isTablet, isTouch, prefersReducedMotion }
 * isMobile   -> width < 768
 * isTablet   -> 768 <= width < 1024
 * isTouch    -> device has no fine pointer (used to disable custom cursor)
 */
export function useDeviceProfile() {
  const [profile, setProfile] = useState(() => getProfile());

  useEffect(() => {
    const onResize = () => setProfile(getProfile());
    window.addEventListener('resize', onResize);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => setProfile(getProfile());
    motionQuery.addEventListener?.('change', onMotionChange);

    return () => {
      window.removeEventListener('resize', onResize);
      motionQuery.removeEventListener?.('change', onMotionChange);
    };
  }, []);

  return profile;
}

function getProfile() {
  if (typeof window === 'undefined') {
    return { isMobile: false, isTablet: false, isTouch: false, prefersReducedMotion: false };
  }
  const width = window.innerWidth;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isTouch,
    prefersReducedMotion,
  };
}
