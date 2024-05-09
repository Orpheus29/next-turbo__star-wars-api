'use client';

import { useState } from 'react';

import { HeroDetails } from './HeroDetails';

import { HeroCardProps } from '@/types';
import { useAtom } from 'jotai';
import { isHorizontalAtom } from '@/utils/atoms';

export const HeroCard = (
  { hero, planet, allFilms, allStarships }: HeroCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setDirection] = useAtom(isHorizontalAtom);

  const onClose = () => {
    setIsModalOpen(false);
    setDirection(true);
  }

  return (
    <>
      <button
        className="truncate rounded-lg text-center border border-transparent outline-none px-5 py-4 transition-colors ring-2 shadow-lg shadow-neutral-800/50 hover:shadow-neutral-700/50 ring-neutral-800/50 hover:bg-neutral-800/20"
        onClick={() => setIsModalOpen(true)}
      >
        <h2 className="mb-3 text-xl xs:text-[22px] font-medium">
          {hero.name}
        </h2>
        <p className="m-0 max-w-[30ch] text-md">
          <span className="text-secondary-orange text-sm">Planet: </span>{planet}
        </p>
      </button>

      {isModalOpen && (
        <HeroDetails
          hero={hero}
          homeworld={planet}
          isModalOpen={isModalOpen}
          closeModal={onClose}
          allFilms={allFilms}
          allStarships={allStarships}
        />
      )}
    </>
  );
}
