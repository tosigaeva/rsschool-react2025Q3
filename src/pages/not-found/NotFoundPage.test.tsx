import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders the 404 page content', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('renders content within a paragraph element', () => {
    render(<NotFoundPage />);
    const paragraph = screen.getByText('404 - Page Not Found');
    expect(paragraph.tagName).toBe('P');
  });

  it('renders exactly the expected text', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404 - Page Not Found')).toHaveTextContent(
      '404 - Page Not Found'
    );
  });
});
