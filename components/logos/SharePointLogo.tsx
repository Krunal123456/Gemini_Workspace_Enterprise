export function SharePointLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-label="SharePoint">
      <circle cx="18" cy="9" r="8" fill="#036C70"/>
      <circle cx="10" cy="19" r="10" fill="#1A9BA1"/>
      <circle cx="19" cy="25" r="7" fill="#37C6D0"/>
      <path d="M10 9h9a8 8 0 010 16H10A10 10 0 0010 9z" fill="#038387"/>
      <path d="M2 19h17a7 7 0 010 14H2v-7" fill="#1A9BA1" opacity=".6"/>
    </svg>
  );
}
