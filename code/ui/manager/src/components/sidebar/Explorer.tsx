import React, { FC, useRef } from 'react';

// eslint-disable-next-line import/no-cycle
import { Ref } from './Refs';
import { CombinedDataset, Selection } from './types';
// eslint-disable-next-line import/no-cycle
import { useHighlighted } from './useHighlighted';
import { HighlightStyles } from './HighlightStyles';

export interface ExplorerProps {
  isLoading: boolean;
  isBrowsing: boolean;
  dataset: CombinedDataset;
  selected: Selection;
}

export const Explorer: FC<ExplorerProps> = React.memo(function Explorer({
  isLoading,
  isBrowsing,
  dataset,
  selected,
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track highlighted nodes, keep it in sync with props and enable keyboard navigation
  const [highlighted, setHighlighted, highlightedRef] = useHighlighted({
    containerRef,
    isLoading,
    isBrowsing,
    dataset,
    selected,
  });

  return (
    <div
      ref={containerRef}
      id="storybook-explorer-tree"
      data-highlighted-ref-id={highlighted?.refId}
      data-highlighted-item-id={highlighted?.itemId}
    >
      {highlighted && <HighlightStyles {...highlighted} />}
      {dataset.entries.map(([refId, ref]) => (
        <Ref
          {...ref}
          key={refId}
          isLoading={isLoading}
          isBrowsing={isBrowsing}
          selectedStoryId={selected?.refId === ref.id ? selected.storyId : null}
          highlightedRef={highlightedRef}
          setHighlighted={setHighlighted}
        />
      ))}
    </div>
  );
});
