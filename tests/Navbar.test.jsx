import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navbar from '../src/components/Navbar/Navbar';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar', () => {
  it('renders correctly with default props', () => {
    render(
      <MemoryRouter >
        <Navbar />
      </MemoryRouter>
    )

    const nav = screen.getByRole('navigation');
    const linkList = screen.getByRole('list');
    const links = screen.getAllByRole('listitem');
    const homeLink = screen.getByText('Home');
    const shopLink = screen.getByText('Shop');
    const cartLink = screen.getByText('0');

    expect(nav).toBeInTheDocument();
    expect(linkList).toBeInTheDocument();
    expect(links).toHaveLength(3);
    expect(homeLink).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
  })

  it('displays correct card count', () => {
    const cartCount = 5;

    render(
      <MemoryRouter >
        <Navbar cartCount={cartCount} />
      </MemoryRouter>
    )
    
    const cart = screen.getByText('5');
    expect(cart).toBeInTheDocument();
  })
})