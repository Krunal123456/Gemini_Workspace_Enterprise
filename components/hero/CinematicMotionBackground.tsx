export function CinematicMotionBackground() {
  return (
    <div className="hero-sky" aria-hidden="true">
      <div className="hero-sky-glow hero-sky-glow-one" />
      <div className="hero-sky-glow hero-sky-glow-two" />
      <svg
        className="hero-sky-clouds"
        viewBox="0 0 1600 620"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        <defs>
          <linearGradient id="cloud-front" x1="800" y1="240" x2="800" y2="620" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity=".82" />
            <stop offset="1" stopColor="#DCEEFF" stopOpacity=".94" />
          </linearGradient>
          <linearGradient id="cloud-back" x1="800" y1="320" x2="800" y2="620" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity=".48" />
            <stop offset="1" stopColor="#E7F3FF" stopOpacity=".7" />
          </linearGradient>
        </defs>
        <path
          d="M-50 477c32-51 88-78 151-78 12-84 84-149 173-149 46 0 88 19 119 49 39-93 131-158 238-158 112 0 207 71 243 171 25-13 54-20 85-20 102 0 185 78 192 178 58-29 130-18 177 31 1 1 2 2 3 4v130H-50V477Z"
          fill="url(#cloud-back)"
        />
        <path
          d="M-80 550c38-55 102-91 175-91 20-95 104-165 205-165 53 0 101 21 137 56 43-75 124-125 217-125 111 0 204 78 226 182 31-24 70-38 112-38 93 0 170 72 178 163 72-25 152 6 187 75v93H-80v-150Z"
          fill="url(#cloud-front)"
        />
        <path
          d="M1100 483c26-35 68-58 115-58 10-55 58-96 116-96 42 0 79 23 99 57 20-9 43-14 67-14 88 0 159 69 159 154 0 39-15 75-39 102h-517v-145Z"
          fill="#FFFFFF"
          fillOpacity=".5"
        />
      </svg>
      <div className="hero-sky-horizon" />
    </div>
  );
}
