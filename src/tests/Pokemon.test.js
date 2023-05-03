import { } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('Renderiza um card com informações do Pokémon', () => {
    const { getByText, getAllByText, getByRole, history } = renderWithRouter(<App />);
    const pokemonNameElement = getByText(/Pikachu/i);
    const pokemonTypeElements = getAllByText(/Electric/i);
    const pokemonWeightElement = getByText(/Average weight: 6.0 kg/i);
    const pokemonImageElement = getByRole('img', { name: /Pikachu sprite/i });
    const pokemonLinkElement = getByRole('link', { name: /More details/i });

    expect(pokemonNameElement).toBeInTheDocument();
    expect(pokemonTypeElements.length).toBe(2);
    expect(pokemonWeightElement).toBeInTheDocument();
    expect(pokemonImageElement.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImageElement.alt).toBe('Pikachu sprite');
    expect(pokemonLinkElement.href).toBe('http://localhost/pokemon/25');
    expect(pokemonLinkElement).toBeInTheDocument();

    userEvent.click(pokemonLinkElement);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  test('Exibe um ícone de estrela nos Pokémon favoritos', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokemonLinkElement = getByRole('link', { name: /More details/i });
    userEvent.click(pokemonLinkElement);
    const favoriteCheckboxElement = getByRole('checkbox');
    userEvent.click(favoriteCheckboxElement);
    const favoriteIconElement = getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(favoriteIconElement.src).toBe('http://localhost/star-icon.svg');
    expect(favoriteIconElement.alt).toBe('Pikachu is marked as favorite');
  });
});
