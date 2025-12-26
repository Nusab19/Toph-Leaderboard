"use client";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import { useMemo } from "react";
import { useRouter, usePathname } from "next/navigation"; // Missing import

export default function GlobalShortcuts() {
  const router = useRouter(); // Missing declaration
  const pathname = usePathname();

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
        {
          key: "backspace",
          action: () => pathname !== "/" && router.back(),
          runOnInput: false,
        },
        {
          key: "alt+backspace",
          action: () => pathname !== "/" && router.back(),
          runOnInput: true,
        },
        {
          key: "escape",
          action: () => document.activeElement.blur(),
          runOnInput: true,
        },
      ],
      [router, pathname], // router must be in dependencies
    ),
  );

  return null;
}
