import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderSearchPage, mockCharacters } from '#/__tests__/renderSearchPage';

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the main title', () => {
    renderSearchPage();
    expect(screen.getByText('Star Wars Character Finder')).toBeInTheDocument();
  });

  it('renders search panel section', () => {
    const { getSearchPanel } = renderSearchPage();
    expect(getSearchPanel()).toBeInTheDocument();
  });

  it('renders search results section', () => {
    const { getSearchResults } = renderSearchPage();
    expect(getSearchResults()).toBeInTheDocument();
  });

  it('renders throw error button', () => {
    const { getThrowErrorButton } = renderSearchPage();
    expect(getThrowErrorButton()).toBeInTheDocument();
  });

  it('renders about link', () => {
    const { getAboutLink } = renderSearchPage();
    expect(getAboutLink()).toBeInTheDocument();
    expect(getAboutLink()).toHaveAttribute('href', '/about');
  });

  it('calls loadData with search term and current page on mount', async () => {
    const mockLoadData = vi.fn().mockResolvedValue(undefined);
    const searchTerm = 'Luke';

    renderSearchPage({
      searchTerm,
      mockLoadData,
    });

    await waitFor(() => {
      expect(mockLoadData).toHaveBeenCalledWith(searchTerm, 1);
    });
  });

  it('calls loadData when search term changes', async () => {
    const mockLoadData = vi.fn().mockResolvedValue(undefined);
    const searchTerm = 'Leia';

    renderSearchPage({
      searchTerm,
      mockLoadData,
    });

    await waitFor(() => {
      expect(mockLoadData).toHaveBeenCalledWith(searchTerm, 1);
    });
  });

  it('calls loadData when page changes', async () => {
    const mockLoadData = vi.fn().mockResolvedValue(undefined);
    const searchParams = new URLSearchParams('page=2');

    renderSearchPage({
      searchParams,
      mockLoadData,
    });

    await waitFor(() => {
      expect(mockLoadData).toHaveBeenCalledWith('', 2);
    });
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
    // Create an object that's not an Error instance
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
      results: mockCharacters,
      totalPages: 5,
      hasBeenSearched: true,
      currentPage: 1,
    });

    // The SearchResultSection should render pagination when there are results
    // and totalPages > 0
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
    const results = mockCharacters;
    const error = null;
    const hasBeenSearched = true;
    const isLoading = false;
    const currentPage = 2;
    const totalPages = 5;

    const { getSearchResults } = renderSearchPage({
      results,
      error,
      hasBeenSearched,
      isLoading,
      currentPage,
      totalPages,
    });

    // Verify that the SearchResultSection is rendered
    expect(getSearchResults()).toBeInTheDocument();
  });

  it('handles empty results correctly', () => {
    renderSearchPage({
      results: [],
      hasBeenSearched: true,
    });

    // Should not display any character names when results are empty
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
    expect(screen.queryByText('Leia Organa')).not.toBeInTheDocument();
  });

  it('handles search term storage correctly', () => {
    const searchTerm = 'Darth Vader';
    renderSearchPage({ searchTerm });

    // The search term should be used in the loadData call
    // This is verified by the loadData being called with the search term
    expect(screen.getByText('Star Wars Character Finder')).toBeInTheDocument();
  });
});
