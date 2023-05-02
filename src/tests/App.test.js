import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o link Home na página inicial.', () => {
  it('Deve existir o link Home na página inicial.', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
  });

  it('Ao clicar no link Home, deve acessar a página inicial.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    fireEvent.click(home);
    const urlName = history.location.pathname;
    expect(urlName).toBe('/');
  });
});

describe('Teste o link About na página inicial.', () => {
  it('Deve existir o link About na página inicial.', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
  });

  it('Ao clicar no link About, deve acessar a página About.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    fireEvent.click(about);
    const urlName = history.location.pathname;
    expect(urlName).toBe('/about');
  });
});

describe('Testa o link Favorite Pokémon na página inicial.', () => {
  it('Deve existir o link Favorite Pokémon na página inicial.', () => {
    const { getByText } = renderWithRouter(<App />);
    const favorites = getByText(/Favorite Pokémon/i);
    expect(favorites).toBeInTheDocument();
  });

  it('Ao clicar no link Favorite Pokémons, deve acessar a página de favoritos.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorites = getByText(/Favorite Pokémon/i);
    fireEvent.click(favorites);
    const urlName = history.location.pathname;
    expect(urlName).toBe('/favorites');
  });
});

describe('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
  it('Ao inserir uma URL desconhecida, redireciona para a página Not Found.', () => {
    const { history } = renderWithRouter(<App />);
    const urlNotFound = '/not-found';
    act(() => {
      history.push(urlNotFound);
    });
    const notFoundPage = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(notFoundPage).toBeInTheDocument();
  });
});
