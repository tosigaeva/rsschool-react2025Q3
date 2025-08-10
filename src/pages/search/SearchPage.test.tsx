import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderSearchPage, mockCharacters } from '#/__tests__/renderSearchPage';

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search panel section', () => {
    const { getSearchPanel } = renderSearchPage();
    expect(getSearchPanel()).toBeInTheDocument();
  });

  it('renders loading section', () => {
    const { getLoading } = renderSearchPage();
    expect(getLoading()).toBeInTheDocument();
  });

  it('renders search results section', () => {
    const { getSearchResults } = renderSearchPage({ isLoading: false });
    expect(getSearchResults()).toBeInTheDocument();
  });

  it('renders throw error button', () => {
    const { getThrowErrorButton } = renderSearchPage();
    expect(getThrowErrorButton()).toBeInTheDocument();
  });

  it('displays loading state when isLoading is true', () => {
    renderSearchPage({ isLoading: true });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('does not display loading state when isLoading is false', () => {
    const { getLoading } = renderSearchPage({ isLoading: false });
    expect(getLoading()).not.toBeInTheDocument();
  });

  it('displays error when error is present', () => {
    const error = new Error('API Error');
    const { getError } = renderSearchPage({ error });
    expect(getError()).toBeInTheDocument();
    expect(screen.getByText('API Error')).toBeInTheDocument();
  });

  it('does not display error when error is null', () => {
    const { getError } = renderSearchPage({ error: null });
    expect(getError()).toBeNull();
  });

  it('logs error to console when error occurs', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Test error');

    renderSearchPage({ error });

    expect(consoleSpy).toHaveBeenCalledWith('Test error');
    consoleSpy.mockRestore();
  });

  it('logs unknown error message when error is not Error instance', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = { customProperty: 'test' } as unknown as Error;

    renderSearchPage({ error });

    expect(consoleSpy).toHaveBeenCalledWith('Unknown error occurred');
    consoleSpy.mockRestore();
  });

  it('renders throw error button', () => {
    const { getThrowErrorButton } = renderSearchPage();

    const throwButton = getThrowErrorButton();
    expect(throwButton).toBeInTheDocument();
    expect(throwButton).toHaveTextContent('Throw Error');
  });

  it('handles pagination when results are present', () => {
    const { mockSetSearchParams } = renderSearchPage({
      results: { results: mockCharacters, totalPages: mockCharacters.length },
      totalPages: 5,
      hasBeenSearched: true,
      currentPage: 1,
    });

    expect(mockSetSearchParams).toBeDefined();
  });

  it('applies main-content_with-details class when outlet is present', () => {
    const outlet = <div>Details</div>;
    const { getMainContent } = renderSearchPage({ outlet });

    const mainContent = getMainContent();
    expect(mainContent).toHaveClass('main-content_with-details');
  });

  it('does not apply main-content_with-details class when outlet is not present', () => {
    const { getMainContent } = renderSearchPage({ outlet: null });

    const mainContent = getMainContent();
    expect(mainContent).not.toHaveClass('main-content_with-details');
  });

  it('passes correct props to SearchResultSection', () => {
    const results = {
      results: mockCharacters,
      totalPages: 0,
    };
    const error = null;
    const hasBeenSearched = true;
    const isLoading = false;

    const { getSearchResults } = renderSearchPage({
      results,
      error,
      hasBeenSearched,
      isLoading,
    });

    expect(getSearchResults()).toBeInTheDocument();
  });

  it('handles empty results correctly', () => {
    renderSearchPage({
      results: {
        results: [],
        totalPages: 0,
      },
      hasBeenSearched: true,
    });

    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
    expect(screen.queryByText('Leia Organa')).not.toBeInTheDocument();
  });
});
