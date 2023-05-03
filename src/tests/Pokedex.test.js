import React from 'react';
import { fireEvent } from '@testing-library/react';
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

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nextPokemonButton = getByTestId(NEXT_POKEMON_BUTTON_ID);
    expect(nextPokemonButton).toBeInTheDocument();
    expect(nextPokemonButton.innerHTML).toBe('Próximo Pokémon');
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonTypeButtons = getAllByTestId('pokemon-type-button');
    const expectedNumberOfButtons = 7;
    expect(pokemonTypeButtons.length).toBe(expectedNumberOfButtons);
  });
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    const { getByTestId, getByAltText, getByRole } = renderWithRouter(<App />);

    const allButton = getByRole('button', { name: /all/i });
    fireEvent.click(allButton);
    const nextPokemonButton = getByTestId(NEXT_POKEMON_BUTTON_ID);
    fireEvent.click(nextPokemonButton);
    const charmanderImage = getByAltText(/charmander/i);
    expect(charmanderImage).toBeInTheDocument();
    expect(charmanderImage.src).toBe('https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png');
  });
});

describe('Testa a funcionalidade dos botões de filtragem', () => {
  it('Veririca se tem os botões de filtro dos tipos de pokemons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    pokemonTypes.forEach((type) => {
      const typeButton = getByRole('button', { name: type });
      expect(typeButton).toBeInTheDocument();
    });
  });

  it('Ao selecionar um botão de tipo, a Pokédex deve exibir somente Pokémon daquele tipo.', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const pokemonTypes = ['Electric', 'Bug', 'Poison', 'Normal', 'Dragon'];
    const nextPokemonButton = getByTestId(NEXT_POKEMON_BUTTON_ID);
    pokemonTypes.forEach((type) => {
      const typeButton = getByRole('button', { name: type });
      fireEvent.click(typeButton);
      expect(nextPokemonButton).toBeDisabled();
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const resetButton = getByRole('button', { name: /all/i });
    expect(resetButton).toBeInTheDocument();
  });
});
