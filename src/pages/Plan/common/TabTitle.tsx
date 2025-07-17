import { useTranslation } from 'react-i18next';
import { usePlanContext } from '../context/planContext';
import { SectionTitle } from './SectionTitle';
import { AnimatePresence, motion } from 'motion/react';

export const TabTitle = () => {
  const { t } = useTranslation();
  const { activeTab } = usePlanContext();

  if (!activeTab.title) return null;
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={activeTab.name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        <SectionTitle isBold>{t(activeTab.title)}</SectionTitle>
      </motion.span>
    </AnimatePresence>
  );
};
