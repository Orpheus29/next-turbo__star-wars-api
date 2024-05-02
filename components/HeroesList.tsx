import React from 'react';

import { HeroCard, PaginationControls } from "@/components";

import { HeroesListProps } from '@/types';

export async function HeroesList({
  heroes,
  homeworlds,
  totalPages,
  allFilms,
  allStarships,
}: HeroesListProps) {
  const isDataEmpty = !Array.isArray(heroes) || !heroes.length || !heroes;

  return (
    <>
      {!isDataEmpty
        ? (
          <>
            <div className="mx-auto xl:h-52">
              <ul className="grid relative gap-2 text-center sm:grid-cols-2 xl:grid-cols-5 z-10">
                {heroes.map(hero => (
                  <HeroCard
                    key={hero.id}
                    hero={hero}
                    planet={homeworlds[hero.homeworld]}
                    allFilms={allFilms}
                    allStarships={allStarships}
                  />
                ))}
              </ul>
            </div>

            <nav className="z-10 flex justify-center mt-10 xl:mt-12">
              <PaginationControls totalPages={totalPages} />
            </nav>
          </>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-white text-xl font-bold'>oops, no results...</h2>
          </div>
        )
      }
    </>
  );
};
