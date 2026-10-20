"use client";

import type { ReactNode } from "react";

interface DialogTriggerProps {
  /** Id of the Dialog to open. */
  dialogId: string;
  className?: string;
  children: ReactNode;
}

/** Button that opens a Dialog rendered elsewhere on the page. */
export default function DialogTrigger({ dialogId, className, children }: DialogTriggerProps) {
  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={(event) => {
        const dialog = document.getElementById(dialogId);
        if (!(dialog instanceof HTMLDialogElement)) return;
        const opener = event.currentTarget;
        dialog.showModal();
        dialog.scrollTop = 0;
        // Browsers restore focus on close, but not all do it reliably yet.
        dialog.addEventListener("close", () => opener.focus(), { once: true });
      }}
    >
      {children}
    </button>
  );
}
