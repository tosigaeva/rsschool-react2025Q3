import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Modal } from '@/components/modal/modal';

describe('Modal', () => {
  const mockOnClose = vi.fn();
  const defaultProps = {
    children: <div>Modal Content</div>,
    onClose: mockOnClose,
    open: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock document.body.style.overflow
    Object.defineProperty(document.body, 'style', {
      value: { overflow: '' },
      writable: true,
    });
  });

  it('renders modal when open is true', () => {
    render(<Modal {...defaultProps} open={true} />);

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /✖/i })).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(<Modal {...defaultProps} open={false} />);

    expect(screen.queryByTestId('portal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Modal {...defaultProps} open={true} />);

    const closeButton = screen.getByRole('button', { name: /✖/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when ESC key is pressed', async () => {
    render(<Modal {...defaultProps} open={true} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onClose when clicking outside modal content', () => {
    render(<Modal {...defaultProps} open={true} />);

    // Click on the backdrop (first div with bg-gray-900/80)
    const backdrop = document.querySelector('.bg-gray-900\\/80') as HTMLElement;
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside modal content', () => {
    render(<Modal {...defaultProps} open={true} />);

    const modalContent = screen.getByText('Modal Content');
    fireEvent.click(modalContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('manages focus when modal opens and closes', async () => {
    // Create a focusable element outside modal
    const button = document.createElement('button');
    button.textContent = 'Outside Button';
    document.body.appendChild(button);
    button.focus();

    expect(document.activeElement).toBe(button);

    render(<Modal {...defaultProps} open={true} />);

    // Wait for focus management
    await waitFor(() => {
      // Modal should have focus or first focusable element should be focused
      expect(document.activeElement).not.toBe(button);
    });

    // Close modal
    fireEvent.click(screen.getByRole('button', { name: /✖/i }));

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });

    // Cleanup
    document.body.removeChild(button);
  });

  it('prevents body scroll when modal is open', () => {
    render(<Modal {...defaultProps} open={true} />);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when modal closes', () => {
    const { rerender } = render(<Modal {...defaultProps} open={true} />);

    expect(document.body.style.overflow).toBe('hidden');

    rerender(<Modal {...defaultProps} open={false} />);

    expect(document.body.style.overflow).toBe('');
  });

  it('handles tab navigation within modal', () => {
    render(
      <Modal {...defaultProps} open={true}>
        <div>
          <button>First Button</button>
          <input placeholder="Input field" type="text" />
          <button>Last Button</button>
        </div>
      </Modal>
    );

    const firstButton = screen.getByText('First Button');
    const input = screen.getByPlaceholderText('Input field');
    const lastButton = screen.getByText('Last Button');

    // Test that elements are focusable
    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);

    input.focus();
    expect(document.activeElement).toBe(input);

    lastButton.focus();
    expect(document.activeElement).toBe(lastButton);
  });
});
