import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl">Car Inventory</h1>
      <Link href="/login">
        <p className="text-sm bg-blue-500 px-3 py-1 rounded">Login</p>
      </Link>
    </header>
  );
}
