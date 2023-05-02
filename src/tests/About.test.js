import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testes do componente <About.js />.', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const h2 = getByRole('heading', {
      name: 'About Pokédex' });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraphOne = getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    expect(paragraphOne).toBeInTheDocument();
    const paragraphTwoo = getByText(/One can filter Pokémon by type, and see more details for each one of them/i);
    expect(paragraphTwoo).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma pokedex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
