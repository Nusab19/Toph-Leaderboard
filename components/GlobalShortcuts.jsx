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
          // backspace -> back (only if not already at home)
  useHotkeys("backspace", (e) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.back();
    }
  });
  useHotkeys("alt+backspace", (e) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.back();
    }
  });
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
