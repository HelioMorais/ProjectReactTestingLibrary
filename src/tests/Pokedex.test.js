import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const NEXT_POKEMON_BUTTON_ID = 'next-pokemon';
describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon".', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = getByRole('heading', {
      name: 'Encountered Pokémon' });
    expect(h2).toBeInTheDocument();
  });
});
