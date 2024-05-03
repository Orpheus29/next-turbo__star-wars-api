import { getNodesAndEdgesProps } from '@/types';

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const getNodesAndEdges = ({
  hero,
  homeworld,
  heroStarshipsPerFilm,
  allStarships,
}: getNodesAndEdgesProps) => {
  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
  } = hero;

  const position = { x: 0, y: 0 };

  const heroNode = [
    {
      id: '1',
      type: 'input',
      position,
      data: {
        label: `<div>
      <strong>${name}</strong><br/>
      Gender: ${gender}<br/>
      Height, cm: ${height}<br/>
      Mass, kg: ${mass}<br/>
      Hair color: ${hair_color}<br/>
      Skin color: ${skin_color}<br/>
      Eye color: ${eye_color}<br/>
      Birth year: ${birth_year}<br/>
      Homeworld: ${homeworld}
      </div>
      `,
      },
    },
  ];

  const filmsNodes = heroStarshipsPerFilm.map((film, index) => ({
    id: String(index + 2),
    type: 'default',
    position,
    data: {
      label: Object.keys(film)[0],
    },
  }));

  let starshipNodesStartId = +filmsNodes[filmsNodes.length - 1].id + 1;
  let filmIncrement = starshipNodesStartId;

  const starshipsNodes = [];
  const filmstoStarshipsEdges = [];
  let edgeId = starshipNodesStartId;
  const shownStarships: { [key: number]: number } = {};

  for (const starships of heroStarshipsPerFilm) {
    const filmStarships = Object.values(starships)[0];
    for (const filmStarship of filmStarships) {
      const starshipDetails = allStarships.find(
        (starship) => starship.id === filmStarship
      );
      if (starshipDetails) {
        if (!Object.keys(shownStarships).includes(String(starshipDetails.id))) {
          starshipsNodes.push({
            id: String(starshipNodesStartId),
            type: 'output',
            position,
            data: {
              label: `
                Starship name: "${starshipDetails.name}"<br/>
                Class: ${starshipDetails.starship_class}<br/>
                Model: ${starshipDetails.model}<br/>
                Manufacturer: ${starshipDetails.manufacturer}<br/>
                Cost: ${starshipDetails.cost_in_credits !== 'unknown' ? `${starshipDetails.cost_in_credits} ₵` : `${starshipDetails.cost_in_credits}`}<br/>
                Length, m: ${starshipDetails.length}<br/>
                Max atmosphering speed, km/h: ${starshipDetails.max_atmosphering_speed}<br/>
                Hyperdrive rating: ${starshipDetails.hyperdrive_rating}<br/>
                Crew: ${starshipDetails.crew}<br/>
                Passengers: ${starshipDetails.passengers}<br/>
                Cargo capacity, kg: ${starshipDetails.cargo_capacity}<br/>
                Consumables: ${starshipDetails.consumables}
                `,
            },
          });
          filmstoStarshipsEdges.push({
            id: `e1-${edgeId}`,
            source: `${filmIncrement - filmsNodes.length}`,
            target: String(starshipNodesStartId),
            animated: true,
          });
          shownStarships[starshipDetails.id] = starshipNodesStartId;
          starshipNodesStartId++;
        } else {
          filmstoStarshipsEdges.push({
            id: `e1-${edgeId}`,
            source: `${filmIncrement - filmsNodes.length}`,
            target: String(shownStarships[starshipDetails.id]),
            animated: true,
          });
        }
        edgeId++;
      }
    }
    filmIncrement++;
  }

  const nodes = heroNode.concat(filmsNodes, starshipsNodes);

  const heroToFilmsEdges = filmsNodes.map(({ id }) => ({
    id: `e1-${id}`,
    source: '1',
    target: String(id),
    animated: true,
  }));

  const edges = heroToFilmsEdges.concat(filmstoStarshipsEdges);

  return [nodes, edges];
};
