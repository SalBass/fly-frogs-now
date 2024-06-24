import Link from 'next/link';

export default function Header(props) {
  return (
    <div className="p-2">
      <Link href="/">
        <h1 className="text-4xl font-bold font-display">
          Fly Frogs
        </h1>
      </Link>
    </div>
  );
}