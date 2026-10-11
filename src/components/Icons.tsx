type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const IconPhone = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="7" y="2" width="10" height="20" rx="2" /><line x1="11" y1="18" x2="13" y2="18" /></svg>
);
export const IconChat = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M21 11.5a8.4 8.4 0 0 1-12.7 7.2L3 20l1.3-4.9A8.4 8.4 0 1 1 21 11.5z" /></svg>
);
export const IconMail = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const IconInstagram = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>
);
export const IconCheck = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.2}><polyline points="20 6 9 17 4 12" /></svg>
);
export const IconX = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
export const IconExternal = ({ className = "size-3.5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}><path d="M14 4h6v6" /><path d="M10 14 20 4" /><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" /></svg>
);
export const IconWhatsApp = ({ className = "size-7" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="white" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
    <path d="M12 2C6.49 2 2.01 6.48 2.01 12c0 1.76.46 3.48 1.34 5L2 22l5.12-1.34A9.96 9.96 0 0 0 12 21.9h.01c5.51 0 9.99-4.48 9.99-10A9.93 9.93 0 0 0 12 2zm0 18.17h-.01a8.3 8.3 0 0 1-4.22-1.16l-.3-.18-3.04.8.81-2.96-.2-.31a8.27 8.27 0 0 1-1.27-4.37c0-4.58 3.73-8.3 8.31-8.3a8.3 8.3 0 0 1 8.3 8.31c0 4.58-3.73 8.17-8.38 8.17z" />
  </svg>
);
