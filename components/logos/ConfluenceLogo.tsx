export function ConfluenceLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-label="Confluence">
      <defs>
        <linearGradient id="conf-a" x1="98.76%" x2="38.42%" y1="18.95%" y2="55.23%">
          <stop offset="0%" stopColor="#0052CC"/>
          <stop offset="100%" stopColor="#2684FF"/>
        </linearGradient>
        <linearGradient id="conf-b" x1="1.24%" x2="61.58%" y1="81.05%" y2="44.77%">
          <stop offset="0%" stopColor="#0052CC"/>
          <stop offset="100%" stopColor="#2684FF"/>
        </linearGradient>
      </defs>
      <path d="M1.56 23.29c-.38.62-.82 1.36-1.13 1.88a.88.88 0 00.29 1.21l5.2 3.13a.88.88 0 001.22-.32c.28-.49.73-1.24 1.2-2.08 3.22-5.49 6.48-4.82 12.33-1.95l5.15 2.48a.88.88 0 001.17-.42l2.51-5.51a.88.88 0 00-.42-1.17C24.15 18.6 12.62 13 1.56 23.29z" fill="url(#conf-a)"/>
      <path d="M30.44 8.71c.38-.62.82-1.36 1.13-1.88a.88.88 0 00-.29-1.21L26.08 2.49a.88.88 0 00-1.22.32c-.28.49-.73 1.24-1.2 2.08-3.22 5.49-6.48 4.82-12.33 1.95L6.18 4.36A.88.88 0 005 4.78L2.5 10.29a.88.88 0 00.42 1.17C7.85 13.4 19.38 19 30.44 8.71z" fill="url(#conf-b)"/>
    </svg>
  );
}
