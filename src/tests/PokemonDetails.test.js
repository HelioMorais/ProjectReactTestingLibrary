import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const moreDetailsLink = getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetailsLink);
    const deetsTitle = getByRole('heading', {
      name: 'Pikachu Details',
    });
    expect(deetsTitle).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();
    const summaryTitle = getByRole('heading', {
      name: /summary/i,
    });
    expect(summaryTitle).toBeInTheDocument();
    const moreDeets = getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(moreDeets).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { getByRole, getByText, getAllByRole } = renderWithRouter(<App />);
    const moreDetailsLink = getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetailsLink);
    const mapTitle = getByRole('heading', {
      name: /Game Locations of Pikachu/i,
    });
    expect(mapTitle).toBeInTheDocument();
    const mapName1 = getByText(/kanto viridian forest/i);
    const mapName2 = getByText(/kanto power plant/i);
    expect(mapName1).toBeInTheDocument();
    expect(mapName2).toBeInTheDocument();
    const maps = getAllByRole('img', { name: /pikachu location/i });
    expect(maps).toHaveLength(2);
    expect((maps)[0].src).toContain('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect((maps)[1].src).toContain('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);
    const moreDetailsLink = getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetailsLink);
    const favoriteCheckbox = getByLabelText('Pokémon favoritado?');
    expect(favoriteCheckbox).toBeInTheDocument();
    fireEvent.click(favoriteCheckbox);
    const img = getByRole('img', {
      name: /Pikachu is marked as favorite/i,
    });
    expect(img).toBeInTheDocument();
  });
});
