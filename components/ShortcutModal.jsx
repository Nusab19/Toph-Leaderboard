"use client";

import { useState, useMemo } from "react";
import useKeyboardShortcuts from "@/hooks/useKeyboardShortcut";

const ShortcutModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const groups = [
    {
      title: "Categories & Theme",
      items: [
        { key: "f", desc: "Select Fastest" },
        { key: "l", desc: "Select Lightest" },
        { key: "s", desc: "Select Shortest" },
        { key: "Ctrl + .", desc: "Toggle Theme" },
      ],
    },
    {
      title: "Navigation",
      items: [
        { key: "← / →", desc: "Prev / Next Page" },
        { key: "Backspace", desc: "Go Back" },
        { key: "Ctrl + Bksp", desc: "Home Page" },
      ],
    },
    {
      title: "Quick Selection",
      items: [
        { key: "1 - 9, 0", desc: "Go to `n`th User" },
        { key: "Ctrl + 1, 0", desc: "Jump to `10+n`th User" },
      ],
    },
    {
      title: "System",
      items: [
        { key: "/", desc: "Toggle Menu" },
        { key: "Esc", desc: "Close Menu" },
      ],
    },
  ];

  const toggleModal = () => setIsOpen((prev) => !prev);
  const closeModal = () => setIsOpen(false);

  useKeyboardShortcuts(
    useMemo(
      () => [
        { key: "/", action: toggleModal, runOnInput: false },
        { key: "escape", action: closeModal, runOnInput: true },
      ],
      []
    )
  );

  // Helper to render descriptions with backtick highlighting
  const formatDesc = (text) => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="mx-0.5 rounded bg-blue-100  px-1 pb-[1px] font-mono text-[12px] font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gray-50 px-6 py-3 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-base font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-500 text-white text-[10px]">
              ?
            </span>
            Shortcuts
          </h2>
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            Don't leave your keyboard
          </span>
        </div>

        <div className="p-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-2">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-blue-500/80 mb-1">
                  {group.title}
                </h3>
                {group.items.map((item) => (
                  <div
                    key={item.desc}
                    className="flex items-center justify-between border-b border-gray-50 pb-1.5 last:border-0 dark:border-gray-800"
                  >
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {formatDesc(item.desc)}
                    </span>
                    <div className="flex gap-1 items-center">
                      <kbd className="min-w-[1.8rem] text-center rounded border border-gray-300 bg-white px-1.5 py-0.5 text-[10px] font-mono font-bold text-gray-700 shadow-[0_1.5px_0_rgba(0,0,0,0.1)] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:shadow-[0_1.5px_0_rgba(255,255,255,0.05)]">
                        {item.key}
                      </kbd>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-3 text-center text-[11px] text-gray-400 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800">
          Here <span className="font-bold text-gray-500">0</span> means the <span className="font-bold text-gray-500">10th</span> user.
        </div>
      </div>
    </div>
  );
};

export default ShortcutModal;
