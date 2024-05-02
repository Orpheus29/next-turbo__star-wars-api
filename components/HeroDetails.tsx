'use client';

import Image from 'next/image';
import { Fragment } from 'react';
import { Node, Edge } from 'reactflow';
import { Dialog, Transition } from "@headlessui/react";
import { useAtom } from 'jotai';

import { Flow } from '@/components/Flow';
import { getNodesAndEdges } from '@/utils';
import { heroNodesLengthAtom } from '@/utils/atoms';

import { HeroDetailsProps } from '@/types';

export const HeroDetails = ({ hero, homeworld, allFilms, allStarships, isModalOpen, closeModal }: HeroDetailsProps) => {
  const { name, films, starships: allHeroStarships } = hero;
  const heroFilms = allFilms.filter(({ id }) => films.includes(id)).sort((a, b) => a.episode_id - b.episode_id);
  const heroStarshipsPerFilm = heroFilms.map(heroFilm => {
    const eachFilmHeroStarships = heroFilm.starships.filter(starship => allHeroStarships.includes(starship));
    return {
      [
        `Episode ${heroFilm.episode_id}:<br/>
        <span style="color: #f79761;">"${heroFilm.title}"</span><br/>
        Release date:<br/>
        <span style="color: blue;">${heroFilm.release_date}</span>`
      ]: eachFilmHeroStarships,
    };
  });
  const [, setNodesLength] = useAtom(heroNodesLengthAtom);

  const initialNodes = (getNodesAndEdges({ hero, homeworld, heroStarshipsPerFilm, allStarships })[0] as Node[]);
  const initialEdges = (getNodesAndEdges({ hero, homeworld, heroStarshipsPerFilm, allStarships })[1] as Edge[]);
  setNodesLength(initialNodes.length);

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-out duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-80' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-500'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-out duration-500'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel
                  className='relative w-full max-w-7xl max-h-[90vh] overflow-y-auto transform
                  rounded-2xl bg-black bg-opacity-60 border-solid border-2 border-sky-500 pt-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                  <button
                    type='button'
                    onClick={closeModal}
                    className='absolute top-4 right-4 z-10 w-fit p-2 rounded-full outline-none bg-gray-400 hover:bg-gray-300 transition-colors'
                  >
                    <Image
                      src='/close.svg'
                      alt='close'
                      width={20}
                      height={20}
                      className='object-contain'
                    />
                  </button>

                  <div className='flex-1 flex flex-col gap-2 text-center'>
                    <h2 className='font-thin text-4xl text-slate-500 lowercase'>
                      {name}
                    </h2>
                  </div>
                    <Flow initialNodes={initialNodes} initialEdges={initialEdges} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
