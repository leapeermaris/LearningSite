import { CONTACT } from "~/lib/site";
import { IconWhatsApp } from "./Icons";

export function WhatsAppFab() {
  return (
    <a
      href={CONTACT.whatsappWithText}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שיחה בוואטסאפ (נפתח בחלון חדש)"
      className="no-print fixed bottom-4 left-4 z-[999] flex size-[3.25rem] items-center justify-center rounded-full bg-whatsapp shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-transform hover:-translate-y-0.5 sm:bottom-7 sm:left-7 sm:size-[3.625rem]"
    >
      <IconWhatsApp />
    </a>
  );
}
