import {
  CategoryListResponse,
  CategoryResponse,
  ServiceListResponse,
  ServiceResponse,
} from 'src/features/backoffice';

interface StrapiObject {
  [key: string]: string | number | boolean | object | undefined;
}

interface StrapiList {
  items: StrapiObject[];
}

export default (
  strapiData: CategoryListResponse | ServiceListResponse | undefined
): StrapiList | StrapiObject => {
  if (strapiData !== undefined) {
    if (strapiData.data !== undefined) {
      if (Array.isArray(strapiData.data)) {
        const items: Array<StrapiObject> = [];
        strapiData.data.forEach((item, index) => {
          items.push({
            ...(item.id && { id: item.id }),
            ...item.attributes,
          });
        });

        items.forEach((item, index) => {
          Object.keys(item).forEach((key) => {
            console.log('key', key);
            if (typeof key === 'object') {
            }
          });
        });
      }
    }
  }

  return {};
};
