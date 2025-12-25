"use client";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import { useMemo } from "react";
import { useRouter } from "next/navigation"; // Missing import

export default function GlobalShortcuts() {
  const router = useRouter(); // Missing declaration

  // Keyboard Handlers
  useKeyboardShortcut(
    useMemo(
      () => [
        {
          key: "h",
          action: () => router.push("/"),
          runOnInput: false,
        },
        {
          key: "ctrl+backspace",
          action: () => router.push("/"),
          runOnInput: false,
        },
        { key: "backspace", action: () => router.back(), runOnInput: false },
        {
          key: "alt+backspace",
          action: () => router.back(),
          runOnInput: false,
        },
        {
          key: "escape",
          action: () => document.activeElement.blur(),
          runOnInput: true,
        },
      ],
      [router], // router must be in dependencies
    ),
  );

  return null;
}
