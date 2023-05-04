import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const POKEMON_NAME_TEST_ID = 'pokemon-name';

test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
  const { getByRole } = renderWithRouter(<App />);
  const h2 = getByRole('heading', {
    name: 'Encountered Pokémon',
  });
  expect(h2).toBeInTheDocument();
});

test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const proximoPokemonBtn = getByRole('button', { name: /próximo pokémon/i });
  expect(proximoPokemonBtn).toBeInTheDocument();
  userEvent.click(proximoPokemonBtn);
  const pokemonFire = getByText(/charmander/i);
  expect(pokemonFire).toBeInTheDocument();
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const pokemonName = getAllByTestId(POKEMON_NAME_TEST_ID);
  expect(pokemonName).toHaveLength(1);
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  const { getByRole, getAllByTestId, getByText, getByTestId } = renderWithRouter(<App />);
  const proximoPokemonBtn = getByRole('button', { name: /próximo pokémon/i });
  const pokemonTypeButtons = getAllByTestId('pokemon-type-button');
  expect(pokemonTypeButtons).toHaveLength(7);

  const fireTypeButton = getByRole('button', { name: 'Fire' });
  expect(fireTypeButton).toBeInTheDocument();
  const psychicTypeButton = getByRole('button', { name: 'Psychic' });
  expect(psychicTypeButton).toBeInTheDocument();

  userEvent.click(fireTypeButton);
  const pokemonFire = getByText(/charmander/i);
  expect(pokemonFire).toBeInTheDocument();

  userEvent.click(psychicTypeButton);
  const pokemonPsychic = getByText(/alakazam/i);
  expect(pokemonPsychic).toBeInTheDocument();

  userEvent.click(proximoPokemonBtn);
  expect(getByTestId(POKEMON_NAME_TEST_ID)).toHaveTextContent(/mew/i);

  const allTypesButton = getByText(/All/i);
  expect(allTypesButton).toBeInTheDocument();
  userEvent.click(allTypesButton);

  const pokemonName = getByTestId(POKEMON_NAME_TEST_ID);
  expect(pokemonName).toHaveTextContent('Pikachu');
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const allTypesButton = getByText(/all/i);
  expect(allTypesButton).toBeInTheDocument();
  userEvent.click(allTypesButton);
  const pokemonName = getByTestId(POKEMON_NAME_TEST_ID);
  expect(pokemonName).toHaveTextContent('Pikachu');
});
