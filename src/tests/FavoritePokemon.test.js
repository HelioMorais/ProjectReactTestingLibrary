import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import App from '../App';

describe('Teste o componente <FavoritePokemon.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite Pokémon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    renderWithRouter(<FavoritePokemon />);
    const message = screen.getByText(/No favorite Pokémon found/i);
    expect(message).toBeInTheDocument();
  });

  test('Verifica se apenas Pokémons favoritados são exibidos ao favoritar na página de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    screen.getByRole('heading', { name: /details/i });
    const favoriteCheckbox = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoriteCheckbox);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoriteLink);

    const favoritePokemonImage = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(favoritePokemonImage).toBeInTheDocument();
    const nonFavoritePokemonImage = screen.queryByRole('img', { name: /is not marked as favorite/i });
    expect(nonFavoritePokemonImage).not.toBeInTheDocument();
  });
});
