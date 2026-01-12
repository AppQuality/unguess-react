import { useMemo, useState } from 'react';
import 'src/common/components/BugDetail/responsive-grid.css';
import {
  BugMedia as BugMediaType,
  GetCampaignsByCidBugsAndBidApiResponse,
} from 'src/features/api';
import { LightboxContainer } from '../lightbox';
import { BugMediaSection } from './BugMediaSection';
import { formatDateDDMMYYYY, toSortableDateKey } from './dateUtils';

type RawEntry = { item: BugMediaType };

const BugMedia = ({
  items,
  bug,
}: {
  items: BugMediaType[];
  bug: GetCampaignsByCidBugsAndBidApiResponse;
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSlideChange = (index: number) => setCurrentIndex(index);

  const openLightbox = (lightboxIndex: number) => {
    setIsLightboxOpen(true);
    setCurrentIndex(lightboxIndex);
  };

  const { sections, lightboxItems } = useMemo(() => {
    const groupedMap = items.reduce((accumulator, item) => {
      const creationDate = new Date(item.creation_date);
      const key = toSortableDateKey(creationDate);
      const label = formatDateDDMMYYYY(creationDate);

      const existing = accumulator.get(key);
      if (existing) {
        existing.entries.push({ item });
        return accumulator;
      }

      accumulator.set(key, { key, label, entries: [{ item }] });
      return accumulator;
    }, new Map<string, { key: string; label: string; entries: RawEntry[] }>());

    const grouped = Array.from(groupedMap.values()).sort((a, b) =>
      b.key.localeCompare(a.key)
    );

    let offset = 0;

    const computedSections = grouped.map((group) => {
      const entries = group.entries.map((entry, groupIndex) => ({
        item: entry.item,
        displayIndex: groupIndex,
        lightboxIndex: offset + groupIndex,
      }));

      offset += group.entries.length;

      return {
        key: group.key,
        label: group.label,
        entries,
      };
    });

    const computedLightboxItems = computedSections.flatMap((section) =>
      section.entries.map((entry) => entry.item)
    );

    return { sections: computedSections, lightboxItems: computedLightboxItems };
  }, [items]);

  return (
    <>
      {sections.map((section, idx) => (
        <BugMediaSection
          key={section.key}
          dateLabel={section.label}
          entries={section.entries}
          onOpenLightbox={openLightbox}
          showDivider={idx < sections.length - 1}
        />
      ))}

      {isLightboxOpen && (
        <LightboxContainer
          items={lightboxItems}
          bug={bug}
          currentIndex={currentIndex}
          onClose={() => setIsLightboxOpen(false)}
          onSlideChange={onSlideChange}
        />
      )}
    </>
  );
};

export default BugMedia;
