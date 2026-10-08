export function JiraLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-label="Jira">
      <defs>
        <linearGradient id="jira-a" x1="100%" x2="45.955%" y1="12.88%" y2="56.993%">
          <stop offset="0%" stopColor="#0052CC"/>
          <stop offset="100%" stopColor="#2684FF"/>
        </linearGradient>
        <linearGradient id="jira-b" x1="0%" x2="55.044%" y1="87.12%" y2="43.007%">
          <stop offset="0%" stopColor="#0052CC"/>
          <stop offset="100%" stopColor="#2684FF"/>
        </linearGradient>
      </defs>
      <path d="M15.977 0L8 7.951l4.05 4.047 3.927-3.921 7.977 7.946L28 12.01z" fill="url(#jira-a)"/>
      <path d="M15.977 12.023l-4.05 4.047L4 8.076 0 12.023l7.977 7.946 4.05-4.047L16 19.977l3.927-3.97z" fill="url(#jira-b)"/>
      <path d="M16 16.023l-4.023 4.023 4.023 4.023L20.023 20z" fill="#2684FF"/>
    </svg>
  );
}
