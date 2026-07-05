import type { ReactNode } from "react";
import type { Metadata } from "next";
import messages from "@/messages/ko.json";

export const metadata: Metadata = {
  title: `${messages.notFound.title} | ${messages.meta.title}`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
