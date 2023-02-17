import {
  CategoryListResponse,
  CategoryResponse,
  ExpressTypeListResponse,
  ExpressTypeResponse,
  ServiceListResponse,
  ServiceResponse,
} from 'src/features/backoffice';
import { StrapiIcon } from 'src/features/backoffice/strapi';
import { isDev } from './isDevEnvironment';

export type StrapiResponse =
  | CategoryListResponse
  | CategoryResponse
  | ServiceListResponse
  | ServiceResponse
  | ExpressTypeListResponse
  | ExpressTypeResponse
  | StrapiIcon
  | undefined;

/**
 * Function extractStrapiData
 * Returns a clean object or list receiving a Strapi response
 * @type {Function}
 * @param item {StrapiResponse}
 * @returns {object | false}
 */
export const extractStrapiData = (item: StrapiResponse) => {
  if (item !== undefined && item.data !== null) {
    if (item.data !== undefined && item.data !== null) {
      if (Array.isArray(item.data)) {
        const items: any = [];
        item.data.forEach((listItem) => {
          const newListItem = extractStrapiData({ data: listItem });
          if (newListItem) {
            if (isDev() || newListItem.publishedAt !== null) {
              items.push(newListItem);
            }
          }
        });

        return items;
      }

      const newObj = {
        ...(item.data.id && { id: item.data.id }),
        ...item.data.attributes,
      };

      return newObj;
    }

    return false;
  }

  return false;
};
