"use client";

import { useState } from "react";

const IP = "planetearth.kr";

export default function CopyIPButton() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(IP).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => {});
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 text-lg px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors duration-300 text-white"
    >
      IP: {IP}
      {copied ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth={2} strokeLinejoin="round" />
          <path strokeWidth={2} strokeLinejoin="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      )}
    </button>
  );
}
