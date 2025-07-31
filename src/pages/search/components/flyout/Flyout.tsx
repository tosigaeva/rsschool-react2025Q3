import { useSelectionStore } from '#/shared/store/useSelectionStore.ts';

export function Flyout() {
  console.log('Flyout mounted');
  const selected = useSelectionStore((state) => state.selected);
  const clearSelection = useSelectionStore((state) => state.clearSelection);

  if (selected.length === 0) return null;

  return (
    <div className={'flyout'}>
      <span>{selected.length} items are selected</span>
      <div>
        <button onClick={clearSelection}>Unselect all</button>
      </div>
    </div>
  );
}
