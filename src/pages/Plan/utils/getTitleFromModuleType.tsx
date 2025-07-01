import { useTranslation } from 'react-i18next';
import { components } from 'src/common/schema';
import { getModuleBySlug } from '../modules/Factory';

const getTitleFromModuleType = (
  type: components['schemas']['Module']['type']
) => {
  const { t } = useTranslation();
  let title;
  try {
    title = getModuleBySlug(type)?.useTitle?.();
  } catch (error) {
    console.error(`Error getting title for module type "${type}":`, error);
  }

  switch (type) {
    default:
      return title || '';
  }
};

export { getTitleFromModuleType };
