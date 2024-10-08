"use client";

import * as React from "react";
import { useTheme } from "next-themes";

const MOON = ({
  className,
  onClick,
}: {
  className: string;
  onClick?: () => void;
}) => (
  <svg
    className={className}
    onClick={onClick}
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.03009 12.42C2.39009 17.57 6.76009 21.76 11.9901 21.99C15.6801 22.15 18.9801 20.43 20.9601 17.72C21.7801 16.61 21.3401 15.87 19.9701 16.12C19.3001 16.24 18.6101 16.29 17.8901 16.26C13.0001 16.06 9.00009 11.97 8.98009 7.13996C8.97009 5.83996 9.24009 4.60996 9.73009 3.48996C10.2701 2.24996 9.62009 1.65996 8.37009 2.18996C4.41009 3.85996 1.70009 7.84996 2.03009 12.42Z"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SUN = ({
  className,
  onClick,
}: {
  className: string;
  onClick?: () => void;
}) => (
  <svg
    className={className}
    onClick={onClick}
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="mr-2 h-8 w-8 select-none hover:cursor-pointer md:mr-4 md:h-10 md:w-10">
      <MOON
        className="block h-full w-full rounded-md bg-gray-100/30 p-1.5 hover:bg-gray-200/30 active:scale-90 dark:hidden"
        onClick={() => setTheme("dark")}
      />
      <SUN
        className="hidden h-full w-full rounded-md bg-gray-700/15 p-1.5 hover:bg-gray-700/25 active:scale-90 dark:block"
        onClick={() => setTheme("light")}
      />
    </div>
  );
}
