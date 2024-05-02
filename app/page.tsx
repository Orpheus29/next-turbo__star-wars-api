import React, { Suspense } from 'react';

import Image from "next/image";

import { HeroesList } from '@/components';
import { getHeroes, getHomeworlds, getTotalPages, getFilms, getStarships } from '@/api';

import { HeroProps, FilmProps, StarshipProps } from '@/types';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const heroes: HeroProps[] = await getHeroes(currentPage);
  const homeworlds: { [id: number]: string } = await getHomeworlds();
  const totalPages: number = await getTotalPages();
  const allFilms: FilmProps[] = await getFilms();
  const allStarships: StarshipProps[] = await getStarships();

  return (
    <main className="min-w-80 max-w-[1440px] mx-auto flex flex-col py-24 px-10">
      <div className="place-items-center w-auto pb-8 pt-0 sm:pt-12 sm:pb-12 lg:pb-16 lg:pt-20 xl:pb-24 flex flex-col relative z-0">
        <div className="flex items-center justify-center">
          <h1 className='text-4xl drop-shadow-[0_8px_8px_rgba(255,255,255,0.4)] xsm:text-6xl sm:text-7xl text-center font-bold pt-10 3xl:pt-32'>List of Characters</h1>
          <div className="absolute min-w-[320px] min-h-[320px] blur-sm ">
            <Image
              alt="Turborepo"
              src="circles.svg"
              width={614}
              height={614}
            />
          </div>
          <div className="absolute z-5 flex items-center justify-center w-64 h-64">
            <Gradient
              className="opacity-90 w-[120px] h-[120px]"
              conic
              small
            />
          </div>
        </div>
        <Gradient
          className="top-[-100px] xsm:top-[-150px] sm:top-[-220px] lg:top-[-500px] opacity-[0.15] w-[320px] h-[320px] xsm:w-[460px] xsm:h-[460px] sm:w-[640px] sm:h-[640px] lg:w-[1000px] lg:h-[1000px]"
          conic
        />
      </div>

      <div className="mx-auto">
        <Suspense key={currentPage} fallback={<Loading />} >
          <HeroesList
            heroes={heroes}
            homeworlds={homeworlds}
            totalPages={totalPages}
            allFilms={allFilms}
            allStarships={allStarships}
          />
        </Suspense>
      </div>
    </main>
  );
}

function Loading() {
  return (
    <>
      <div className="loader">
        <div className="loader__content" />
        <h2 className="mt-4" >🌀 Loading...</h2>
      </div>
    </>
  );
}

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={`z-2 absolute mix-blend-normal will-change-[filter] rounded-[100%] ${small ? "blur-[32px]" : "blur-[55px]"
        } ${conic ? "bg-glow-conic" : ""} ${className}`}
    />
  );
}
