export function Logo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Pulse waves */}
      <circle cx="50" cy="50" r="35" stroke="url(#gradient1)" strokeWidth="2" opacity="0.3" />
      <circle cx="50" cy="50" r="28" stroke="url(#gradient1)" strokeWidth="2" opacity="0.5" />
      <circle cx="50" cy="50" r="21" stroke="url(#gradient1)" strokeWidth="2" opacity="0.7" />
      
      {/* House icon in center */}
      <path
        d="M50 30L35 42V62H45V52H55V62H65V42L50 30Z"
        fill="url(#gradient2)"
        stroke="url(#gradient2)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Logo size={40} />
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          ImmoPulse
        </span>
        <span className="text-xs text-gray-500">Analyse du marché immobilier</span>
      </div>
    </div>
  );
}
