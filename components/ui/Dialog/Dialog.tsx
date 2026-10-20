"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

import Icon from "@/components/ui/Icon/Icon";

type DialogName = { labelledBy: string; label?: never } | { label: string; labelledBy?: never };

type DialogProps = DialogName & {
  /** Opened by a DialogTrigger with the same id. */
  id: string;
  closeLabel: string;
  /** Close on any click, not only on the backdrop (image viewers). */
  closeOnClick?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Modal built on the native <dialog>: showModal() makes the rest of the page
 * inert (focus stays inside), Escape closes it, and focus returns to the opener.
 */
export default function Dialog({ id, labelledBy, label, closeLabel, closeOnClick = false, className, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  // Only close on a click that also started on the backdrop, so selecting
  // text and releasing outside the panel does not dismiss the dialog.
  const pressedBackdrop = useRef(false);

  const close = () => ref.current?.close();

  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    const onBackdrop = event.target === event.currentTarget && pressedBackdrop.current;
    // Clicks inside nested dialogs bubble up here too; leave those alone.
    const inThisDialog = (event.target as Element).closest("dialog") === event.currentTarget;
    if (onBackdrop || (closeOnClick && inThisDialog)) close();
  };

  return (
    <dialog
      ref={ref}
      id={id}
      className={className ? `dialog ${className}` : "dialog"}
      aria-labelledby={labelledBy}
      aria-label={label}
      onPointerDown={(event) => {
        pressedBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={onClick}
    >
      <button type="button" className="dialog__close" aria-label={closeLabel} onClick={close}>
        <Icon name="close" />
      </button>
      {children}
    </dialog>
  );
}
