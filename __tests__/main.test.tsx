import { vi } from 'vitest';
import type { MockedFunction } from 'vitest';

vi.mock('react-dom/client', async () => {
  const actual =
    await vi.importActual<typeof import('react-dom/client')>(
      'react-dom/client'
    );
  return {
    ...actual,
    createRoot: vi.fn(() => ({
      render: vi.fn(),
    })),
  };
});

describe('main.tsx', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('calls createRoot and renders the app', async () => {
    document.body.innerHTML = '<div id="root"></div>';

    const ReactDOM = await import('react-dom/client');
    await import('../src/main.tsx');

    const createRootMock = ReactDOM.createRoot as MockedFunction<
      typeof ReactDOM.createRoot
    >;
    const rootInstance = createRootMock.mock.results[0].value;

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(
      document.getElementById('root')
    );
    expect(rootInstance.render).toHaveBeenCalled();
  });

  it('throws an error if root element is not found', async () => {
    document.body.innerHTML = '';

    await expect(import('../src/main.tsx')).rejects.toThrow(
      'Root element not found'
    );
  });
});
