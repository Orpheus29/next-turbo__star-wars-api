'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { CustomButton } from '@/components';

export const Header = () => {
  const [isBaaam, setIsBaaam] = useState(false);

  const handleBaaamClick = () => {
    setIsBaaam(true);
    setTimeout(() => setIsBaaam(false), 1500);
  };

  useEffect(() => {
    if (isBaaam) {
      document.body.classList.add('baaam');
      setTimeout(() => document.body.classList.remove('baaam'), 1500);
    }
  }, [isBaaam]);

  return (
    <header className='w-full absolute z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
        <Link href='/' className='flex justify-center items-center'>
          <Image
            src='/starwars.png'
            alt='Car Hub Logo'
            width={150}
            height={100}
            className='object-contain'
          />
        </Link>

        <CustomButton
          title='Fire!'
          textStyles='text-secondary-orange text-xl'
          handleClick={handleBaaamClick}
        />
      </nav>
    </header>
  )
}
