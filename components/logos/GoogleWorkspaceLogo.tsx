import React from "react";

export function GoogleWorkspaceLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Google Workspace logo"
      role="img"
    >
      <rect x="8" y="8" width="104" height="104" rx="24" fill="url(#workspaceBg)" />
      <rect x="27" y="27" width="30" height="30" rx="8" fill="#4285F4" />
      <rect x="63" y="27" width="30" height="30" rx="8" fill="#34A853" />
      <rect x="27" y="63" width="30" height="30" rx="8" fill="#FBBC04" />
      <rect x="63" y="63" width="30" height="30" rx="8" fill="#EA4335" />
      <path
        d="M56 36C56 31.5817 59.5817 28 64 28H76C80.4183 28 84 31.5817 84 36V48C84 52.4183 80.4183 56 76 56H64C59.5817 56 56 52.4183 56 48V36Z"
        fill="white"
        fillOpacity="0.24"
      />
      <path
        d="M34 70C34 66.134 37.134 63 41 63H49C52.866 63 56 66.134 56 70V76C56 79.866 52.866 83 49 83H41C37.134 83 34 79.866 34 76V70Z"
        fill="white"
        fillOpacity="0.28"
      />
      <path
        d="M26 36.5C26 30.1487 31.1487 25 37.5 25H48.5C54.8513 25 60 30.1487 60 36.5V44.5C60 50.8513 54.8513 56 48.5 56H37.5C31.1487 56 26 50.8513 26 44.5V36.5Z"
        fill="#DBEAFE"
        fillOpacity="0.96"
      />
      <path
        d="M58 82.5C58 76.1487 63.1487 71 69.5 71H80.5C86.8513 71 92 76.1487 92 82.5V90.5C92 96.8513 86.8513 102 80.5 102H69.5C63.1487 102 58 96.8513 58 90.5V82.5Z"
        fill="#E0F2FE"
        fillOpacity="0.96"
      />
      <defs>
        <linearGradient id="workspaceBg" x1="8" y1="8" x2="112" y2="112" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FAFC" />
          <stop offset="1" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
