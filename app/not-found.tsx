import Link from "next/link";
import messages from "@/messages/ko.json";
import NotFoundView from "@/components/NotFoundView";
import "./globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="ko">
      <body className="antialiased">
        <NotFoundView strings={messages.notFound} Link={Link} />
      </body>
    </html>
  );
}
