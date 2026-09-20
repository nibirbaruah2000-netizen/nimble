import { forwardRef } from 'react';
import { isPlaceholder } from '../data/social';

/**
 * Renders an anchor for real URLs (opens in a new tab) or a
 * disabled-looking button for "#" placeholders so nothing appears
 * broken before real links are provided.
 */
const SafeLink = forwardRef(function SafeLink(
  { href, children, className = '', placeholderTitle = 'Link coming soon', onClick, ...props },
  ref
) {
  if (isPlaceholder(href)) {
    return (
      <button
        ref={ref}
        type="button"
        title={placeholderTitle}
        aria-disabled="true"
        onClick={(e) => {
          e.preventDefault();
          onClick?.(e);
        }}
        className={`${className} cursor-not-allowed opacity-60`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
});

export default SafeLink;
