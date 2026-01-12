import { useMemo, useState } from 'react';
import { appTheme } from 'src/app/theme';
import 'src/common/components/BugDetail/responsive-grid.css';
import {
  BugMedia as BugMediaType,
  GetCampaignsByCidBugsAndBidApiResponse,
} from 'src/features/api';
import { Divider } from '../../divider';
import { LightboxContainer } from '../lightbox';
import { BugMediaSection } from './BugMediaSection';

type Entry = { item: BugMediaType; index: number };

const toLocalYMD = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${day}-${m}-${y}`;
};

export default function BugMedia({
  items,
  bug,
}: {
  items: BugMediaType[];
  bug: GetCampaignsByCidBugsAndBidApiResponse;
}) {
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onSlideChange = (index: number) => setCurrentIndex(index);

  const openLightbox = (index: number) => {
    setIsLightboxOpen(true);
    setCurrentIndex(index);
  };

  const sections = useMemo(() => {
    const withIndex: Entry[] = items.map((item, index) => ({ item, index }));

    const map = new Map<
      string,
      { key: string; label: string; entries: Entry[] }
    >();

    for (const entry of withIndex) {
      const d = new Date(entry.item.creation_date);
      const key = toLocalYMD(d);
      const label = d.toLocaleDateString();

      const existing = map.get(key);
      if (existing) existing.entries.push(entry);
      else map.set(key, { key, label, entries: [entry] });
    }

    return Array.from(map.values()).sort((a, b) => a.key.localeCompare(b.key));
  }, [items]);

  return (
    <>
      {sections.map((section, idx) => (
        <>
          <BugMediaSection
            key={section.key}
            dateLabel={section.label}
            entries={section.entries}
            onOpenLightbox={openLightbox}
            showDivider={idx < sections.length - 1}
          />
        </>
      ))}

      {isLightboxOpen && (
        <LightboxContainer
          items={items}
          bug={bug}
          currentIndex={currentIndex}
          onClose={() => setIsLightboxOpen(false)}
          onSlideChange={onSlideChange}
        />
      )}
    </>
  );
}
