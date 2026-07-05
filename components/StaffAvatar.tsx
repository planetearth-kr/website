"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  id: string;
  name: string;
  alt: string;
};

export default function StaffAvatar({ id, name, alt }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400"
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={`https://api.mcheads.org/head/${id}/64`}
      alt={alt}
      width={64}
      height={64}
      className="w-full h-full object-cover"
      style={{ imageRendering: "pixelated" }}
      onError={() => setFailed(true)}
    />
  );
}
