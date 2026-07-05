import type { ElementType } from "react";

type Props = {
  strings: { title: string; description: string; home: string };
  Link: ElementType;
};

export default function NotFoundView({ strings, Link }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{strings.title}</h2>
      <p className="text-gray-600 mb-8">{strings.description}</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-300"
      >
        {strings.home}
      </Link>
    </div>
  );
}
