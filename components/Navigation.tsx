'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Microbe Killer', href: '/microbe' },
  { name: 'DIY Formulator', href: '/formulate' },
  { name: 'Green Synthesis', href: '/green-synthesis' },
  { name: 'Lab Calculator', href: '/lab-calc' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#0077B6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CW</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ChemWise</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-[#0077B6]',
                  pathname === item.href
                    ? 'text-[#0077B6] border-b-2 border-[#0077B6] pb-4'
                    : 'text-gray-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-[#0077B6]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}