import { useSelectionStore } from '#/shared/store/useSelectionStore.ts';

export function Flyout() {
  console.log('Flyout mounted');
  const selected = useSelectionStore((state) => state.selected);

  if (selected.length === 0) return null;

  return (
    <div className={'flyout'}>
      <span>{selected.length} items are selected</span>
    </div>
  );
}
