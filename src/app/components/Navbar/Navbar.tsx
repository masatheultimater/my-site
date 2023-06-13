import Link from 'next/link';
import React from 'react';

function Navbar() {
  return (
    <nav className="container mx-auto lg:px-2 px-5 lg:w2/5">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="text-2xl font-medium">
          私のページ
        </Link>
        <div>
          <ul className="flex items-center py-4">
            <li>
              <Link href="/" className="block px-4 py-2 hover:text-sky-900 transition-all duration-300">Home</Link>
            </li>
            <li>
              <Link href="#" className="block px-4 py-2 hover:text-sky-900 transition-all duration-300">About</Link>
            </li>
            <li>
              <Link href="#" className="block px-4 py-2 hover:text-sky-900 transition-all duration-300">Blog</Link>
            </li>
            <li>
              <Link href="#" className="block px-4 py-2 hover:text-sky-900 transition-all duration-300">Works</Link>
            </li>
            <li>
              <Link href="#" className="block px-4 py-2 hover:text-sky-900 transition-all duration-300">Contact</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
