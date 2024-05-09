import { cache } from 'react';
import 'server-only';

import { baseURL } from '@/constants';

export const preload = () => {
  void getTotalPages;
  void getHeroes;
  void getHomeworlds;
  void getFilms;
  void getStarships;
};

export const getTotalPages = cache(async () => {
  let totalPages = 0;
  try {
    const res = await fetch(`${baseURL}/people`);
    const response = await res.json();
    totalPages = Math.ceil(response.count / 10);
  } catch (error) {
    console.error('Error fetching totalPages:', error);
  } finally {
    return totalPages;
  }
});

export const getHeroes = cache(async (page: number) => {
  try {
    const res = await fetch(`${baseURL}/people/?page=${page}`);
    const response = await res.json();
    return response.results;
  } catch (error) {
    console.error('Error fetching heroes:', error);
  }
});

export const getHomeworlds = cache(async () => {
  const homeworlds: { [id: number]: string } = {};
  try {
    for (let i = 1; i < 7; i++) {
      const res = await fetch(`${baseURL}/planets/?page=${i}`);
      const response = await res.json();
      response.results.forEach(({ id, name }: { id: number; name: string }) => {
        homeworlds[id] = name;
      });
    }
  } catch (error) {
    console.error('Error fetching homeworlds:', error);
  } finally {
    return homeworlds;
  }
});

export const getFilms = cache(async () => {
  try {
    const res = await fetch(`${baseURL}/films`);
    const response = await res.json();
    return response.results;
  } catch (error) {
    console.error('Error fetching episodes:', error);
  }
});

export const getStarships = cache(async () => {
  const starships = [];
  try {
    for (let i = 1; i < 5; i++) {
      const res = await fetch(`${baseURL}/starships/?page=${i}`);
      const response = await res.json();
      starships.push(response.results);
    }
  } catch (error) {
    console.error('Error fetching starships:', error);
  } finally {
    return starships.flat();
  }
});
