import { useMemo, useState } from 'react';
import 'src/common/components/BugDetail/responsive-grid.css';
import {
  BugMedia as BugMediaType,
  GetCampaignsByCidBugsAndBidApiResponse,
} from 'src/features/api';
import { LightboxContainer } from '../lightbox';
import { BugMediaSection } from './BugMediaSection';

type RawEntry = { item: BugMediaType; originalIndex: number };

const toSortableDateKey = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const formatDateDDMMYYYY = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${day}/${m}/${y}`;
};

export default function BugMedia({
  items,
  bug,
}: {
  items: BugMediaType[];
  bug: GetCampaignsByCidBugsAndBidApiResponse;
}) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSlideChange = (index: number) => setCurrentIndex(index);

  const openLightbox = (lightboxIndex: number) => {
    setIsLightboxOpen(true);
    setCurrentIndex(lightboxIndex);
  };

  const { sections, lightboxItems } = useMemo(() => {
    const withIndex: RawEntry[] = items.map((item, originalIndex) => ({
      item,
      originalIndex,
    }));

    const map = new Map<
      string,
      { key: string; label: string; entries: RawEntry[] }
    >();

    for (const entry of withIndex) {
      const d = new Date(entry.item.creation_date);

      const key = toSortableDateKey(d);
      const label = formatDateDDMMYYYY(d);

      const existing = map.get(key);
      if (existing) existing.entries.push(entry);
      else map.set(key, { key, label, entries: [entry] });
    }

    const grouped = Array.from(map.values()).sort((a, b) =>
      b.key.localeCompare(a.key)
    );

    let lightboxIndex = 0;

    const sections = grouped.map((g) => ({
      key: g.key,
      label: g.label,
      entries: g.entries.map((e, displayIndex) => ({
        item: e.item,
        displayIndex,
        lightboxIndex: lightboxIndex++,
      })),
    }));

    const lightboxItems = sections.flatMap((s) => s.entries.map((e) => e.item));

    return { sections, lightboxItems };
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
}
